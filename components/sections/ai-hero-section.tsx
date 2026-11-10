import { HeroCard } from "@/components/ui/hero-card";
import { aiHeroData } from "@/components/data/ai-resume-data";

export function AIHeroSection() {
  return <HeroCard stageKey="replay" role={aiHeroData.title} line={aiHeroData.tagline} />;
}
