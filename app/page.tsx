"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";

type Message = {
  role: "assistant" | "user";
  text: string;
};

type LeadForm = {
  name: string;
  email: string;
  business: string;
};

const PROMPTS = [
  "What services do you offer?",
  "How much does it cost?",
  "I want to book",
  "How do you capture leads?",
  "Can this work for my business?",
];

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I’m Huginn Assist. I can help explain how this assistant handles customer questions, lead capture, pricing, and booking flow for businesses.",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadForm, setLeadForm] = useState<LeadForm>({
    name: "",
    email: "",
    business: "",
  });

  const userMessageCount = useMemo(
    () => messages.filter((m) => m.role === "user").length,
    [messages]
  );

  const shouldOfferLeadCapture = !leadSubmitted && userMessageCount >= 2;

  const getAssistantReply = (text: string): string => {
    const t = text.trim().toLowerCase();

    if (
      t.includes("service") ||
      t.includes("what do you offer") ||
      t.includes("offer")
    ) {
      return "Huginn Assist can be tailored to answer customer questions, guide visitors through services, support booking flow, and capture lead information for follow-up.";
    }

    if (
      t.includes("cost") ||
      t.includes("price") ||
      t.includes("pricing") ||
      t.includes("how much")
    ) {
      return "Pricing depends on the business setup, conversation flow, and lead capture needs. I can tailor a version around your services and workflow.";
    }

    if (
      t.includes("book") ||
      t.includes("booking") ||
      t.includes("appointment") ||
      t.includes("schedule")
    ) {
      return "Yes — Huginn Assist can help guide conversations toward booking by answering questions, collecting details, and moving visitors toward the next step.";
    }

    if (
      t.includes("lead") ||
      t.includes("capture") ||
      t.includes("email") ||
      t.includes("phone")
    ) {
      return "It can collect lead details like name, email, phone number, and business context so follow-up opportunities are less likely to get missed.";
    }

    if (
      t.includes("business") ||
      t.includes("can this work for my business") ||
      t.includes("would this work")
    ) {
      return "Yes — it’s built for real business use, especially small businesses that want faster customer response, better lead handling, and a simpler contact flow.";
    }

    if (
      t.includes("real") ||
      t.includes("demo") ||
      t.includes("scripted")
    ) {
      return "This is a working assistant experience built to simulate real business interaction flow — not just a static scripted demo.";
    }

    if (
      t.includes("analyze") ||
      t.includes("analysis") ||
      t.includes("friction") ||
      t.includes("missed leads")
    ) {
      return "Huginn Analyze is the business analysis layer of the system — built to identify lead friction, weak contact flow, and missed opportunity risks before improving the experience with Huginn Assist.";
    }

    if (
      t.includes("how do i get one") ||
      t.includes("get one") ||
      t.includes("contact") ||
      t.includes("reach erick") ||
      t.includes("started")
    ) {
      return "If you'd like, I can connect you with Erick directly — you can also reach him at erick.madrid@huginnassist.com.";
    }

    return "Huginn Assist is designed to answer customer questions, guide service conversations, support booking flow, and capture leads automatically. You can ask about services, pricing, booking, or how it works for a business.";
  };

  const pushAssistantReply = (userText: string) => {
    const assistantReply = getAssistantReply(userText);

    const updatedMessages: Message[] = [
      ...messages,
      { role: "user", text: userText },
      { role: "assistant", text: assistantReply },
    ];

    if (shouldOfferLeadCapture) {
      updatedMessages.push({
        role: "assistant",
        text: "Would you like to leave your email and business info so I can send your request to Erick.Automation?",
      });
      setShowLeadForm(true);
    }

    setMessages(updatedMessages);
  };

  const handlePromptClick = (prompt: string) => {
    pushAssistantReply(prompt);
  };

  const handleSend = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    pushAssistantReply(trimmed);
    setInputValue("");
  };

  const handleLeadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLeadSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!leadForm.name || !leadForm.email || !leadForm.business) return;

    const savedLeads = JSON.parse(
      localStorage.getItem("huginn_assist_leads") || "[]"
    );

    const nextLead = {
      ...leadForm,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "huginn_assist_leads",
      JSON.stringify([...savedLeads, nextLead])
    );

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: `Name: ${leadForm.name} | Email: ${leadForm.email} | Business: ${leadForm.business}`,
      },
      {
        role: "assistant",
        text: "Perfect — I’ve saved that. Erick can follow up with you directly about building Huginn Assist for your business.",
      },
    ]);

    setLeadSubmitted(true);
    setShowLeadForm(false);
    setLeadForm({
      name: "",
      email: "",
      business: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_35%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.10),transparent_30%)]" />

      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/15 via-violet-500/10 to-transparent" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-4xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-2xl border border-sky-400/20 bg-slate-900/80 p-2 shadow-lg shadow-sky-500/10">
                <Image
                  src="/huginn-logo.png"
                  alt="Huginn Assist Logo"
                  width={64}
                  height={64}
                  className="rounded-xl"
                  priority
                />
              </div>

              <div>
                <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
                  ErickAutomation
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-100">
                  Huginn Assist
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  AI-powered business assistant for customer interaction and lead capture
                </p>
              </div>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-50 md:text-6xl">
              AI assistant that answers customers and captures leads automatically
            </h1>

            <p className="mt-5 text-lg leading-8 text-slate-300 md:text-xl">
              Try it live below — no signup needed.
            </p>

            <p className="mt-2 text-sm font-medium text-sky-300">
              Built for real business use — not just a demo.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#demo"
                className="rounded-2xl bg-gradient-to-r from-sky-400 to-violet-500 px-6 py-3 font-medium text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.02] hover:shadow-sky-400/20"
              >
                Try Huginn Assist
              </a>
              <a
                href="#system"
                className="rounded-2xl border border-sky-400/30 bg-slate-900/80 px-6 py-3 font-medium text-sky-200 shadow-lg shadow-sky-500/10 transition hover:scale-[1.02] hover:border-sky-300 hover:bg-slate-900"
              >
                How It Works
              </a>
              <a
                href="#contact"
                className="rounded-2xl border border-slate-700 px-6 py-3 font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
              >
                Contact Erick
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12" id="system">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-violet-500/10 p-6 shadow-lg shadow-sky-500/5">
            <h2 className="text-2xl font-bold">What this assistant can do</h2>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li>• Answer customer questions instantly</li>
              <li>• Guide conversations toward booking</li>
              <li>• Capture emails and phone numbers</li>
              <li>• Reduce missed opportunities</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
            <h2 className="text-2xl font-bold">Designed for businesses that:</h2>
            <ul className="mt-4 space-y-2 text-slate-300">
              <li>• Get leads but don’t respond fast enough</li>
              <li>• Miss opportunities due to delayed follow-up</li>
              <li>• Want a simple way to capture and respond automatically</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
          <h2 className="text-2xl font-bold">Analyze → Improve → Capture</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
              <h3 className="font-semibold text-sky-300">Analyze</h3>
              <p className="mt-2 text-sm text-slate-300">
                Spot lead friction, weak contact flow, and missed opportunity risks.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
              <h3 className="font-semibold text-sky-300">Improve</h3>
              <p className="mt-2 text-sm text-slate-300">
                Guide visitors through questions, services, and next steps more clearly.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-800 bg-slate-950/80 p-5">
              <h3 className="font-semibold text-sky-300">Capture</h3>
              <p className="mt-2 text-sm text-slate-300">
                Collect contact details so follow-up doesn’t get lost.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" id="demo">
        <div className="mb-8 flex flex-wrap gap-3">
          {[
            "Customer Q&A",
            "Follow-up Aware",
            "Lead Capture",
            "Booking Guidance",
            "Business Flow",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full border border-sky-400/20 bg-slate-900/80 px-4 py-2 text-sm text-sky-200 shadow-sm shadow-sky-500/5"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mb-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-xl shadow-black/20">
            <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
              Try Huginn Assist
            </p>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Talk with my business assistant
            </h2>
            <p className="mt-4 text-slate-300">
              Huginn Assist is my business-facing assistant built to answer questions,
              guide conversations, support service flow, and capture leads in a more
              natural way.
            </p>

            <p className="mt-6 text-slate-300">
              Try one of these prompts or type your own:
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-sky-500/15 bg-slate-950 p-6 shadow-xl shadow-sky-950/20">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
                  Live assistant
                </p>
                <h3 className="mt-2 text-xl font-semibold">Huginn Assist</h3>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                Active
              </span>
            </div>

            <div className="h-[320px] overflow-y-auto rounded-2xl border border-sky-500/10 bg-gradient-to-b from-slate-900/80 to-slate-950 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-sky-300 to-sky-400 text-slate-950 shadow-md shadow-sky-500/10"
                          : "border border-sky-500/10 bg-slate-950 text-slate-200"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="Ask about services, pricing, booking, or lead capture..."
                className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
              <button
                onClick={handleSend}
                className="rounded-xl bg-gradient-to-r from-sky-400 to-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:scale-[1.01]"
              >
                Send
              </button>
            </div>

            {showLeadForm && !leadSubmitted && (
              <form
                onSubmit={handleLeadSubmit}
                className="mt-4 space-y-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
              >
                <p className="text-sm font-medium text-sky-300">
                  Request Huginn Assist
                </p>

                <input
                  type="text"
                  name="name"
                  value={leadForm.name}
                  onChange={handleLeadChange}
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />

                <input
                  type="email"
                  name="email"
                  value={leadForm.email}
                  onChange={handleLeadChange}
                  placeholder="Your email"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />

                <input
                  type="text"
                  name="business"
                  value={leadForm.business}
                  onChange={handleLeadChange}
                  placeholder="Business name or industry"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-sky-400 to-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:scale-[1.01]"
                >
                  Send to Erick
                </button>

                <p className="text-xs text-slate-400">
                  Demo version: lead info is saved in this browser using localStorage.
                </p>
              </form>
            )}

            <p className="mt-4 text-sm text-sky-300">
              This is a working assistant experience built to simulate real business interaction flow.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
            <h2 className="text-3xl font-bold">Why this matters</h2>
            <p className="mt-4 text-slate-300">
              A lot of businesses lose opportunities because they respond too slowly,
              miss inquiries, or don’t have a clear process for handling leads.
              Huginn Assist is built to reduce that friction and help businesses
              respond faster and smarter.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-sky-500/10 to-violet-500/10 p-8">
            <h2 className="text-3xl font-bold">Built with a practical mindset</h2>
            <p className="mt-4 text-slate-300">
              I focus on real use cases, simple implementation paths, and systems that
              can grow over time instead of flashy tech that looks impressive but
              solves nothing.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-slate-200">
              In Development
            </h2>

            <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20">
              <h3 className="text-lg font-semibold text-slate-100">
                Ember Companion (In Progress)
              </h3>

              <p className="mt-3 text-slate-300">
                A long-term AI companion system focused on memory, personality, and
                consistent interaction design.
              </p>

              <p className="mt-2 text-sm text-slate-400">
                Part of the broader Huginn system currently in development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800" id="contact">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Want one for your business?
            </h2>

            <p className="mt-4 text-slate-300">Reach out directly:</p>

            <a
              href="mailto:erick.madrid@huginnassist.com"
              className="mt-2 inline-block text-lg font-medium text-sky-300 underline underline-offset-4"
            >
              erick.madrid@huginnassist.com
            </a>

            <p className="mt-4 text-sm text-slate-400">
              Built and maintained by a real developer — not just an automated tool.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:erick.madrid@huginnassist.com"
                className="rounded-2xl bg-slate-100 px-6 py-3 font-medium text-slate-950 transition hover:scale-[1.02]"
              >
                Email Erick
              </a>
              <a
                href="https://www.instagram.com/Erick.Automation"
                className="rounded-2xl border border-slate-700 px-6 py-3 font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
                target="_blank"
                rel="noreferrer"
              >
                Instagram: @Erick.Automation
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 py-6 text-center text-sm text-slate-400">
        <div>ErickAutomation | Huginn Assist</div>
        <div className="mt-1">
          AI-powered business assistant for customer interaction and lead capture
        </div>
        <div className="mt-1">Contact: erick.madrid@huginnassist.com</div>
      </footer>
    </div>
  );
}