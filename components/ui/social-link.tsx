"use client";

import { m } from "framer-motion";
import { ReactNode } from "react";

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
}

export function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <m.a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
      whileHover={{ scale: 1.1, y: -4 }}
      whileTap={{ scale: 0.95 }}
      className="w-12 h-12 flex items-center justify-center bg-white border-2 border-gray-800 text-gray-800 hover:bg-green-500 hover:text-white hover:border-green-500 rounded-full transition-colors duration-200"
      aria-label={label}
    >
      {icon}
    </m.a>
  );
}
