import { RoleRows, type Role } from "@/components/ui/role-rows";
import { aiExperiences } from "@/components/data/ai-resume-data";

const roles: Role[] = aiExperiences.map((e) => ({
  id: e.id,
  company: e.company,
  title: e.title,
  period: e.period.replace(" — ", " – "),
  place: `${e.location} · ${e.locationType}`,
  points: e.highlights,
}));

export function AIExperienceSection() {
  return <RoleRows id="ai-experience" heading="Experience" roles={roles} />;
}
