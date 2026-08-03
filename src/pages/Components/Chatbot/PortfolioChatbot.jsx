import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  personal,
  about,
  experiences,
  clientProjects,
  projects,
  skills,
  education,
  research,
} from "../../../data/portfolio";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

/**
 * Build the assistant's knowledge from the same portfolio data the site renders,
 * so answers stay accurate and never drift out of sync with the content.
 */
function buildProfileContext() {
  const skillLines = skills.map((s) => `- ${s.group}: ${s.items.join(", ")}`).join("\n");

  const experienceLines = experiences
    .map(
      (e) =>
        `- ${e.role} at ${e.company} (${e.period}, ${e.type}). ${e.summary}`,
    )
    .join("\n");

  const clientLines = clientProjects
    .map(
      (p) =>
        `- ${p.title} (${p.category}, ${p.year}) — ${p.role}, ${p.team || "team project"}. ${p.overview} Tech: ${p.tech.join(", ")}. Live: ${p.links?.live && !p.links.live.startsWith("[ADD") ? p.links.live : "n/a"}.`,
    )
    .join("\n");

  const personalLines = projects
    .map(
      (p) =>
        `- ${p.title} (${p.category}, ${p.year}) — ${p.tagline} Tech: ${p.tech.join(", ")}. Live: ${p.links?.live || "n/a"}.`,
    )
    .join("\n");

  const educationLines = education
    .map((e) => `- ${e.degree}, ${e.institute} (${e.period}, ${e.status}).`)
    .join("\n");

  const pub = research.publications[0];
  const publicationLine = pub
    ? `- "${pub.title}" (${pub.role}), ${pub.conference}, ${pub.venue}, ${pub.year}. ${pub.abstract}`
    : "None listed.";

  return `Name: ${personal.name} (goes by ${personal.shortName})
Role: ${personal.role}
Location: ${personal.location}
Availability: ${personal.availability}
Contact: ${personal.email}${personal.phone ? `, ${personal.phone}` : ""}

About:
${[...about.short, ...about.paragraphs].join("\n")}

Experience:
${experienceLines}

Professional client projects (paid, delivered with a collaborative development team):
${clientLines}

Personal projects:
${personalLines}

Skills:
${skillLines}

Education:
${educationLines}

Research interests: ${research.interests.join(", ")}
Current thesis: ${research.thesis.title} — ${research.thesis.description}
Publication:
${publicationLine}`;
}

const PROFILE_CONTEXT = buildProfileContext();

const STARTER_QUESTIONS = [
  "What are Sifat's strongest projects?",
  "Tell me about the Bazarica marketplace",
  "What's Sifat's research about?",
  "Is Sifat available for hire?",
];

const FALLBACK_MODELS = [
  "openrouter/auto",
  "deepseek/deepseek-chat-v3-0324:free",
  "qwen/qwen-2.5-7b-instruct:free",
];

