# Design Guidelines

## Design Philosophy

- **Flat Design** with subtle depth through glassmorphism
- **Minimalist** approach - content-focused, not decoration-focused
- **Accessible** - high contrast, clear typography, keyboard-friendly
- **Responsive** - mobile-first, progressive enhancement

## Color Palette

### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| primary | `#18181B` | Headings, primary text, dark backgrounds |
| secondary | `#3F3F46` | Body text, descriptions, less prominent elements |
| cta | `#2563EB` | Call-to-action buttons, links, highlights, accents |
| background | `#FAFAFA` | Page background (light mode) |
| text | `#09090B` | Primary text color |

### Theme Modes

#### Light Mode

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.2);
  --glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
}
```

#### Dark Mode

```css
.dark {
  --glass-bg: rgba(24, 24, 27, 0.8);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### Semantic Color Mapping

| Element | Light Mode | Dark Mode |
|---------|------------|-----------|
| Heading text | `#18181B` | `white` |
| Body text | `#3F3F46` | `gray-300` |
| CTA buttons | `#2563EB` | `blue-500` |
| Page background | `#FAFAFA` | `gray-900` |
| Card background | `white` | `gray-900/80` |

## Typography

### Font Families

| Font | Usage | Google Font |
|------|-------|-------------|
| Space Grotesk | Headings, titles, emphasis | `[variable: --font-heading]` |
| DM Sans | Body text, descriptions | `[variable: --font-body]` |

### Font Sizes

| Class | Size | Usage |
|-------|------|-------|
| `text-5xl` to `text-8xl` | 48px - 96px | Hero name |
| `text-2xl` to `text-4xl` | 24px - 36px | Section headings |
| `text-xl` to `text-2xl` | 20px - 24px | Subheadings, job titles |
| `text-lg` | 18px | Body text emphasis |
| `text-base` | 16px | Default body text |
| `text-sm` | 14px | Tags, metadata, captions |
| `text-xs` | 12px | Tech tags, small labels |

### Font Weights

| Weight | Usage |
|--------|-------|
| 400 (Regular) | Body text |
| 500 (Medium) | Navigation, labels |
| 600 (Semibold) | Subheadings |
| 700 (Bold) | Headings, emphasis |

### CSS Variables

```css
font-family: {
  heading: ["var(--font-heading)", "sans-serif"],
  body: ["var(--font-body)", "sans-serif"],
}
```

## Spacing System

### Section Spacing

| Breakpoint | Padding |
|------------|---------|
| Mobile | `py-16 px-4` (64px vertical, 16px horizontal) |
| Desktop | `py-20 px-4` (80px vertical, 16px horizontal) |

### Component Spacing

| Element | Spacing |
|---------|---------|
| Card padding | `p-6` to `p-8` (24px - 32px) |
| Card gap | `gap-6` to `gap-8` (24px - 32px) |
| List items | `space-y-3` to `space-y-4` (12px - 16px) |
| Button padding | `px-6 py-2.5` (small) or `px-8 py-4` (large) |

### Layout Max Widths

| Container | Max Width |
|-----------|-----------|
| Default | `max-w-7xl` (1280px) |
| Content | `max-w-6xl` (1152px) |
| Narrow | `max-w-4xl` (896px) |

## Component Styling

### Glassmorphism Cards

```tsx
className={cn(
  "rounded-2xl p-6",
  "bg-white/70 dark:bg-gray-900/80",
  "backdrop-blur-xl backdrop-saturate-180",
  "border border-white/20 dark:border-white/10",
  "shadow-xl shadow-black/5 dark:shadow-black/20"
)}
```

### Buttons

#### Primary Button

```tsx
className="px-6 py-2.5 bg-cta text-white rounded-lg font-medium
           hover:bg-cta/90 transition-colors duration-200"
```

#### Secondary Button

```tsx
className="px-8 py-4 bg-transparent border-2 border-primary
           text-primary rounded-xl font-heading font-semibold
           hover:bg-primary hover:text-white transition-colors duration-200"
```

### Badges/Tags

```tsx
// Skill tag
className="inline-block px-3 py-1 bg-cta/10 text-cta
           text-sm font-medium rounded-lg"

// Tech tag
className="inline-block px-3 py-1 bg-primary/10 text-primary
           text-xs font-medium rounded-lg"
```

### Navigation

```tsx
// Desktop nav link
className="text-secondary hover:text-cta transition-colors
           duration-200 font-medium cursor-pointer"

// Mobile nav link
className="block text-secondary hover:text-cta transition-colors
           duration-200 font-medium cursor-pointer py-2"
```

## Animation Guidelines

### Framer Motion Variants

| Variant | Properties | Usage |
|---------|------------|-------|
| fadeInUp | `opacity: 0→1, y: 30→0` | Section entries |
| fadeIn | `opacity: 0→1` | Simple fade |
| cardHover | `scale: 1→1.03, y: 0→-8` | Card interactions |
| staggerContainer | `staggerChildren: 0.1` | List animations |

### Spring Transitions

```typescript
// Default spring
{ type: "spring", stiffness: 300, damping: 20 }

// Duration-based spring
{ type: "spring", duration: 0.4, bounce: 0.2 }

// Page transition
{ type: "spring", stiffness: 260, damping: 25, duration: 0.4 }
```

### CSS Transitions

```css
/* Standard transition */
transition-colors duration-200

/* All properties */
transition-all duration-200
```

### Reduced Motion

Always respect `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Responsive Breakpoints

| Breakpoint | Min Width | Usage |
|------------|-----------|-------|
| sm | 640px | Small phones landscape |
| md | 768px | Tablets |
| lg | 1024px | Small laptops |
| xl | 1280px | Desktops |
| 2xl | 1536px | Large screens |

## Accessibility Guidelines

### Focus States

```tsx
className="focus-visible:outline-none focus-visible:ring-2
           focus-visible:ring-cta focus-visible:ring-offset-2"
```

### Color Contrast

- Normal text: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio
- Interactive elements: visible focus indicators

### Semantic Structure

```html
<header> → Navigation
<main> → Main content
<section> → Content sections with heading hierarchy
<footer> → Footer content
<nav> → Navigation menus
```

## Icon Guidelines

- Size: `w-6 h-6` (24px) for inline icons
- Size: `w-8 h-8` (32px) for feature icons
- Use `aria-label` for icon-only buttons
- Color follows parent text or explicit `text-cta`
