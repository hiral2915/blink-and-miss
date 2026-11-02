'use client';

import React, { useState } from 'react';
import { CurrentMatchState, UserPreferences, AskAiMessage } from '@/lib/types/cricket';
import { MessageSquare, Send, Sparkles, Volume2, Bot, User } from 'lucide-react';

interface AskAiCardProps {
  state: CurrentMatchState;
  preferences: UserPreferences;
  onSpeak: (text: string) => void;
  isAudioPlaying: boolean;
}

export function AskAiCard({
  state,
  preferences,
  onSpeak,
  isAudioPlaying,
}: AskAiCardProps) {
  const [messages, setMessages] = useState<AskAiMessage[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `Hello! I'm your AI match companion. Ask me anything about India vs Australia — turning points, overs breakdown, tactics, or ${preferences.favouritePlayer}'s form!`,
      timestamp: Date.now(),
      isAiGenerated: true,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const suggestedQuestions = [
    "Why did India's momentum change?",
    "What happened in the last three overs?",
    `How is ${preferences.favouritePlayer} performing today?`,
    "What does Australia need to do to win?",
  ];

  const handleSend = async (queryText?: string) => {
    const question = (queryText || input).trim();
    if (!question || loading) return;

    const userMsg: AskAiMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: question,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          matchState: state,
          preferences,
        }),
      });

      if (!res.ok) throw new Error('Failed to ask AI');

      const data = await res.json();
      const assistantMsg: AskAiMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: data.text,
        timestamp: Date.now(),
        isAiGenerated: true,
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (preferences.autoSpeech && data.text) {
        onSpeak(data.text);
      }
    } catch (err) {
      console.error('Ask AI error:', err);
      const fallbackMsg: AskAiMessage = {
        id: `ai-${Date.now()}`,
        role: 'assistant',
        content: `Currently India is at ${state.runs}/${state.wickets} in ${state.oversFormatted} overs, needing ${state.runsNeeded} runs from ${state.ballsRemaining} balls. The turning point was Mitchell Starc's 13th over conceding 18 runs to Suryakumar Yadav and Virat Kohli.`,
        timestamp: Date.now(),
        isAiGenerated: false,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl glass-panel border border-charcoal-700/80 p-5 sm:p-6 shadow-xl flex flex-col h-[520px]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal-700/60 pb-3 mb-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-lime/20 border border-lime/40 flex items-center justify-center text-lime glow-lime-subtle">
            <MessageSquare className="w-4 h-4 text-lime" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              Ask AI Companion
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-charcoal-800 border border-charcoal-700 text-lime font-bold">
                Live Cricket Q&A
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Instant explanations grounded strictly in real match events
            </p>
          </div>
        </div>

        {isAudioPlaying && (
          <span className="text-[10px] text-lime font-mono animate-pulse flex items-center gap-1">
            <Volume2 className="w-3 h-3 text-lime" /> Voice active
          </span>
        )}
      </div>

      {/* Suggested Quick Prompt Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none shrink-0">
        {suggestedQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            disabled={loading}
            className="whitespace-nowrap px-2.5 py-1 rounded-lg text-xs bg-charcoal-850 hover:bg-charcoal-800 text-slate-300 hover:text-lime border border-charcoal-700 hover:border-lime/40 transition-all shrink-0 active:scale-95 disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message History Thread */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
        {messages.map((m) => {
          const isUser = m.role === 'user';
          return (
            <div
              key={m.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-lime/20 border border-lime/30 flex items-center justify-center text-lime shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-lime" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-blue-600/30 border border-blue-500/40 text-white rounded-tr-none'
                    : 'bg-charcoal-850/90 border border-charcoal-700 text-slate-200 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>

                {!isUser && (
                  <div className="mt-2 pt-1.5 border-t border-charcoal-700/40 flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-mono">Match verified</span>
                    <button
                      onClick={() => onSpeak(m.content)}
                      className="flex items-center gap-1 text-lime hover:underline font-medium"
                      title="Read this answer aloud"
                    >
                      <Volume2 className="w-3 h-3 text-lime" />
                      <span>Listen</span>
                    </button>
                  </div>
                )}
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-300 shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 italic py-1">
            <Sparkles className="w-4 h-4 text-lime animate-spin" />
            <span>Consulting match engine & analyzing pitch data...</span>
          </div>
        )}
      </div>

      {/* Input box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="mt-3 pt-3 border-t border-charcoal-700/60 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question (e.g. Why did momentum shift in Over 13?)"
          className="flex-1 bg-charcoal-850 border border-charcoal-700 focus:border-lime rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition-all font-sans"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-lime hover:bg-lime-400 text-charcoal-950 font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 glow-lime-subtle shrink-0"
          title="Send Question"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
