import { ScrollReveal } from "@/components/effects/scroll-reveal";

export interface NameGroup {
  id: string;
  title: string;
  items: string[];
}

interface NameColumnsProps {
  id: string;
  heading: string;
  lead: string;
  groups: NameGroup[];
}

// Pure text at one size, on a flat sage field: group name in full weight, then its names.
export function NameColumns({ id, heading, lead, groups }: NameColumnsProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="mx-[var(--gutter)] mt-section bg-field-2 px-[var(--pad)] py-[clamp(72px,9vw,136px)]">
      <div className="grid gap-x-12 gap-y-6 md:grid-cols-12">
        <ScrollReveal className="md:col-span-5">
          <h2 id={`${id}-title`} className="text-head">
            {heading}
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.08} as="p" className="max-w-measure md:col-span-7">
          {lead}
        </ScrollReveal>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g, i) => (
          <ScrollReveal key={g.id} delay={0.05 * i}>
            <h3 className="text-body font-semibold">{g.title}</h3>
            <ul className="mt-3 space-y-1 leading-snug">
              {g.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
