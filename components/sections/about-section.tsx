"use client";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Card } from "@/components/ui/card";
import { m } from "framer-motion";

// Pastel colors for icon backgrounds
const pastelColors = ["bg-pink-200", "bg-blue-200", "bg-purple-200"];

const stats = [
  {
    value: "5+",
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
                I&apos;m a passionate Software Engineer with over 5 years of
                experience building high-quality mobile applications. My
                expertise spans native iOS development with Swift, SwiftUI, and
                UIKit, as well as cross-platform development with React Native.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                I take pride in delivering fast, reliable, and beautifully
                crafted user experiences that adhere to Apple&apos;s design
                guidelines and modern best practices. I&apos;m constantly
                learning and leveraging AI-assisted development tools to
                accelerate innovation.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Currently working at Axon Active, I&apos;ve successfully built
                design systems adopted by multiple teams, reducing UI
                development time by 40% and visual bugs by 60%.
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
