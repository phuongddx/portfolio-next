import { HeroCard } from "@/components/ui/hero-card";
import { iosHeroData } from "@/components/data/experience-data";

export function HeroSection() {
  return <HeroCard stageKey="epost-1" role={iosHeroData.title} line={iosHeroData.tagline} />;
}
