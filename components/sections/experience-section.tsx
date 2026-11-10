import { RoleRows, type Role } from "@/components/ui/role-rows";
import { experiences } from "@/components/data/experience-data";

const roles: Role[] = experiences.map((e) => ({
  id: e.id,
  company: e.company,
  title: e.title,
  period: `${e.startDate} – ${e.endDate}`,
  place: `${e.location} · ${e.locationType}`,
  points: e.achievements,
}));

export function ExperienceSection() {
  return <RoleRows id="experience" heading="Experience" roles={roles} />;
}
