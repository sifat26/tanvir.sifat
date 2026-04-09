import { Bot, MessageCircle, Send, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

const API_URL = "https://openrouter.ai/api/v1/chat/completions";

const PROFILE_CONTEXT = `
Name: Tanvir Ahmmed Sifat
Role: Full-Stack Web Developer
Primary stack: React, Next.js, Angular, Tailwind CSS, Node.js, Express.js, MongoDB, SQL
Also works with: Python, TensorFlow, Vercel, cPanel, IIS Server
Portfolio highlights:
- Builds modern, scalable web applications with clean code and strong UI/UX focus.
- Experience includes full-stack development and machine learning interest.
- Portfolio stats mention 5+ projects, 1+ years experience, and 12+ technologies.
Availability: Open to work.
`;

const STARTER_QUESTIONS = [
  "What technologies does Sifat use?",
  "Tell me about Sifat's experience",
  "What kind of projects can Sifat build?",
];

const FALLBACK_MODELS = [
  "openrouter/auto",
  "deepseek/deepseek-chat-v3-0324:free",
  "qwen/qwen-2.5-7b-instruct:free",
];

function buildSystemPrompt(extraContext = "") {
  return `You are Sifat's portfolio assistant. Reply in concise, friendly English.
Only answer questions related to Sifat using the context below.
If asked something unrelated or unknown, politely say you only answer about Sifat and suggest using the contact section.
Do not invent personal details beyond the context.

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
        "Hi, I am Sifat's assistant. Ask me anything about his skills, projects, or experience.",
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
