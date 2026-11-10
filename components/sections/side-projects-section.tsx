import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { sideProjects } from "@/components/data/side-projects-data";
import { CONTACT } from "@/components/data/contact-data";

// Full width rows: the name large at the left, what it is in the middle, where it lives at the right.
export function SideProjectsSection() {
  return (
    <section
      id="open-source"
      aria-labelledby="open-source-title"
      className="px-[calc(var(--gutter)+var(--pad))] pt-section"
    >
      <ScrollReveal>
        <h2 id="open-source-title" className="text-head">
          Open source
        </h2>
      </ScrollReveal>
      <ul className="mt-12 space-y-14">
        {sideProjects.map((p, i) => (
          <ScrollReveal as="li" key={p.id} delay={0.06 * i} className="grid gap-x-12 gap-y-3 md:grid-cols-12">
            <h3 className="text-head md:col-span-5">{p.title}</h3>
            <div className="md:col-span-7">
              <p className="text-small text-soft">
                {p.language} · {p.topics.join(", ")} ·{" "}
                <a className="text-link text-ink" href={p.githubUrl} target="_blank" rel="noopener noreferrer">
                  Source on GitHub<span className="sr-only"> (opens in new tab)</span>
                </a>
              </p>
              <p className="mt-3 max-w-[62ch]">{p.description}</p>
            </div>
          </ScrollReveal>
        ))}
      </ul>
      <ScrollReveal className="mt-14 md:ml-[calc(5/12*100%+0.5rem)]">
        <a className="text-link" href={CONTACT.github.href} target="_blank" rel="noopener noreferrer">
          All repositories on GitHub<span className="sr-only"> (opens in new tab)</span>
        </a>
      </ScrollReveal>
    </section>
  );
}
