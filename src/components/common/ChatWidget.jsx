/**
 * ChatWidget.jsx — Lily · Your Reflection
 * Proactive (auto-opens) + lead-magnetic. Conversation capped, then pushes to My Reflection.
 * Place at: src/components/common/ChatWidget.jsx
 */

import React, { useState, useRef, useEffect, useCallback } from "react";

const WORKER_URL = "https://littlehugs-chat.mdi-operations.workers.dev";
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xvzlerle"; // same waitlist pipeline
const AUTO_OPEN_DELAY = 9000; // ms before Lily opens herself
const OFFER_AFTER_USER_MSGS = 2; // soft offer card appears after the 2nd reply
const MAX_USER_MSGS = 10; // hard cap — after this, push to My Reflection

const PUSH_MESSAGE =
  "We've shared a lot today 🤍 The kindest next step is your Reflection — a free 5-minute check-in that gives you a personal wellness snapshot and a 3-minute reset ritual, just for you. Shall we begin?";

const STARTER_PROMPTS = [
  "How do I find a few minutes for myself in a busy day?",
  "I'm feeling stretched thin — where do I start?",
  "What's a simple way to reset when I'm overwhelmed?",
];

function openerForPath() {
  const p = (typeof window !== "undefined" && window.location.pathname) || "/";
  if (p.includes("assesment") || p.includes("assessment"))
    return "Hi! I'm Lily 🤍 Taking a minute for yourself? I'm right here. How are you feeling today?";
  if (p.includes("about"))
    return "Hi! I'm Lily — your Reflection companion 🤍 Glad you're getting to know us. How are you really doing today?";
  return "Hi! I'm Lily — your Reflection companion 🤍 I'm here for you, whatever today has been like. How are you really doing?";
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(() => [
    { role: "assistant", content: openerForPath() },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showStarters, setShowStarters] = useState(true);

  // Lead-magnetic offer + conversation cap
  const userMsgCountRef = useRef(0);
  const [showOffer, setShowOffer] = useState(false);
  const [offerDismissed, setOfferDismissed] = useState(false);
  const [offerEmail, setOfferEmail] = useState("");
  const [offerStatus, setOfferStatus] = useState("idle"); // idle | submitting | done | error
  const [limitReached, setLimitReached] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const seen = () => {
    try {
      return sessionStorage.getItem("lh_lily_seen") === "1";
    } catch {
      return false;
    }
  };
  const markSeen = () => {
    try {
      sessionStorage.setItem("lh_lily_seen", "1");
    } catch {}
  };

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current)
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading, showOffer, limitReached]);

  // Focus input on open
  useEffect(() => {
    if (isOpen && inputRef.current && !limitReached)
      setTimeout(() => inputRef.current?.focus(), 150);
  }, [isOpen, limitReached]);

  // Proactive: auto-open the chat (time-on-page or exit-intent), once per session
  useEffect(() => {
    if (seen()) return;
    let fired = false;
    const fire = () => {
      if (fired) return;
      fired = true;
      setIsOpen(true);
      markSeen();
    };
    const t = setTimeout(fire, AUTO_OPEN_DELAY);
    const onLeave = (e) => {
      if (e.clientY <= 0) fire();
    };
    document.addEventListener("mouseleave", onLeave);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mouseleave", onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Mark seen if opened manually (so it won't auto-open later)
  useEffect(() => {
    if (isOpen) {
      try {
        sessionStorage.setItem("lh_lily_seen", "1");
      } catch {}
    }
  }, [isOpen]);

  const sendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading || limitReached) return;
      setShowStarters(false);

      const userMsg = { role: "user", content: trimmed };
      const updatedMessages = [...messages, userMsg];
      setMessages(updatedMessages);
      setInput("");
      setIsLoading(true);

      userMsgCountRef.current += 1;
      const count = userMsgCountRef.current;
      if (count >= OFFER_AFTER_USER_MSGS && !offerDismissed) setShowOffer(true);

      try {
        const res = await fetch(WORKER_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.message) throw new Error("No response");
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "I had a little moment — please try sending that again. 🤍",
          },
        ]);
      } finally {
        setIsLoading(false);
        if (count >= MAX_USER_MSGS) {
          setLimitReached(true);
          setShowOffer(true);
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: PUSH_MESSAGE },
          ]);
        }
      }
    },
    [messages, isLoading, offerDismissed, limitReached]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const startReflection = () => {
    try {
      window.location.assign("/assesment");
    } catch {}
  };

  const submitOffer = async (e) => {
    e.preventDefault();
    if (!offerEmail.trim()) return;
    setOfferStatus("submitting");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: offerEmail, source: "lily-reset-ritual" }),
      });
      setOfferStatus(res.ok ? "done" : "error");
      if (res.ok) setOfferEmail("");
    } catch {
      setOfferStatus("error");
    }
  };

  return (
    <>
      {/* Floating toggle */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? "Close wellness chat" : "Open wellness chat"}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "#4F7DDD",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(79,125,221,0.45)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.boxShadow = "0 6px 24px rgba(79,125,221,0.6)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 4px 20px rgba(79,125,221,0.45)";
        }}
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "92px",
            right: "24px",
            zIndex: 9998,
            width: "340px",
            height: "520px",
            borderRadius: "20px",
            background: "#FAF3ED",
            border: "1px solid #f0e0d0",
            boxShadow: "0 12px 48px rgba(0,0,0,0.16)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "lhSlideUp 0.25s ease",
          }}
        >
          <style>{`
            @keyframes lhSlideUp { from { opacity: 0; transform: translateY(16px);} to { opacity: 1; transform: translateY(0);} }
            @keyframes lhBounce { 0%,80%,100%{transform:translateY(0);} 40%{transform:translateY(-5px);} }
            .lh-dot { animation: lhBounce 1.2s infinite ease-in-out; }
            .lh-dot:nth-child(2){animation-delay:0.15s;} .lh-dot:nth-child(3){animation-delay:0.30s;}
            .lh-send-btn:disabled{opacity:0.4;cursor:not-allowed;}
          `}</style>

          {/* Header */}
          <div style={{ background: "#4F7DDD", padding: "12px 16px", display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ color: "white", fontWeight: 600, fontSize: "14px", margin: 0, lineHeight: 1.2 }}>Lily · Your Reflection</p>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "11px", margin: 0, lineHeight: 1.3 }}>Your Reflection companion</p>
            </div>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#6EE7B7" }} />
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: "10px" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "85%", padding: "9px 13px", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: msg.role === "user" ? "#4F7DDD" : "#ffffff", color: msg.role === "user" ? "#ffffff" : "#333333", fontSize: "13px", lineHeight: 1.5, boxShadow: "0 1px 3px rgba(0,0,0,0.08)", whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ background: "#ffffff", borderRadius: "18px 18px 18px 4px", padding: "12px 16px", display: "flex", gap: "4px", alignItems: "center", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                  {[0, 1, 2].map((n) => (
                    <div key={n} className="lh-dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#CBD5E0" }} />
                  ))}
                </div>
              </div>
            )}

            {/* Soft offer card (before the hard cap) */}
            {showOffer && !offerDismissed && !limitReached && (
              <div style={{ background: "#ffffff", border: "1px solid #f0e0d0", borderRadius: "16px", padding: "14px", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                <p style={{ margin: "0 0 10px", fontSize: "13px", lineHeight: 1.5, color: "#333", fontWeight: 600 }}>
                  Want your reflection snapshot + a 3-minute reset ritual — just for you? 🤍
                </p>
                <button onClick={startReflection} style={{ width: "100%", background: "#1E2C2B", color: "white", border: "none", borderRadius: "999px", padding: "10px", fontSize: "13px", fontWeight: 600, cursor: "pointer", marginBottom: "10px" }}>
                  Start My Reflection →
                </button>
                {offerStatus === "done" ? (
                  <p style={{ margin: 0, fontSize: "12.5px", color: "#15803d", textAlign: "center", fontWeight: 600 }}>It's on its way 🤍 Check your inbox.</p>
                ) : (
                  <>
                    <p style={{ margin: "0 0 6px", fontSize: "11.5px", color: "#7b7d82", textAlign: "center" }}>Not now? I'll send the reset ritual to your inbox.</p>
                    <form onSubmit={submitOffer} style={{ display: "flex", gap: "6px" }}>
                      <input type="email" required value={offerEmail} onChange={(e) => setOfferEmail(e.target.value)} placeholder="you@email.com" style={{ flex: 1, border: "1px solid #f0d8c4", borderRadius: "10px", padding: "8px 10px", fontSize: "12.5px", outline: "none", background: "white", color: "#333" }} />
                      <button type="submit" disabled={offerStatus === "submitting"} style={{ background: "#4F7DDD", color: "white", border: "none", borderRadius: "10px", padding: "0 12px", fontSize: "12px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{offerStatus === "submitting" ? "…" : "Send 🤍"}</button>
                    </form>
                    {offerStatus === "error" && <p style={{ margin: "6px 0 0", fontSize: "11px", color: "#dc2626", textAlign: "center" }}>Something slipped — try again?</p>}
                    <button onClick={() => setOfferDismissed(true)} style={{ width: "100%", marginTop: "8px", background: "transparent", border: "none", color: "#9ca3af", fontSize: "11.5px", cursor: "pointer" }}>Maybe later</button>
                  </>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Starter prompts */}
          {showStarters && !isLoading && !limitReached && (
            <div style={{ padding: "0 12px 8px", display: "flex", flexDirection: "column", gap: "5px", flexShrink: 0 }}>
              {STARTER_PROMPTS.map((prompt, i) => (
                <button key={i} onClick={() => sendMessage(prompt)} style={{ background: "white", border: "1px solid #dbeafe", borderRadius: "10px", padding: "7px 11px", fontSize: "11.5px", color: "#4F7DDD", cursor: "pointer", textAlign: "left", transition: "background 0.15s ease", lineHeight: 1.4 }} onMouseEnter={(e) => (e.currentTarget.style.background = "#EFF6FF")} onMouseLeave={(e) => (e.currentTarget.style.background = "white")}>
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Footer: input bar OR (after cap) the reflection push */}
          {limitReached ? (
            <div style={{ padding: "12px", borderTop: "1px solid rgba(240,224,208,0.8)", background: "#FAF3ED", flexShrink: 0 }}>
              <button onClick={startReflection} style={{ width: "100%", background: "#1E2C2B", color: "white", border: "none", borderRadius: "999px", padding: "12px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }}>
                Start My Reflection →
              </button>
              {offerStatus === "done" ? (
                <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#15803d", textAlign: "center", fontWeight: 600 }}>Your reset ritual is on its way 🤍</p>
              ) : (
                <form onSubmit={submitOffer} style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                  <input type="email" required value={offerEmail} onChange={(e) => setOfferEmail(e.target.value)} placeholder="Email for your reset ritual" style={{ flex: 1, border: "1px solid #f0d8c4", borderRadius: "10px", padding: "8px 10px", fontSize: "12.5px", outline: "none", background: "white", color: "#333" }} />
                  <button type="submit" disabled={offerStatus === "submitting"} style={{ background: "#4F7DDD", color: "white", border: "none", borderRadius: "10px", padding: "0 12px", fontSize: "12px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}>{offerStatus === "submitting" ? "…" : "Send 🤍"}</button>
                </form>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ padding: "10px 12px", borderTop: "1px solid rgba(240,224,208,0.8)", display: "flex", gap: "8px", alignItems: "center", background: "#FAF3ED", flexShrink: 0 }}>
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown} placeholder="Ask Lily anything…" disabled={isLoading} style={{ flex: 1, border: "1px solid #f0d8c4", borderRadius: "12px", padding: "8px 12px", fontSize: "13px", outline: "none", background: "white", color: "#333", transition: "border-color 0.15s" }} onFocus={(e) => (e.currentTarget.style.borderColor = "#4F7DDD")} onBlur={(e) => (e.currentTarget.style.borderColor = "#f0d8c4")} />
              <button type="submit" className="lh-send-btn" disabled={isLoading || !input.trim()} style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#4F7DDD", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "opacity 0.15s" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          )}
        </div>
      )}
    </>
  );
}
