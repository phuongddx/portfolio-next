import { NameColumns } from "@/components/ui/name-columns";
import { aiSkillCategories, aiSkillsLead } from "@/components/data/ai-resume-data";

export function AISkillsSection() {
  return (
    <NameColumns
      id="ai-skills"
      heading="Skills"
      lead={aiSkillsLead}
      groups={aiSkillCategories.map((c) => ({ id: c.id, title: c.title, items: c.skills.map((s) => s.name) }))}
    />
  );
}
