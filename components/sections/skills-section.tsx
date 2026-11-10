import { NameColumns } from "@/components/ui/name-columns";
import { skillCategories, skillsLead } from "@/components/data/skills-data";

export function SkillsSection() {
  return (
    <NameColumns
      id="skills"
      heading="Skills"
      lead={skillsLead}
      groups={skillCategories.map((c) => ({ id: c.id, title: c.title, items: c.skills }))}
    />
  );
}
