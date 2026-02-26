# Phase 1: Foundation - CSS Variables & Dark Mode Removal

**Priority**: P1 | **Effort**: 1h | **Status**: Complete

## Overview

Update CSS foundation with new color system and remove dark mode support.

## Related Files

- Brainstorm: `plans/reports/brainstorm-0226-2143-portfolio-neo-brutalist-redesign.md`
- Current CSS: `src/app/globals.css`
- Tailwind config: `tailwind.config.ts`

## Files to Modify

| File | Action | Description |
|------|--------|-------------|
| `src/app/globals.css` | Modify | Replace color variables, remove dark mode |
| `tailwind.config.ts` | Modify | Update theme colors |
| `src/app/layout.tsx` | Modify | Remove ThemeProvider |

## Implementation Steps

### 1. Update globals.css Color Variables

Replace existing CSS variables in `:root`:

```css
@layer base {
  :root {
    /* Background & Foreground */
    --background: #f8f9fa;
    --foreground: #1f2937;

    /* Muted */
    --muted: #6b7280;
    --muted-foreground: #6b7280;

    /* Primary (Green) */
    --primary: #22c55e;
    --primary-foreground: #ffffff;

    /* Secondary */
    --secondary: #ffffff;
    --secondary-foreground: #1f2937;

    /* Accent Colors (Pastels) */
    --accent-pink: #fecaca;
    --accent-blue: #93c5fd;
    --accent-purple: #ddd6fe;
    --accent-green: #bbf7d0;
    --accent-lime: #a3e635;
    --accent-coral: #f87171;

    /* Card & Border */
    --card: #ffffff;
    --card-foreground: #1f2937;
    --border: #1f2937;

    /* Shadows */
    --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
    --shadow-navbar: 0 2px 10px rgba(0, 0, 0, 0.1);
    --shadow-hover: 0 6px 25px rgba(0, 0, 0, 0.12);

    /* Radius */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-xl: 20px;
    --radius-full: 9999px;
  }

  /* REMOVE all .dark section */
}
```

### 2. Update Tailwind Config

In `tailwind.config.ts`:

```typescript
export default {
  darkMode: false, // Disable dark mode
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          pink: "var(--accent-pink)",
          blue: "var(--accent-blue)",
          purple: "var(--accent-purple)",
          green: "var(--accent-green)",
          lime: "var(--accent-lime)",
          coral: "var(--accent-coral)",
        },
        border: "var(--border)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        navbar: "var(--shadow-navbar)",
        hover: "var(--shadow-hover)",
      },
    },
  },
}
```

### 3. Remove Dark Mode Classes

Search and remove all `dark:` classes across codebase:
- `dark:bg-*`
- `dark:text-*`
- `dark:border-*`
- `dark:shadow-*`

### 4. Update layout.tsx

Remove ThemeProvider from `src/app/layout.tsx`:

```tsx
// Remove this import
import { ThemeProvider } from "@/components/theme/theme-provider";

// Remove ThemeProvider wrapper in return
```

## Todo Checklist

- [x] Update `:root` variables in globals.css
- [x] Remove `.dark` section from globals.css
- [x] Update tailwind.config.ts colors
- [x] Set `darkMode: false` in tailwind.config.ts
- [x] Remove ThemeProvider from layout.tsx
- [x] Remove all `dark:` classes from components
- [x] Test app builds without errors

## Success Criteria

- [x] `npm run build` succeeds
- [x] No dark mode CSS variables remain
- [x] All colors use new variables
- [x] No `dark:` classes in codebase

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Breaking existing styles | Test each section after changes |
| Missed dark: classes | Use grep to find all instances |

## Next Steps

- Proceed to Phase 2 (Core Components)
