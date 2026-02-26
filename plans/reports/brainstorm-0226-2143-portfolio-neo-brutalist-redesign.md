# Portfolio Redesign: Neo-Brutalist Lite

**Date**: 2026-02-26
**Reference**: [Educational Platform Demo](https://ui-ux-pro-max-skill.nextlevelbuilder.io/demo/educational-platform)
**Style Direction**: Neo-Brutalist Lite + Playful + Approachable

---

## Executive Summary

Complete redesign from glassmorphic elegance to bold, playful neo-brutalist style. Adopting all visual elements from reference: bold borders, vibrant colors, stat/badge system, two-column hero.

### Key Decisions
- **Adoption Level**: Full redesign
- **Dark Mode**: Removed (light-only)
- **Animations**: Keep Framer Motion (spring-based)
- **Goals**: Playful/Approachable, Better Hierarchy, Modernize

---

## Design System Changes

### Color Palette

```css
/* ROOT VARIABLES - NEW */
:root {
  --background: #f8f9fa;
  --foreground: #1f2937;
  --muted: #6b7280;
  --primary: #22c55e;
  --primary-foreground: #ffffff;
  --border: #1f2937;
  --card: #ffffff;
  --card-foreground: #1f2937;

  /* Accent Colors (Pastels for icons/badges) */
  --accent-pink: #fecaca;
  --accent-blue: #93c5fd;
  --accent-purple: #ddd6fe;
  --accent-green: #bbf7d0;
  --accent-lime: #a3e635;
  --accent-coral: #f87171;
}
```

### Border & Radius System

```css
/* BORDERS */
--border-width: 2px;
--border-color: #1f2937;

/* RADIUS */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;
```

### Shadow System

```css
/* MINIMAL SHADOWS */
--shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
--shadow-navbar: 0 2px 10px rgba(0, 0, 0, 0.1);
--shadow-hover: 0 6px 25px rgba(0, 0, 0, 0.12);
```

---

## Component Specifications

### 1. Navbar

**Current**: Glassmorphic, transparent, blur backdrop
**New**: White bg, bold border, contained rounded

```tsx
// New Navbar Style
className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl
           bg-white border-2 border-gray-800 rounded-[20px]
           px-6 py-3 shadow-sm"
```

**Structure**:
- Logo (left): Colored square with initial
- Links (center): About, Experience, Projects, Skills
- Actions (right): Contact button (green, solid)

### 2. Hero Section

**Layout**: Two-column (40/60 split)

**Left Column (40%)**:
- Badge: "🟢 Available for Work" (lime green bg)
- Headline: Bold, large (text-5xl font-bold)
- Subheadline: Gray muted
- CTAs: Primary (green) + Secondary (bordered)
- Stats: Inline row (Years | Projects | Clients)

**Right Column (60%)**:
- Featured project card
- Progress bar
- "View Project" CTA

```tsx
// Hero Layout
<div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
  <div className="lg:col-span-2">{/* Left: Text + Stats */}</div>
  <div className="lg:col-span-3">{/* Right: Featured Card */}</div>
</div>
```

### 3. Cards (Projects/Skills/Experience)

**Current**: Glassmorphic, blur backdrop
**New**: White bg, bold border, pastel icons

```tsx
// Card Style
className="bg-white border-2 border-gray-800 rounded-xl p-6
           shadow-[0_4px_20px_rgba(0,0,0,0.08)]
           hover:shadow-[0_6px_25px_rgba(0,0,0,0.12)]
           transition-shadow duration-200"
```

**Icon Backgrounds** (Pastel rotation):
- Project 1: Pink (#fecaca)
- Project 2: Blue (#93c5fd)
- Project 3: Purple (#ddd6fe)
- Project 4: Green (#bbf7d0)

### 4. Buttons

**Primary** (CTAs):
```tsx
className="bg-green-500 text-white font-medium px-6 py-3
           rounded-xl hover:bg-green-600 transition-colors"
```

**Secondary**:
```tsx
className="bg-white text-gray-800 font-medium px-6 py-3
           border-2 border-gray-800 rounded-xl
           hover:bg-gray-50 transition-colors"
```

### 5. Badges

**Status Badge**:
```tsx
className="bg-lime-400 text-gray-800 text-sm font-medium
           px-3 py-1 rounded-full"
```

**Rating Badge**:
```tsx
className="bg-green-500 text-white text-sm font-bold
           w-8 h-8 rounded-full flex items-center justify-center"
```

---

## Section-by-Section Changes

| Section | Current | New |
|---------|---------|-----|
| **Hero** | Centered, full viewport | Two-column 40/60, featured card |
| **About** | Two-column bio + stats | Stats row with pastel icons |
| **Experience** | Timeline cards | 2x2 card grid with badges |
| **Skills** | 3-column category cards | Same layout, new card style |
| **Projects** | 3-column grid | 2x2 grid with rating badges |
| **Side Projects** | GitHub-style cards | Compact bordered cards |
| **Contact** | Contact cards + CTAs | Bold CTA section, green button |

---

## Files to Modify

### High Priority
1. `src/app/globals.css` - Color variables, remove dark mode
2. `components/layout/glass-navbar.tsx` → Rename & redesign
3. `components/sections/hero-section.tsx` - Two-column layout
4. `components/ui/glass-card.tsx` → Rename to `card.tsx`, new style

### Medium Priority
5. `components/ui/button.tsx` - New variants
6. `components/ui/badge.tsx` - New styles
7. `components/ui/project-card.tsx` - New card style
8. `components/sections/*.tsx` - Apply new card styles

### Low Priority
9. `components/layout/theme-toggle.tsx` - Remove
10. `components/theme/theme-provider.tsx` - Remove or simplify

---

## Remove These

- Dark mode CSS variables
- `backdrop-blur`, `backdrop-saturate` classes
- Theme toggle component
- Glassmorphic effects

---

## Implementation Phases

### Phase 1: Foundation (Colors & CSS)
- [ ] Update `globals.css` with new color system
- [ ] Remove dark mode variables
- [ ] Add border/radius CSS variables
- [ ] Test color contrast

### Phase 2: Core Components
- [ ] Redesign `card.tsx` (rename from glass-card)
- [ ] Update `button.tsx` variants
- [ ] Update `badge.tsx` styles
- [ ] Create `stat-badge.tsx` component

### Phase 3: Layout Components
- [ ] Redesign navbar (white, bordered, rounded)
- [ ] Remove theme toggle
- [ ] Update footer style

### Phase 4: Sections
- [ ] Redesign hero (two-column)
- [ ] Update about section
- [ ] Update experience cards
- [ ] Update skills cards
- [ ] Update project cards
- [ ] Update contact section

### Phase 5: Polish
- [ ] Test animations still work
- [ ] Responsive adjustments
- [ ] Accessibility check
- [ ] Performance audit

---

## Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Losing sophistication | Keep clean typography, refined spacing |
| Too playful for professional context | Balance colors, keep content professional |
| Remove dark mode backlash | Add toggle later if requested |
| Animation conflicts with new style | Test all animations, adjust timing |

---

## Success Criteria

- [ ] Visual hierarchy improved (clear sections, CTAs)
- [ ] Playful but professional tone
- [ ] Consistent border/radius system
- [ ] All cards use new style
- [ ] Hero has two-column layout
- [ ] Stats displayed with icons
- [ ] Green primary accent throughout
- [ ] No glassmorphism remaining
- [ ] Dark mode removed
- [ ] Animations still functional

---

## Unresolved Questions

None - all decisions finalized.

---

## Next Steps

1. User approval of this redesign plan
2. Create detailed implementation plan with `/plan`
3. Execute Phase 1 (CSS foundation)
4. Continue through remaining phases
