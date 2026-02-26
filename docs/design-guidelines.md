# Design Guidelines

## Design Philosophy

- **Neo-Brutalist** aesthetic with bold, flat colors and strong borders
- **Minimalist** approach - content-focused, not decoration-focused
- **Accessible** - high contrast, clear typography, keyboard-friendly
- **Responsive** - mobile-first, progressive enhancement
- **No Dark Mode** - single light theme for consistency

## Color Palette

### Primary Colors

| Token | Hex | Usage |
|-------|-----|-------|
| primary | `#22c55e` (green-500) | CTAs, highlights, primary accents |
| secondary | `#6b7280` (gray-500) | Body text, descriptions |
| background | `#f8f9fa` | Page background |
| foreground | `#1f2937` (gray-800) | Headings, borders, text |
| border | `#1f2937` (gray-800) | Card borders, dividers |
| card | `#ffffff` | Card backgrounds |

### Accent Colors (Pastels)

| Token | Hex | Usage |
|-------|-----|-------|
| accent-pink | `#fecaca` | Highlights, badges |
| accent-blue | `#93c5fd` | Highlights, badges |
| accent-purple | `#ddd6fe` | Highlights, badges |
| accent-green | `#bbf7d0` | Highlights, badges |
| accent-lime | `#a3e635` | Highlights, badges |
| accent-coral | `#f87171` | Highlights, badges |

### Semantic Color Mapping

| Element | Color |
|---------|-------|
| Heading text | `gray-800` |
| Body text | `gray-500` |
| Primary buttons | `green-500` |
| Page background | `#f8f9fa` |
| Card background | `white` |
| Borders | `gray-800` |

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
| Button padding | `px-4 py-2` (sm) / `px-6 py-3` (md) / `px-8 py-4` (lg) |

### Layout Max Widths

| Container | Max Width |
|-----------|-----------|
| Default | `max-w-7xl` (1280px) |
| Content | `max-w-6xl` (1152px) |
| Narrow | `max-w-4xl` (896px) |

## Component Styling

### Cards (Neo-Brutalist)

```tsx
className={cn(
  "bg-white border-2 border-gray-800 rounded-xl p-6",
  "shadow-card",
  "hover:shadow-hover transition-shadow duration-200"
)}
```

### Buttons

#### Primary Button

```tsx
className="px-6 py-3 bg-green-500 text-white rounded-xl font-medium
           hover:bg-green-600 transition-all duration-200"
```

#### Secondary Button

```tsx
className="px-6 py-3 bg-white text-gray-800 border-2 border-gray-800 rounded-xl
           hover:bg-gray-50 transition-all duration-200"
```

#### Outline Button

```tsx
className="px-6 py-3 bg-transparent text-gray-800 border-2 border-gray-800 rounded-xl
           hover:bg-white transition-all duration-200"
```

### Badges

```tsx
// Badge variants
const variants = {
  lime: "bg-lime-400 text-gray-800",
  green: "bg-green-500 text-white",
  pink: "bg-pink-200 text-gray-800",
  blue: "bg-blue-200 text-gray-800",
  purple: "bg-purple-200 text-gray-800",
};

// Usage
className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
```

### Navigation

```tsx
// Desktop nav link
className="text-gray-500 hover:text-green-500 transition-colors
           duration-200 font-medium cursor-pointer"

// Mobile nav link
className="block text-gray-500 hover:text-green-500 transition-colors
           duration-200 font-medium cursor-pointer py-2"
```

## Shadow System

| Shadow | Usage |
|--------|-------|
| `shadow-card` | Default card shadow |
| `shadow-navbar` | Navbar shadow |
| `shadow-hover` | Hover state elevation |
| `shadow-brutal` | Neo-brutalist offset shadow (4px 4px 0 gray-800) |
| `shadow-brutal-sm` | Small brutalist shadow (2px 2px 0 gray-800) |

## Animation Guidelines

### Framer Motion Variants

| Variant | Properties | Usage |
|---------|------------|-------|
| fadeInUp | `opacity: 0->1, y: 20->0` | Section entries |
| fadeIn | `opacity: 0->1` | Simple fade |
| cardHover | `scale: 1->1.02` | Button hover |
| whileTap | `scale: 0.98` | Button press |

### Spring Transitions

```typescript
// Default spring
{ type: "spring", stiffness: 300, damping: 20 }
```

### CSS Transitions

```css
/* Standard transition */
transition-all duration-200

/* Shadow transition */
transition-shadow duration-200
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
           focus-visible:ring-green-500 focus-visible:ring-offset-2"
```

### Color Contrast

- Normal text: minimum 4.5:1 ratio
- Large text: minimum 3:1 ratio
- Interactive elements: visible focus indicators

### Semantic Structure

```html
<header> -> Navigation
<main> -> Main content
<section> -> Content sections with heading hierarchy
<footer> -> Footer content
<nav> -> Navigation menus
```

## Icon Guidelines

- Size: `w-6 h-6` (24px) for inline icons
- Size: `w-8 h-8` (32px) for feature icons
- Use `aria-label` for icon-only buttons
- Color follows parent text or explicit `text-green-500`
