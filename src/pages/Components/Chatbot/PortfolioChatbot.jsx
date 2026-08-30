import { Bot, MessageCircle, Send, X } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  useAbout,
  useEducation,
  useExperiences,
  usePersonal,
  useProjects,
  useResearch,
  useSkills,
} from '../../../hooks/usePortfolioData';

const API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Build the assistant's knowledge from the dynamic portfolio data
 */
function buildProfileContext({ personal, about, experiences, clientProjects, projects, skills, education, research }) {
  const skillLines = (skills || []).map((s) => `- ${s.group}: ${(s.items || []).join(', ')}`).join('\n');

  const experienceLines = (experiences || [])
    .map((e) => `- ${e.role} at ${e.company} (${e.period}, ${e.type}). ${e.summary}`)
    .join('\n');

  const clientLines = (clientProjects || [])
    .map(
      (p) =>
        `- ${p.title} (${p.category}, ${p.year}) — ${p.role}, ${p.team || 'team project'}. ${p.overview} Tech: ${(p.tech || []).join(', ')}. Live: ${p.links?.live && !p.links.live.startsWith('[ADD') ? p.links.live : 'n/a'}.`,
    )
    .join('\n');

  const personalLines = (projects || [])
    .map(
      (p) =>
        `- ${p.title} (${p.category}, ${p.year}) — ${p.tagline} Tech: ${(p.tech || []).join(', ')}. Live: ${p.links?.live || 'n/a'}.`,
    )
    .join('\n');

  const educationLines = (education || [])
    .map((e) => `- ${e.degree}, ${e.institute} (${e.period}, ${e.status}).`)
    .join('\n');

  const pub = research?.publications?.[0];
  const publicationLine = pub
    ? `- "${pub.title}" (${pub.role}), ${pub.conference}, ${pub.venue}, ${pub.year}. ${pub.abstract}`
    : 'None listed.';

  return `Name: ${personal.name} (goes by ${personal.shortName})
Role: ${personal.role}
Location: ${personal.location}
Availability: ${personal.availability}
Contact: ${personal.email}${personal.phone ? `, ${personal.phone}` : ''}

About:
${[...(about.short || []), ...(about.paragraphs || [])].join('\n')}

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

Research interests: ${(research.interests || []).join(', ')}
Current thesis: ${research.thesis?.title} — ${research.thesis?.description}
Publication:
${publicationLine}`;
}

const STARTER_QUESTIONS = [
  "What are Sifat's strongest projects?",
  'Tell me about the Bazarica marketplace',
  "What's Sifat's research about?",
  'Is Sifat available for hire?',
];

const FALLBACK_MODELS = ['openrouter/auto', 'deepseek/deepseek-chat-v3-0324:free', 'qwen/qwen-2.5-7b-instruct:free'];

function buildSystemPrompt(contextData, personalName, personalEmail, personalAvailability, extraContext = '') {
  return `You are the portfolio assistant for ${personalName} (Sifat). You help visitors — often recruiters and hiring managers — quickly understand his work.

Guidelines:
- Reply in concise, friendly English. Keep answers short: 2-4 sentences or a tight bullet list.
- Answer only from the context below. Ground claims in real specifics (name the project, tech, or role) rather than generic praise.
- On client projects, be accurate about his role: they were paid, production work delivered with a collaborative development team — never imply he built them alone.
- If asked something you can't answer from the context, say so briefly and point them to the contact section or ${personalEmail}.
- If someone asks about hiring or availability, share that he is ${(personalAvailability || 'open to opportunities').toLowerCase()} and suggest reaching out via the contact form.
- Never invent details, dates, or links that aren't in the context.

Context:\n${contextData}

External context from connected accounts:\n${extraContext || 'Not available'}`;
}

const PortfolioChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm Sifat's portfolio assistant. Ask me about his production work, the Bazarica marketplace, his AI research, or whether he's available to hire.",
    },
  ]);

  const { data: personal } = usePersonal();
  const { data: about } = useAbout();
  const { data: experiences } = useExperiences();
  const { data: clientProjects } = useProjects('client');
  const { data: projects } = useProjects('personal');
  const { data: skills } = useSkills();
  const { data: education } = useEducation();
  const { data: research } = useResearch();

  const isDataReady = !!(
    personal &&
    about &&
    experiences &&
    clientProjects &&
    projects &&
    skills &&
    education &&
    research
  );

  const messagesEndRef = useRef(null);

  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY || import.meta.env.VITE_API_OPENROUTER_KEY || '';
  const model = import.meta.env.VITE_OPENROUTER_MODEL || 'meta-llama/llama-3.1-8b-instruct:free';
  const modelCandidates = [model, ...FALLBACK_MODELS].filter(
    (item, index, list) => item && list.indexOf(item) === index,
  );
  const githubUsername = import.meta.env.VITE_GITHUB_USERNAME || '';
  const linkedinUrl = import.meta.env.VITE_LINKEDIN_URL || '';
  const linkedinSummary = import.meta.env.VITE_LINKEDIN_SUMMARY || '';

  const externalContextRef = useRef('');
  const externalContextPromiseRef = useRef(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading && isDataReady, [input, isLoading, isDataReady]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  async function fetchGithubContext(username) {
    if (!username) return 'GitHub: Not configured.';

    try {
      const profileResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!profileResponse.ok) {
        return `GitHub: Could not load profile for ${username}.`;
      }

      const profile = await profileResponse.json();
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=8`);

      let repos = [];
      if (reposResponse.ok) {
        repos = await reposResponse.json();
      }

      const topLanguages = [...new Set(repos.map((repo) => repo.language).filter(Boolean))].slice(0, 5).join(', ');

      const notableRepos = repos
        .slice(0, 4)
        .map((repo) => `${repo.name}${repo.language ? ` (${repo.language})` : ''}`)
        .join(', ');

      return [
        `GitHub profile: ${profile.name || username} (${profile.login}).`,
        `Public repos: ${profile.public_repos ?? 'unknown'}, Followers: ${profile.followers ?? 'unknown'}.`,
        `Top languages from recent repos: ${topLanguages || 'Not enough data'}.`,
        `Recent repositories: ${notableRepos || 'Not enough data'}.`,
      ].join('\n');
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
        `LinkedIn profile: ${linkedinUrl || 'Not configured'}.`,
        `LinkedIn summary: ${linkedinSummary || 'Add VITE_LINKEDIN_SUMMARY in .env to include your headline/about/experience summary.'}`,
      ].join('\n');

      const combined = [githubContext, linkedinContext].join('\n\n');
      externalContextRef.current = combined;
      return combined;
    })();

    return externalContextPromiseRef.current;
  }

  async function askAssistant(userText) {
    const missingApiKey = !apiKey || apiKey.includes('your_openrouter_api_key_here');
    if (missingApiKey) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Chat is not configured yet. Add VITE_OPENROUTER_API_KEY to .env (not .env.example) and restart the dev server.',
        },
      ]);
      return;
    }

    setIsLoading(true);

    try {
      const extraContext = await getExternalContext();

      const contextData = buildProfileContext({
        personal,
        about,
        experiences,
        clientProjects,
        projects,
        skills,
        education,
        research,
      });

      const sessionId =
        sessionStorage.getItem('chat_session') ||
        (sessionStorage.setItem('chat_session', Math.random().toString(36).substring(2, 15)),
        sessionStorage.getItem('chat_session'));

      let reply = '';
      let lastError = null;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/chatlogs/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-openrouter-key': apiKey, // send the key from frontend env if backend doesn't have it
        },
        body: JSON.stringify({
          sessionId,
          model: modelCandidates[0],
          messages: [
            {
              role: 'system',
              content: buildSystemPrompt(
                contextData,
                personal.name,
                personal.email,
                personal.availability,
                extraContext,
              ),
            },
            ...messages.map((m) => ({ role: m.role, content: m.content })),
            { role: 'user', content: userText },
          ],
        }),
      });

      if (response.ok) {
        const data = await response.json();
        reply = data.data.reply;
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Server error');
      }

      if (!reply) {
        throw new Error(
          lastError || 'No model endpoint was available. Set VITE_OPENROUTER_MODEL to a supported model.',
        );
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `I hit an AI service error: ${error.message}`,
        },
      ]);
      console.error('Portfolio chatbot error:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!canSend) return;

    const userText = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    await askAssistant(userText);
  }

  function handleStarterQuestion(question) {
    setInput(question);
  }

  return (
    <>
      {!isOpen && (
        <button className='chatbot-toggle' onClick={() => setIsOpen(true)} aria-label='Open portfolio assistant'>
          <MessageCircle size={22} />
        </button>
      )}

      {isOpen && (
        <section className='chatbot-panel' aria-label='Portfolio chatbot'>
          <header className='chatbot-header'>
            <div className='chatbot-header-left'>
              <span className='chatbot-icon-wrap'>
                <Bot size={16} />
              </span>
              <div>
                <h3>Ask About Sifat</h3>
                <p>Portfolio AI Assistant</p>
              </div>
            </div>
            <button className='chatbot-close' onClick={() => setIsOpen(false)} aria-label='Close chatbot'>
              <X size={16} />
            </button>
          </header>

          <div className='chatbot-messages'>
            {!isDataReady && (
              <article className='chat-bubble chat-assistant'>Loading my knowledge base... please wait.</article>
            )}
            {isDataReady &&
              messages.map((message, index) => (
                <article
                  key={`${message.role}-${index}`}
                  className={`chat-bubble ${message.role === 'user' ? 'chat-user' : 'chat-assistant'}`}
                >
                  {message.content}
                </article>
              ))}

            {isLoading && <article className='chat-bubble chat-assistant'>Thinking...</article>}

            <div ref={messagesEndRef} />
          </div>

          <div className='chatbot-starters'>
            {STARTER_QUESTIONS.map((question) => (
              <button
                key={question}
                type='button'
                className='chatbot-chip'
                onClick={() => handleStarterQuestion(question)}
                disabled={!isDataReady}
              >
                {question}
              </button>
            ))}
          </div>

          <form className='chatbot-input-row' onSubmit={handleSubmit}>
            <input
              type='text'
              placeholder='Ask about skills, projects, experience...'
              value={input}
              onChange={(event) => setInput(event.target.value)}
              aria-label='Chat message'
              disabled={!isDataReady}
            />
            <button type='submit' disabled={!canSend} aria-label='Send message'>
              <Send size={16} />
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default PortfolioChatbot;
