"use client";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Card } from "@/components/ui/card";
import { m } from "framer-motion";

// Pastel colors for icon backgrounds
const pastelColors = ["bg-pink-200", "bg-blue-200", "bg-purple-200"];

const stats = [
  {
    value: "6+",
    label: "Years of Experience",
    icon: "💼",
    color: pastelColors[0],
  },
  {
    value: "40%",
    label: "UI Dev Time Reduction",
    icon: "⚡",
    color: pastelColors[1],
  },
  {
    value: "90%",
    label: "Test Coverage Achieved",
    icon: "✅",
    color: pastelColors[2],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-12 text-center">
            About Me
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              <p className="text-lg text-gray-600 leading-relaxed">
                I&apos;m a software engineer with 6+ years shipping production
                apps, including 2 years as a team lead. Most of that time was
                native iOS: Swift, SwiftUI, UIKit, RxSwift, and Coordinator +
                MVVM.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Since June 2026 I&apos;ve been a core engineer on Axon
                Active&apos;s internal AI agent platform, owning the
                code-intelligence, tool-admission, and vendor-gateway services
                used by ~100 people across engineering, marketing, product, and
                leadership.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Outside work I maintain jarvis, a local-first code-intelligence
                MCP server on PyPI and the official MCP Registry, and ship
                Stress AI Coach, an iOS + watchOS app on the App Store.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats with Pastel Icons */}
          <m.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-4"
          >
            {stats.map((stat) => (
              <m.div key={stat.label} variants={cardVariants}>
                <Card hover={false} className="flex items-center gap-4 p-6">
                  <div
                    className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center text-2xl flex-shrink-0`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-800">
                      {stat.value}
                    </div>
                    <div className="text-gray-500">{stat.label}</div>
                  </div>
                </Card>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>
    </section>
  );
}
