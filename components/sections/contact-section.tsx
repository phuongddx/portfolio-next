"use client";

import { m } from "framer-motion";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LinkedInIcon,
  GitHubIcon,
  EmailIcon,
} from "@/components/ui/social-icons";

// Pastel colors for contact icons
const pastelColors = ["bg-pink-200", "bg-blue-200", "bg-purple-200"];

const contactMethods = [
  {
    id: "email",
    icon: <EmailIcon className="w-6 h-6 text-gray-700" />,
    label: "Email",
    value: "95doanphuong@gmail.com",
    href: "mailto:95doanphuong@gmail.com",
  },
  {
    id: "linkedin",
    icon: <LinkedInIcon className="w-6 h-6 text-gray-700" />,
    label: "LinkedIn",
    value: "linkedin.com/in/phuongddx",
    href: "https://linkedin.com/in/phuongddx/",
  },
  {
    id: "github",
    icon: <GitHubIcon className="w-6 h-6 text-gray-700" />,
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
    <section id="contact" className="py-20 px-4 bg-[#f8f9fa]">
      <div className="max-w-4xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-gray-800 mb-6 text-center">
            Let&apos;s Work Together
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-12 leading-relaxed">
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
          className="grid sm:grid-cols-3 gap-6 mb-12"
        >
          {contactMethods.map((method, index) => (
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
                <Card
                  hover={false}
                  className="flex flex-col items-center text-center h-full"
                >
                  <div
                    className={`w-14 h-14 rounded-xl ${pastelColors[index]} flex items-center justify-center mb-3`}
                  >
                    {method.icon}
                  </div>
                  <div className="font-heading font-medium text-gray-800 mb-1">
                    {method.label}
                  </div>
                  <div className="text-gray-500 text-sm">{method.value}</div>
                </Card>
              </a>
            </m.div>
          ))}
        </m.div>

        {/* CTA Buttons */}
        <ScrollReveal delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:95doanphuong@gmail.com">
              <Button variant="primary" size="lg">
                Send Me an Email
              </Button>
            </a>
            <a href="/DoanPhuong.pdf" download="DoanPhuong.pdf">
              <Button variant="secondary" size="lg">
                Download Resume
              </Button>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
