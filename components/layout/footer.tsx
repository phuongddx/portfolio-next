"use client";

import Image from "next/image";
import { useMode } from "@/components/context/mode-context";
import { NAV_LINKS_BY_MODE } from "./nav-links";
import { CONTACT } from "@/components/data/contact-data";

// The page closes on Saigon at night, with the name across the bottom of the photograph.
export function Footer() {
  const { mode } = useMode();
  const links = NAV_LINKS_BY_MODE[mode];

  return (
    <footer className="footer-photo on-dark relative isolate mt-section flex min-h-[100svh] flex-col overflow-hidden text-paper max-[900px]:min-h-[88svh]">
      <Image
        src="/images/found/ho-chi-minh-city-saigon1324.jpg"
        alt="Ho Chi Minh City at night: Landmark 81 and the towers along the Saigon River, lit and reflected in the water"
        fill
        sizes="100vw"
        className="-z-10 object-cover object-[50%_60%]"
      />

      <div className="flex flex-wrap justify-between gap-8 px-[calc(var(--gutter)+var(--pad))] pt-8">
        <nav aria-label="Footer">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.href}>
                <a className="text-link" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a className="text-link" href="#contact">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <ul className="space-y-1 sm:text-right">
          <li>
            <a className="text-link" href={CONTACT.mailto}>
              {CONTACT.email}
            </a>
          </li>
          <li>
            <a className="text-link" href={CONTACT.linkedin.href} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a className="text-link" href={CONTACT.github.href} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>{CONTACT.city}</li>
        </ul>
      </div>

      <div className="mt-auto px-[calc(var(--gutter)+var(--pad))] pb-8">
        <p
          aria-hidden="true"
          className="whitespace-nowrap text-[11.6vw] leading-[0.9] tracking-[-0.035em] max-[900px]:text-[11.2vw]"
        >
          Doan Duy Phuong
        </p>
        <p className="mt-6 max-w-[80ch] text-small">
          © {new Date().getFullYear()} Doan Duy Phuong. Photograph: &ldquo;Ho Chi Minh City - Saigon1324&rdquo; by
          lumoplank,{" "}
          <a
            className="text-link"
            href="https://commons.wikimedia.org/wiki/File:Ho_Chi_Minh_City_-_Saigon1324.jpg"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC0, via Wikimedia Commons
          </a>
          . App screenshots are from the App Store and the ZILLEARN website.
        </p>
      </div>
    </footer>
  );
}
