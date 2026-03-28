"use client";

import React from "react";
import Image from "next/image";

type Message = {
  role: "assistant" | "user";
  text: string;
};

type LeadForm = {
  name: string;
  email: string;
  business: string;
};

export default function ErickAIDemoWebsite() {
  const [messages, setMessages] = React.useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I’m Huginn Assist. I can answer questions about the AI assistants Erick builds for businesses.",
    },
  ]);
  const [leadForm, setLeadForm] = React.useState<LeadForm>({
    name: "",
    email: "",
    business: "",
  });
  const [showLeadForm, setShowLeadForm] = React.useState(false);
  const [leadSubmitted, setLeadSubmitted] = React.useState(false);

  const handleDemoPrompt = (prompt: string) => {
  const nextMessages: Message[] = [
    ...messages,
    { role: "user", text: prompt },
  ];

  let reply =
    "I can help explain how the assistant works, what it can do, and how it helps businesses capture leads.";

  if (prompt === "What does it do?") {
    reply =
      "It answers customer questions, captures leads, and helps guide website visitors toward contacting or booking with a business.";
  } else if (prompt === "Who is it for?") {
    reply =
      "It’s best for small businesses, local service providers, creators, and businesses that want faster responses without adding more manual work.";
  } else if (prompt === "How does lead capture work?") {
    reply =
      "The assistant can ask for a visitor’s email, phone number, or message details during the conversation so the business can follow up later.";
  } else if (prompt === "How would mine be customized?") {
    reply =
      "Each assistant can be customized around a business’s services, pricing, contact flow, hours, and common customer questions.";
  } else if (prompt === "How do I get one?") {
    reply =
      "You can reach out through email or Instagram, or leave your info below and Erick can build a version around your business and customer flow.";
  }

  const updatedMessages: Message[] = [
    ...nextMessages,
    { role: "assistant", text: reply },
  ];

  if (!leadSubmitted && nextMessages.filter((m) => m.role === "user").length >= 3) {
    updatedMessages.push({
      role: "assistant" as const,
      text: "Want one for your business? Drop your name, email, and business below and Erick can follow up with you.",
    });
    setShowLeadForm(true);
  }

  setMessages(updatedMessages);
};

    const updatedMessages: Message[] = [
  ...nextMessages,
  { role: "assistant", text: reply },
];

    if (!leadSubmitted && nextMessages.filter((m) => m.role === "user").length >= 3) {
      updatedMessages.push({
  role: "assistant" as const,
  text: "Want one for your business? Drop your name, email, and business below and Erick can follow up with you.",
});
      });
      setShowLeadForm(true);
    }

    setMessages(updatedMessages);
  };

  const handleLeadChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setLeadForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleLeadSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!leadForm.name || !leadForm.email || !leadForm.business) {
      return;
    }

    const savedLeads = JSON.parse(localStorage.getItem("erickautomation_leads") || "[]");
    const nextLead = {
      ...leadForm,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "erickautomation_leads",
      JSON.stringify([...savedLeads, nextLead])
    );

    setMessages((prev) => [
      ...prev,
      { role: "user", text: `Name: ${leadForm.name} | Email: ${leadForm.email} | Business: ${leadForm.business}` },
      {
        role: "assistant",
        text: "Thanks — your info was saved. Erick can now follow up with you about building a custom assistant.",
      },
    ]);
    setLeadSubmitted(true);
    setShowLeadForm(false);
    setLeadForm({ name: "", email: "", business: "" });
  };

  const demoCards = [
    {
      title: "Business Assistant Demo",
      desc: "AI assistant that answers customer questions, captures leads, and guides visitors toward action.",
      bullets: ["FAQ answering", "Lead capture", "Booking prompts"],
    },
    {
      title: "Lead Opportunity Analyzer",
      desc: "A quick website analysis concept that highlights where a business may be losing leads or response opportunities.",
      bullets: ["Website contact scan", "Friction insights", "Missed opportunity report"],
    },
    {
      title: "Ember Companion Project",
      desc: "Long-term companion AI concept focused on conversation, memory, and emotionally consistent interaction design.",
      bullets: ["Conversation engine", "Memory system", "Personality design"],
    },
  ];

  const services = [
    {
      name: "AI Business Assistant",
      text: "A website assistant that answers common customer questions, captures leads, and helps guide visitors toward action.",
    },
    {
      name: "Lead Opportunity Analyzer",
      text: "A simple analysis concept that helps identify where a business may be losing leads, response opportunities, or follow-ups.",
    },
    {
      name: "Custom AI Demos",
      text: "Custom AI prototypes and lightweight demos for businesses that want to test ideas before investing in a bigger system.",
    },
  ];

  const demoPrompts: string[] = [
    "What does it do?",
    "Who is it for?",
    "How does lead capture work?",
    "How would mine be customized?",
    "How do I get one?",
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <section className="relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-500/15 via-violet-500/10 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(125,211,252,0.12),transparent_35%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.10),transparent_30%)]" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="mb-8 flex items-center gap-4">
              <div className="rounded-2xl border border-sky-400/20 bg-slate-900/80 p-2 shadow-lg shadow-sky-500/10">
                <Image
                  src="/huginn-logo.png"
                  alt="Huginn Assist Logo"
                  width={64}
                  height={64}
                  className="rounded-xl"
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
              AI assistants, demos, and automation systems built to help businesses capture more leads and save time.
            </h1>
            <p className="mt-6 text-lg leading-8 text-slate-300 md:text-xl">
              I build AI assistants for businesses, lead-capture systems, and custom automation demos that help turn missed inquiries into real opportunities.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#demo"
                className="rounded-2xl bg-gradient-to-r from-sky-400 to-violet-500 px-6 py-3 font-medium text-white shadow-lg shadow-sky-500/20 transition hover:scale-[1.02] hover:shadow-sky-400/20"
              >
                Try Huginn Assist
              </a>
              <a
                href="#demos"
                className="rounded-2xl border border-sky-400/30 bg-slate-900/80 px-6 py-3 font-medium text-sky-200 shadow-lg shadow-sky-500/10 transition hover:scale-[1.02] hover:border-sky-300 hover:bg-slate-900"
              >
                Explore Projects
              </a>
              <a
                href="#contact"
                className="rounded-2xl border border-slate-700 px-6 py-3 font-medium text-slate-100 transition hover:border-slate-500 hover:bg-slate-900"
              >
                Work With Me
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16" id="services">
        <div className="mb-8 rounded-3xl border border-sky-500/20 bg-gradient-to-r from-sky-500/10 to-violet-500/10 p-6 shadow-lg shadow-sky-500/5">
          <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
            Built for small businesses
          </p>
          <p className="mt-2 max-w-3xl text-slate-300">
            Ideal for businesses that want to answer customer questions faster, capture more inquiries, and reduce missed opportunities without adding more manual work.
          </p>
        </div>

        <div className="mb-10 max-w-2xl">
          <h2 className="text-3xl font-bold md:text-4xl">What I build</h2>
          <p className="mt-3 text-slate-300">
            Practical AI systems designed to answer customer questions, reduce missed leads, and create better customer interaction flows for small businesses.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.name}
              className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-black/20"
            >
              <h3 className="text-xl font-semibold">{service.name}</h3>
              <p className="mt-3 text-slate-300">{service.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-slate-800 bg-gradient-to-b from-slate-900/50 to-slate-950" id="demos">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 max-w-3xl">
            <h2 className="text-3xl font-bold md:text-4xl">
              Projects, demos, and concepts
            </h2>
            <p className="mt-3 text-slate-300">
              These are examples of the systems and concepts I’m building. Some are designed for business automation, while others reflect my longer-term AI product vision.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {demoCards.map((demo) => (
              <div
                key={demo.title}
                className="rounded-3xl border border-sky-500/10 bg-slate-950/95 p-6 shadow-xl shadow-sky-950/20 transition hover:border-sky-400/20 hover:shadow-sky-900/20"
              >
                <h3 className="text-xl font-semibold">{demo.title}</h3>
                <p className="mt-3 text-slate-300">{demo.desc}</p>
                <ul className="mt-4 space-y-2 text-sm text-slate-400">
                  {demo.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-sky-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <button className="mt-6 rounded-2xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-400 hover:text-sky-300">
                  Ask About This System
                </button>
              </div>
            ))}
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
              Huginn Assist is my business-facing assistant built to answer questions, guide conversations, support service flow, and capture leads in a more natural way.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              {demoPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleDemoPrompt(prompt)}
                  className="rounded-2xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 transition hover:border-sky-400 hover:text-sky-300"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-sky-500/10 bg-slate-950/95 p-6 shadow-xl shadow-sky-950/20 transition hover:border-sky-400/20 hover:shadow-sky-900/20">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
                  Demo chat
                </p>
                <h3 className="mt-2 text-xl font-semibold">
                  ErickAutomation Assistant
                </h3>
              </div>
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">
                Live Assistant
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
                  Save my info
                </button>
                <p className="text-xs text-slate-400">
                  Demo version: lead info is saved in this browser using localStorage.
                </p>
              </form>
            )}

            <p className="mt-4 text-sm text-slate-400">
              This is a lightweight site version of Huginn Assist. Full custom builds can be tailored around real business workflows, services, and lead flow.
            </p>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8">
            <h2 className="text-3xl font-bold">Why this matters</h2>
            <p className="mt-4 text-slate-300">
              A lot of businesses lose opportunities because they respond too slowly, miss inquiries, or don’t have a clear process for handling leads. Huginn Assist is built to reduce that friction and help businesses respond faster and smarter.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-sky-500/10 to-violet-500/10 p-8">
            <h2 className="text-3xl font-bold">Built with a practical mindset</h2>
            <p className="mt-4 text-slate-300">
              I focus on real use cases, simple implementation paths, and systems that can grow over time instead of flashy tech that looks impressive but solves nothing.
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
                A long-term AI companion system focused on memory, personality, and consistent interaction design.
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
              Get Huginn Assist for your business
            </h2>
            <p className="mt-4 text-slate-300">
              If you want Huginn Assist built around your services, pricing, and customer flow, this is the place to start.
            </p>

            <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-sky-300">
                Best fit
              </p>
              <p className="mt-3 text-slate-300">
                Best for small businesses, local service providers, creators, and anyone who wants a simple AI assistant or automation concept to improve customer response and lead capture.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="mailto:erickfmadrid@gmail.com"
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
    </div>
  );
}
