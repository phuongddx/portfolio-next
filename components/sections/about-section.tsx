"use client";

import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";

const stats = [
  { value: "5+", label: "Years of Experience" },
  { value: "40%", label: "UI Development Time Reduction" },
  { value: "90%", label: "Test Coverage Achieved" },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 px-4 bg-white dark:bg-gray-900"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary dark:text-white mb-12 text-center">
            About Me
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-6">
              <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed">
                I&apos;m a passionate Software Engineer with over 5 years of
                experience building high-quality mobile applications. My
                expertise spans native iOS development with Swift, SwiftUI, and
                UIKit, as well as cross-platform development with React Native.
              </p>
              <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed">
                I take pride in delivering fast, reliable, and beautifully
                crafted user experiences that adhere to Apple&apos;s design
                guidelines and modern best practices. I&apos;m constantly
                learning and leveraging AI-assisted development tools to
                accelerate innovation.
              </p>
              <p className="text-lg text-secondary dark:text-gray-300 leading-relaxed">
                Currently working at Axon Active, I&apos;ve successfully built
                design systems adopted by multiple teams, reducing UI
                development time by 40% and visual bugs by 60%.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats */}
          <div className="space-y-4">
            {stats.map((stat, index) => (
              <ScrollReveal key={stat.label} delay={0.2 + index * 0.1}>
                <GlassCard hover={false} className="text-center">
                  <div className="text-4xl font-heading font-bold text-cta dark:text-blue-400 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-secondary dark:text-gray-400">
                    {stat.label}
                  </div>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
