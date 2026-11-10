import Image from "next/image";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

// Where the work is done: one wide photograph where the split ends.
export function CityBand() {
  return (
    <ScrollReveal as="figure" className="mx-[var(--gutter)] mt-section">
      <div className="relative h-[64svh] min-h-[360px] overflow-hidden bg-field-1">
        <Image
          src="/images/found/ho-chi-minh-city-skyline.jpg"
          alt="Ho Chi Minh City by day: District 1 towers and a cable-stayed bridge across the Saigon River"
          fill
          sizes="100vw"
          className="object-cover object-[50%_70%]"
        />
      </div>
      <figcaption className="mt-3 px-[var(--pad)] text-small text-soft">
        Ho Chi Minh City, where I work from, UTC+7. &ldquo;Ho Chi Minh City Skyline&rdquo; by Pimnl, CC0, via
        Wikimedia Commons.
      </figcaption>
    </ScrollReveal>
  );
}
