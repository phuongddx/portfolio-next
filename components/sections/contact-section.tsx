"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { CONTACT, contactCopy } from "@/components/data/contact-data";

function useLocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: CONTACT.timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

// One prompt, one field. Sending opens the visitor's email app with the message filled in.
export function ContactSection() {
  const [message, setMessage] = useState("");
  const time = useLocalTime();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({ subject: contactCopy.subject, body: message });
    window.location.href = `${CONTACT.mailto}?${params.toString().replace(/\+/g, "%20")}`;
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-[var(--gutter)] mt-section grid gap-x-12 gap-y-10 bg-paper px-[var(--pad)] py-[clamp(72px,9vw,136px)] md:grid-cols-12"
    >
      <div className="md:col-span-5">
        <ScrollReveal>
          <h2 id="contact-title" className="text-head">
            {contactCopy.heading}
          </h2>
        </ScrollReveal>
        <ScrollReveal as="p" delay={0.08} className="mt-6 max-w-measure">
          {contactCopy.intro}
        </ScrollReveal>
      </div>

      <div className="md:col-span-7">
        <ScrollReveal delay={0.12}>
          <form action={CONTACT.mailto} method="get" onSubmit={onSubmit}>
            <label htmlFor="contact-message" className="text-body font-semibold">
              {contactCopy.fieldLabel}
            </label>
            <div className="relative mt-3">
              <input
                id="contact-message"
                name="body"
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={contactCopy.placeholder}
                aria-describedby="contact-note"
                className="h-16 w-full bg-ground pl-5 pr-[68px] text-body text-ink placeholder:text-soft focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent"
              />
              <button
                type="submit"
                aria-label={contactCopy.submitLabel}
                className="absolute right-2 top-2 flex h-12 w-12 cursor-pointer items-center justify-center bg-accent text-accent-ink transition-[transform,background-color] duration-150 hover:bg-ink active:scale-95"
              >
                <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M3 10h13M11 4.5 16.5 10 11 15.5" stroke="currentColor" strokeWidth="2" />
                </svg>
              </button>
            </div>
            <p id="contact-note" className="mt-3 text-small text-soft">
              {contactCopy.note}
            </p>
          </form>
        </ScrollReveal>

        <ScrollReveal delay={0.18} as="dl" className="mt-14 grid gap-x-8 gap-y-5 lg:grid-cols-2 [&_dd]:[overflow-wrap:anywhere]">
          <div>
            <dt className="text-small text-soft">Email</dt>
            <dd>
              <a className="text-link" href={CONTACT.mailto}>
                {CONTACT.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-small text-soft">LinkedIn</dt>
            <dd>
              <a className="text-link" href={CONTACT.linkedin.href} target="_blank" rel="noopener noreferrer">
                {CONTACT.linkedin.label}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-small text-soft">GitHub</dt>
            <dd>
              <a className="text-link" href={CONTACT.github.href} target="_blank" rel="noopener noreferrer">
                {CONTACT.github.label}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-small text-soft">Based in</dt>
            <dd>
              {CONTACT.city}
              {time && <span className="tabular-nums">, {time} local time</span>}
            </dd>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