function buildSystemPrompt(extraContext = "") {
  return `You are the portfolio assistant for ${personal.name} (Sifat). You help visitors — often recruiters and hiring managers — quickly understand his work.

Guidelines:
- Reply in concise, friendly English. Keep answers short: 2-4 sentences or a tight bullet list.
- Answer only from the context below. Ground claims in real specifics (name the project, tech, or role) rather than generic praise.
- On client projects, be accurate about his role: they were paid, production work delivered with a collaborative development team — never imply he built them alone.
- If asked something you can't answer from the context, say so briefly and point them to the contact section or ${personal.email}.
- If someone asks about hiring or availability, share that he is ${personal.availability.toLowerCase()} and suggest reaching out via the contact form.
- Never invent details, dates, or links that aren't in the context.

Context:\n${PROFILE_CONTEXT}

External context from connected accounts:\n${extraContext || "Not available"}`;
}

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Sifat's portfolio assistant. Ask me about his production work, the Bazarica marketplace, his AI research, or whether he's available to hire.",
    },
  ]);

  const messagesEndRef = useRef(null);

  const apiKey =
    import.meta.env.VITE_OPENROUTER_API_KEY ||
    import.meta.env.VITE_API_OPENROUTER_KEY ||
    "";
  const model =
    import.meta.env.VITE_OPENROUTER_MODEL ||
    "meta-llama/llama-3.1-8b-instruct:free";
  const modelCandidates = [model, ...FALLBACK_MODELS].filter(
    (item, index, list) => item && list.indexOf(item) === index,
  );
  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || "";
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL || "";
  const linkedinSummary = import.meta.env.VITE_LINKEDIN_SUMMARY || "";

  const externalContextRef = useRef("");
  const externalContextPromiseRef = useRef(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isLoading,
    [input, isLoading],
  );

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function fetchGithubContext(username) {
    if (!username) return "GitHub: Not configured.";

    try {
      const profileResponse = await fetch(
        `https://api.github.com/users/${username}`,
      );
      if (!profileResponse.ok) {
        return `GitHub: Could not load profile for ${username}.`;
      }

      const profile = await profileResponse.json();
      const reposResponse = await fetch(
        `https://api.github.com/users/${username}/repos?sort=updated&per_page=8`,
      );

      let repos = [];
      if (reposResponse.ok) {
        repos = await reposResponse.json();
      }

      const topLanguages = [
        ...new Set(repos.map((repo) => repo.language).filter(Boolean)),
      ]
        .slice(0, 5)
        .join(", ");

      const notableRepos = repos
        .slice(0, 4)
        .map(
          (repo) => `${repo.name}${repo.language ? ` (${repo.language})` : ""}`,
        )
        .join(", ");

      return [
        `GitHub profile: ${profile.name || username} (${profile.login}).`,
        `Public repos: ${profile.public_repos ?? "unknown"}, Followers: ${profile.followers ?? "unknown"}.`,
        `Top languages from recent repos: ${topLanguages || "Not enough data"}.`,
        `Recent repositories: ${notableRepos || "Not enough data"}.`,
      ].join("\n");
    } catch {
      return `GitHub: Failed to fetch data for ${username}.`;
    }
  }

  async function getExternalContext() {
    if (externalContextRef.current) {
      return externalContextRef.current;
    }

    if (externalContextPromiseRef.current) {
      return externalContextPromiseRef.current;
    }

    externalContextPromiseRef.current = (async () => {
      const githubContext = await fetchGithubContext(githubUsername);
      const linkedinContext = [
        `LinkedIn profile: ${linkedinUrl || "Not configured"}.`,
        `LinkedIn summary: ${linkedinSummary || "Add VITE_LINKEDIN_SUMMARY in .env to include your headline/about/experience summary."}`,
      ].join("\n");

      const combined = [githubContext, linkedinContext].join("\n\n");
      externalContextRef.current = combined;
      return combined;
    })();

    return externalContextPromiseRef.current;
  }

  async function askAssistant(userText) {
    const missingApiKey =
      !apiKey || apiKey.includes("your_openrouter_api_key_here");
    if (missingApiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Chat is not configured yet. Add VITE_OPENROUTER_API_KEY to .env (not .env.example) and restart the dev server.",
        },
      ]);
      return;
    }

    setIsLoading(true);

    try {
      const extraContext = await getExternalContext();
      let reply = "";
      let lastError = null;

      for (const activeModel of modelCandidates) {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
            "HTTP-Referer": window.location.origin,
            "X-Title": "Sifat Portfolio Chatbot",
          },
          body: JSON.stringify({
            model: activeModel,
            temperature: 0.3,
            max_tokens: 350,
            messages: [
              { role: "system", content: buildSystemPrompt(extraContext) },
              ...messages.map((m) => ({ role: m.role, content: m.content })),
              { role: "user", content: userText },
            ],
          }),
        });

        if (response.ok) {
          const data = await response.json();
          reply =
            data?.choices?.[0]?.message?.content ||
            "Sorry, I could not generate a response right now.";
          break;
        }

        const text = await response.text();
        let parsedMessage = text || "OpenRouter request failed";
        try {
          const parsed = JSON.parse(text);
          parsedMessage = parsed?.error?.message || parsedMessage;
        } catch {
          // Keep original text when response is not JSON.
        }

        lastError = `${activeModel}: ${parsedMessage}`;

        const hasNoEndpoint =
          response.status === 404 &&
          parsedMessage.toLowerCase().includes("no endpoints found");

        if (!hasNoEndpoint) {
          throw new Error(lastError);
        }
      }

      if (!reply) {
        throw new Error(
          lastError ||
            "No model endpoint was available. Set VITE_OPENROUTER_MODEL to a supported model.",
        );
      }

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I hit an AI service error: ${error.message}`,
        },
      ]);
      console.error("Portfolio chatbot error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSend) return;

    const userText = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userText }]);
    await askAssistant(userText);
  }

  function handleStarterQuestion(question) {
    setInput(question);
  }

  return (
    <>
      {!isOpen && (
        <button
          className="chatbot-toggle"
          onClick={() => setIsOpen(true)}
          aria-label="Open portfolio assistant"
        >
          <MessageCircle size={22} />
        </button>
      )}

      {isOpen && (
        <section className="chatbot-panel" aria-label="Portfolio chatbot">
          <header className="chatbot-header">
            <div className="chatbot-header-left">
              <span className="chatbot-icon-wrap">
                <Bot size={16} />
              </span>
              <div>
                <h3>Ask About Sifat</h3>
                <p>Portfolio AI Assistant</p>
              </div>
            </div>
            <button
              className="chatbot-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close chatbot"
            >
              <X size={16} />
            </button>
          </header>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <article
                key={`${message.role}-${index}`}
                className={`chat-bubble ${message.role === "user" ? "chat-user" : "chat-assistant"}`}
              >
                {message.content}
              </article>
            ))}

            {isLoading && (
              <article className="chat-bubble chat-assistant">
                Thinking...
              </article>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-starters">
            {STARTER_QUESTIONS.map((question) => (
              <button
                key={question}
                type="button"
                className="chatbot-chip"
                onClick={() => handleStarterQuestion(question)}
              >
                {question}
              </button>
            ))}
          </div>

          <form className="chatbot-input-row" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ask about skills, projects, experience..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label="Chat message"
            />
            <button type="submit" disabled={!canSend} aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default PortfolioChatbot;
