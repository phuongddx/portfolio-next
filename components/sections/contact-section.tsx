"use client";

import { m } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import {
  LinkedInIcon,
  GitHubIcon,
  EmailIcon,
} from "@/components/ui/social-icons";

const contactMethods = [
  {
    id: "email",
    icon: <EmailIcon className="w-8 h-8 text-cta dark:text-blue-400" />,
    label: "Email",
    value: "95doanphuong@gmail.com",
    href: "mailto:95doanphuong@gmail.com",
  },
  {
    id: "linkedin",
    icon: <LinkedInIcon className="w-8 h-8 text-cta dark:text-blue-400" />,
    label: "LinkedIn",
    value: "linkedin.com/in/phuongddx",
    href: "https://linkedin.com/in/phuongddx/",
  },
  {
    id: "github",
    icon: <GitHubIcon className="w-8 h-8 text-cta dark:text-blue-400" />,
    label: "GitHub",
    value: "github.com/phuongddx",
    href: "https://github.com/phuongddx",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 20,
    },
  },
};

export function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 px-4 bg-white dark:bg-gray-900"
    >
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-primary dark:text-white mb-6 text-center">
            Let&apos;s Work Together
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-lg text-secondary dark:text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            I&apos;m currently open to new opportunities and exciting projects.
            Whether you&apos;re looking for a skilled iOS developer or want to
            discuss potential collaborations, I&apos;d love to hear from you.
          </p>
        </ScrollReveal>

        {/* Contact Cards */}
        <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {contactMethods.map((method) => (
            <m.div key={method.id} variants={cardVariants}>
              <a
                href={method.href}
                target={method.href.startsWith("mailto") ? undefined : "_blank"}
                rel={
                  method.href.startsWith("mailto")
                    ? undefined
                    : "noopener noreferrer"
                }
                className="block"
              >
                <GlassCard className="flex flex-col items-center text-center h-full">
                  {method.icon}
                  <div className="font-heading font-medium text-primary dark:text-white mb-1 mt-3">
                    {method.label}
                  </div>
                  <div className="text-secondary dark:text-gray-400 text-sm">
                    {method.value}
                  </div>
                </GlassCard>
              </a>
            </m.div>
          ))}
        </m.div>

        {/* CTA Buttons */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:95doanphuong@gmail.com">
              <Button variant="primary" size="large">
                Send Me an Email
              </Button>
            </a>
            <a href="/resume.pdf" download>
              <Button variant="secondary" size="large">
                Download Resume
              </Button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
