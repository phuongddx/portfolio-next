import { ScrollReveal } from "@/components/effects/scroll-reveal";

export interface Role {
  id: string;
  company: string;
  title: string;
  period: string;
  place: string;
  points: string[];
}

interface RoleRowsProps {
  id: string;
  heading: string;
  roles: Role[];
}

// Full width, a dated table: the period set large on the left, the work on the right.
export function RoleRows({ id, heading, roles }: RoleRowsProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="px-[calc(var(--gutter)+var(--pad))] pt-section"
    >
      <ScrollReveal>
        <h2 id={`${id}-title`} className="text-head">
          {heading}
        </h2>
      </ScrollReveal>
      <ol className="mt-12 space-y-16">
        {roles.map((r, i) => (
          <ScrollReveal
            as="li"
            key={r.id}
            delay={0.05 * i}
            className="grid gap-x-12 gap-y-4 md:grid-cols-12"
          >
            <p className="text-head tabular-nums md:col-span-5">{r.period}</p>
            <div className="md:col-span-7">
              <h3 className="text-body">
                <span className="font-semibold">{r.company}</span>, {r.title}
              </h3>
              <p className="text-small text-soft">{r.place}</p>
              <ul className="mt-5 max-w-[62ch] space-y-3">
                {r.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        ))}
      </ol>
    </section>
  );
}
