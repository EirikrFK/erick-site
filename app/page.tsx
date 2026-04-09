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
      text: "Hi, I’m Huginn Assist. I can explain how this assistant helps businesses answer questions, guide customers, and capture leads.",
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

  const getAssistantReply = (text: string): string => {
    const t = text.trim().toLowerCase();

    if (
      t.includes("service") ||
      t.includes("what do you offer") ||
      t.includes("offer")
    ) {
      return "Huginn Assist can be tailored to answer customer questions, explain services, guide next steps, and support lead capture for a business website.";
    }

    if (
      t.includes("cost") ||
      t.includes("price") ||
      t.includes("pricing") ||
      t.includes("how much")
    ) {
      return "Pricing depends on the setup, conversation flow, and lead capture needs. A version can be built around your services and workflow.";
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
      t.includes("would this work") ||
      t.includes("can this work")
    ) {
      return "Yes — it’s built for real business use, especially small businesses that want faster customer response, better lead handling, and a simpler contact flow.";
    }

    if (
      t.includes("real") ||
      t.includes("scripted") ||
      t.includes("demo")
    ) {
      return "This is a working assistant experience built to simulate real business interaction flow — not just a static scripted demo.";
    }

    if (
      t.includes("analyze") ||
      t.includes("analysis") ||
      t.includes("friction") ||
      t.includes("missed leads")
    ) {
      return "Huginn Analyze is the analysis layer of the system — built to identify lead friction, weak contact flow, and missed opportunity risks before improving the experience with Huginn Assist.";
    }

    if (
      t.includes("contact") ||
      t.includes("get one") ||
      t.includes("started") ||
      t.includes("reach erick") ||
      t.includes("how do i get one")
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

    if (!leadSubmitted && userMessageCount + 1 >= 2 && !showLeadForm) {
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
    <main className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(139,92,246,0.12),transparent_30%),linear-gradient(to_bottom,#020617,#020617)]" />

      <section>
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-12 md:pb-32 md:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-10 flex items-center justify-center gap-6">
              <div className="rounded-2xl border border-sky-400/20 bg-slate-900/70 p-2 shadow-[0_0_40px_rgba(56,189,248,0.10)] backdrop-blur">
                <Image
                  src="/huginn-logo.png"
                  alt="Huginn Assist Logo"
                  width={64}
                  height={64}
                  className="rounded-xl"
                  priority
                />
              </div>

              <div className="text-left">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-300">
                  ErickAutomation
                </p>
                <p className="mt-1 text-2xl font-semibold text-white">
                  Huginn Assist
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  AI-powered business assistant for customer interaction and lead capture
                </p>
              </div>
            </div>

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight text-white md:text-7xl">
              AI assistant that answers customers and captures leads automatically
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Try it live below — no signup needed.
            </p>

            <p className="mt-2 text-sm font-medium text-sky-300">
              Built for real business use — not just a demo.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="#demo"
                className="rounded-2xl bg-gradient-to-r from-sky-400 to-violet-500 px-6 py-3 font-medium text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.03] hover:shadow-sky-400/30"
              >
                Try Huginn Assist
              </a>
              <a
                href="#system"
                className="rounded-2xl border border-sky-400/30 bg-slate-900/60 px-6 py-3 font-medium text-sky-200 backdrop-blur transition hover:scale-[1.02] hover:border-sky-300"
              >
                How It Works
              </a>
              <a
                href="#contact"
                className="rounded-2xl border border-slate-700 bg-slate-900/30 px-6 py-3 font-medium text-slate-100 transition hover:scale-[1.02] hover:border-slate-500"
              >
                Contact Erick
              </a>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-4xl px-6 pb-10 text-center md:pb-14">
          <p className="text-xl font-medium leading-8 text-sky-300 md:text-2xl">
            This isn’t a demo — it’s how your business could respond to customers 24/7.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24" id="system">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
              What this does
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white md:text-5xl">
              Answers questions. Guides customers. Captures leads.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Huginn Assist is designed for real customer interaction flow — helping businesses respond faster, guide visitors clearly, and reduce missed opportunities.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Answer customer questions instantly",
              "Guide conversations toward booking",
              "Capture emails and phone numbers",
              "Reduce missed opportunities",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-900/40 p-6 text-slate-200 shadow-[0_10px_30px_rgba(2,6,23,0.18)] backdrop-blur transition hover:-translate-y-1"
              >
                <p className="text-base leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-8 md:py-12">
        <div className="rounded-[2rem] bg-slate-900/35 p-8 backdrop-blur md:p-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
                Analyze
              </p>
              <p className="mt-3 text-lg leading-8 text-slate-300">
                Spot lead friction, weak contact flow, and missed opportunity risks.
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
                Improve
              </p>
              <p className="mt-3 text-lg leading-8 text-slate-300">
                Guide visitors through services, questions, and next steps more clearly.
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
                Capture
              </p>
              <p className="mt-3 text-lg leading-8 text-slate-300">
                Collect contact details so follow-up doesn’t get lost.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-12 md:grid-cols-3 md:items-start">
          <div className="md:col-span-1">
            <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
              Designed for businesses that
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Need faster response without more manual work
            </h2>
          </div>

          <div className="md:col-span-2 grid gap-4 sm:grid-cols-3">
            {[
              "Get leads but don’t respond fast enough",
              "Miss opportunities due to delayed follow-up",
              "Want a simple way to capture and respond automatically",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-slate-900/30 p-6 text-slate-300"
              >
                <p className="text-base leading-7">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24" id="demo">
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
              className="rounded-full border border-sky-400/20 bg-slate-900/60 px-4 py-2 text-sm text-sky-200 backdrop-blur"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
              Try Huginn Assist
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
              Talk with my business assistant
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              Huginn Assist is the business-facing system in my Huginn ecosystem — built to answer questions, guide conversations, support service flow, and capture leads naturally.
            </p>

            <p className="mt-8 text-slate-300">
              Try one of these prompts or type your own:
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              {PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className="rounded-2xl border border-slate-700 bg-slate-900/40 px-4 py-2 text-sm font-medium text-slate-100 transition hover:scale-[1.02] hover:border-sky-400 hover:bg-slate-800/60 hover:text-sky-300"
                >
                  {prompt}
                </button>
              ))}
            </div>

            <p className="mt-8 text-sm text-sky-300">
              This is a working assistant — not a scripted demo.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-r from-sky-500/20 to-violet-500/20 blur-3xl" />
            <div className="rounded-[2rem] bg-slate-950/90 p-6 shadow-[0_20px_80px_rgba(2,6,23,0.7)] backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
                    Live assistant
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-white">
                    Huginn Assist
                  </h3>
                </div>
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                  Active
                </span>
              </div>

              <div className="h-[420px] overflow-y-auto rounded-3xl bg-gradient-to-b from-slate-900/80 to-slate-950 p-4">
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
                            : "bg-slate-900 text-slate-200"
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
                  className="w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                />
                <button
                  onClick={handleSend}
                  className="rounded-2xl bg-gradient-to-r from-sky-400 to-violet-500 px-5 py-3 text-sm font-medium text-white transition hover:scale-[1.02]"
                >
                  Send
                </button>
              </div>

              {showLeadForm && !leadSubmitted && (
                <form
                  onSubmit={handleLeadSubmit}
                  className="mt-5 space-y-3 rounded-3xl bg-slate-900/70 p-4"
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
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />

                  <input
                    type="email"
                    name="email"
                    value={leadForm.email}
                    onChange={handleLeadChange}
                    placeholder="Your email"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />

                  <input
                    type="text"
                    name="business"
                    value={leadForm.business}
                    onChange={handleLeadChange}
                    placeholder="Business name or industry"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
                  />

                  <button
                    type="submit"
                    className="w-full rounded-2xl bg-gradient-to-r from-sky-400 to-violet-500 px-4 py-3 text-sm font-medium text-white transition hover:scale-[1.02]"
                  >
                    Send to Erick
                  </button>

                  <p className="text-xs text-slate-400">
                    Demo version: lead info is saved in this browser using localStorage.
                  </p>
                </form>
              )}

              <p className="mt-4 text-sm text-slate-400">
                This is a working assistant experience built to simulate real business interaction flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
              Why this matters
            </p>
            <h2 className="mt-3 text-4xl font-semibold text-white">
              Businesses lose opportunities when response flow breaks down
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
              A lot of businesses lose opportunities because they respond too slowly, miss inquiries, or don’t have a clear process for handling leads. Huginn Assist is built to reduce that friction and help businesses respond faster and smarter.
            </p>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-sky-500/10 to-violet-500/10 p-8">
            <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
              Practical mindset
            </p>
            <h3 className="mt-3 text-3xl font-semibold text-white">
              Built for real use cases
            </h3>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              I focus on real use cases, simple implementation paths, and systems that can grow over time instead of flashy tech that looks impressive but solves nothing.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
            In development
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-white">
            Ember Companion
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-300">
            A long-term AI companion system focused on memory, personality, and consistent interaction design.
          </p>
          <p className="mt-3 text-sm text-slate-400">
            Part of the broader Huginn system currently in development.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24" id="contact">
        <div className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.25em] text-sky-300">
            Contact
          </p>
          <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
            Want one for your business?
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Reach out directly if you want Huginn Assist built around your services, pricing, and customer flow.
          </p>

          <a
            href="mailto:erick.madrid@huginnassist.com"
            className="mt-6 inline-block text-xl font-medium text-sky-300 underline underline-offset-4"
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
              className="rounded-2xl border border-slate-700 bg-slate-900/30 px-6 py-3 font-medium text-slate-100 transition hover:scale-[1.02] hover:border-slate-500"
              target="_blank"
              rel="noreferrer"
            >
              Instagram: @Erick.Automation
            </a>
          </div>
        </div>
      </section>

      <footer className="py-8 text-center text-sm text-slate-400">
        <div>ErickAutomation | Huginn Assist</div>
        <div className="mt-1">
          AI-powered business assistant for customer interaction and lead capture
        </div>
        <div className="mt-1">Contact: erick.madrid@huginnassist.com</div>
      </footer>
    </main>
  );
}