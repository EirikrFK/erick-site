"use client";

import React, { useState } from "react";
import Image from "next/image";

type Message = {
  role: "assistant" | "user";
  text: string;
};

export default function ErickAIDemoWebsite() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Hi, I’m Huginn Assist. I can answer questions about the AI assistants Erick builds for businesses.",
    },
  ]);

  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);

  const handleDemoPrompt = (prompt: string) => {
    const nextMessages: Message[] = [
      ...messages,
      { role: "user", text: prompt },
    ];

    let reply =
      "I can help explain how the assistant works and how it helps businesses capture leads.";

    if (prompt === "What does it do?") {
      reply =
        "It answers customer questions, captures leads, and helps guide website visitors toward contacting or booking.";
    } else if (prompt === "Who is it for?") {
      reply =
        "It’s best for small businesses, service providers, and anyone who wants faster responses without extra work.";
    } else if (prompt === "How does lead capture work?") {
      reply =
        "The assistant can ask for a visitor’s email or phone number during conversation so the business can follow up.";
    } else if (prompt === "How would mine be customized?") {
      reply =
        "Each assistant is customized around your services, pricing, and customer flow.";
    } else if (prompt === "How do I get one?") {
      reply =
        "You can reach out below or leave your info and Erick can build one for your business.";
    }

    const updatedMessages: Message[] = [
      ...nextMessages,
      { role: "assistant", text: reply },
    ];

    if (
      !leadSubmitted &&
      nextMessages.filter((m) => m.role === "user").length >= 3
    ) {
      updatedMessages.push({
        role: "assistant" as const,
        text: "Want one for your business? Drop your name, email, and business below.",
      });

      setShowLeadForm(true);
    }

    setMessages(updatedMessages);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">

          <div className="mb-6 flex items-center gap-4">
            <Image
              src="/huginn-logo.png"
              alt="Huginn Assist Logo"
              width={60}
              height={60}
            />

            <div>
              <p className="text-sm text-sky-300 uppercase">
                ErickAutomation
              </p>
              <p className="text-xl font-semibold">Huginn Assist</p>
            </div>
          </div>

          <h1 className="text-4xl font-bold md:text-6xl">
            AI assistants that answer questions and capture leads automatically
          </h1>

          <p className="mt-6 text-slate-300">
            Built for businesses that want faster responses, fewer missed
            inquiries, and better customer interaction.
          </p>

          <div className="mt-8 flex gap-4">
            <a
              href="#demo"
              className="bg-sky-400 text-slate-950 px-6 py-3 rounded-xl"
            >
              Try Huginn Assist
            </a>
          </div>
        </div>
      </section>

      {/* DEMO */}
      <section id="demo" className="mx-auto max-w-6xl px-6 py-16">

        <h2 className="text-3xl font-bold mb-6">
          Talk with Huginn Assist
        </h2>

        <div className="flex flex-wrap gap-3 mb-6">
          {[
            "What does it do?",
            "Who is it for?",
            "How does lead capture work?",
            "How would mine be customized?",
            "How do I get one?",
          ].map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleDemoPrompt(prompt)}
              className="border px-4 py-2 rounded-xl"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="border rounded-xl p-4 h-[300px] overflow-y-auto bg-slate-900">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-3 ${
                msg.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  msg.role === "user"
                    ? "bg-sky-400 text-black"
                    : "bg-slate-800"
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        {showLeadForm && !leadSubmitted && (
          <div className="mt-6 p-4 border rounded-xl bg-slate-900">
            <input
              placeholder="Your Name"
              className="w-full mb-2 p-2 bg-slate-800"
            />
            <input
              placeholder="Email"
              className="w-full mb-2 p-2 bg-slate-800"
            />
            <input
              placeholder="Business"
              className="w-full mb-2 p-2 bg-slate-800"
            />

            <button
              onClick={() => setLeadSubmitted(true)}
              className="bg-sky-400 text-black px-4 py-2 rounded-xl w-full"
            >
              Submit
            </button>
          </div>
        )}
      </section>

      {/* EMBER */}
      <section className="border-t border-slate-800 px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-xl font-bold mb-4">In Development</h2>

        <div className="border p-6 rounded-xl bg-slate-900">
          <h3 className="font-semibold">Ember Companion (In Progress)</h3>
          <p className="text-slate-400 mt-2">
            A long-term AI companion system focused on memory, personality, and
            consistent interaction design.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="border-t border-slate-800 px-6 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold">
          Get Huginn Assist for your business
        </h2>

        <div className="mt-6 flex gap-4">
          <a
            href="mailto:erickfmadrid@gmail.com"
            className="bg-white text-black px-6 py-3 rounded-xl"
          >
            Email Erick
          </a>

          <a
            href="https://instagram.com/Erick.Automation"
            className="border px-6 py-3 rounded-xl"
          >
            Instagram
          </a>
        </div>
      </section>
    </div>
  );
}