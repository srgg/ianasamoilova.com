# Mandatory Standards

**Status**: MANDATORY for all code changes  
**Scope**: All HTML, CSS, JavaScript, and content files

---

## 1. Mobile-First Development

### CSS Media Query Order
Write base styles for mobile (smallest viewport), then progressively enhance for larger screens using `min-width` queries.

**Breakpoint reference**: See `assets/css/hero-responsive.css:40-44` or use Tailwind's `theme('screens.X')` function.

```css
/* CORRECT: Mobile-first — base styles apply to all, enhance upward */
.element {
  padding: 1rem;
}
@media (min-width: theme('screens.sm')) {
  .element { padding: 1.5rem; }
}
@media (min-width: theme('screens.md')) {
  .element { padding: 2rem; }
}

/* INCORRECT: Desktop-first — DO NOT USE max-width as primary pattern */
.element {
  padding: 2rem;
}
@media (max-width: 768px) {
  .element { padding: 1rem; }
}
```

### Tailwind CSS Classes
Always use unprefixed classes as mobile base, add responsive prefixes for larger screens:
- ✅ `text-base md:text-lg lg:text-xl`
- ❌ `text-xl md:text-lg sm:text-base`

### Touch Targets
Minimum touch target size: **44x44 CSS pixels** (WCAG 2.5.5 AAA) or **24x24 CSS pixels** (WCAG 2.5.8 AA minimum).

---

## 2. WCAG 2.1 AA Compliance

### Perceivable

#### Color Contrast
- **Normal text**: Minimum 4.5:1 contrast ratio
- **Large text** (18px+ or 14px+ bold): Minimum 3:1 contrast ratio
- **UI components/graphics**: Minimum 3:1 contrast ratio
- Never use color alone to convey information

#### Text & Content
- Use relative units (`rem`, `em`) for font sizes, never absolute `px` for body text
- Ensure text can be resized up to 200% without loss of content
- Line height minimum: 1.5x font size for body text
- Paragraph spacing minimum: 2x font size
- Letter spacing adjustable to 0.12x font size
- Word spacing adjustable to 0.16x font size

#### Images
- All `<img>` elements MUST have `alt` attribute
- Decorative images: `alt=""`
- Informative images: descriptive alt text
- Complex images: provide long description via `aria-describedby`

### Operable

#### Keyboard Navigation
- All interactive elements MUST be keyboard accessible
- Visible focus indicators on all focusable elements
- Logical tab order (avoid `tabindex` > 0)
- No keyboard traps

#### Skip Links
Provide "Skip to main content" link as first focusable element.

#### Motion & Animation
- Respect `prefers-reduced-motion` media query
- No auto-playing content that lasts > 5 seconds without pause control

### Understandable

#### Language
- Declare page language: `<html lang="en">`
- Mark language changes inline: `<span lang="es">Hola</span>`

#### Forms
- Associate labels with inputs via `for`/`id` or nesting
- Provide clear error messages
- Indicate required fields programmatically

### Robust

#### Valid HTML
- Use semantic HTML5 elements
- Ensure valid, parseable markup
- Unique `id` attributes

---

## 3. ARIA (Accessible Rich Internet Applications)

### First Rule of ARIA
**Do NOT use ARIA if native HTML can achieve the same result.**

```html
<!-- CORRECT: Use native HTML -->
<button>Submit</button>

<!-- INCORRECT: Unnecessary ARIA -->
<div role="button" tabindex="0">Submit</div>
```

### Required ARIA Patterns

#### Landmarks
Use native HTML5 landmarks; add ARIA only when necessary:
- `<header>` → implicit `role="banner"`
- `<nav>` → implicit `role="navigation"`
- `<main>` → implicit `role="main"`
- `<footer>` → implicit `role="contentinfo"`

#### Interactive Components
When native HTML insufficient:
- `aria-expanded` for collapsible content
- `aria-haspopup` for menus/dialogs
- `aria-controls` to link trigger to controlled element
- `aria-live` for dynamic content updates

#### Labels & Descriptions
- `aria-label`: Provides accessible name when visible text absent
- `aria-labelledby`: References visible text as label
- `aria-describedby`: Links to descriptive text

### ARIA States to Maintain
Always update dynamically:
- `aria-expanded="true|false"`
- `aria-selected="true|false"`
- `aria-checked="true|false|mixed"`
- `aria-disabled="true|false"`
- `aria-hidden="true|false"`

### Hiding Content
- Visually hidden but accessible: Use `.sr-only` class
- Hidden from everyone: `display: none` or `hidden` attribute
- Hidden from assistive tech only: `aria-hidden="true"`

---

## 4. Implementation Checklist

Before any PR/commit, verify:

- [ ] CSS follows mobile-first (min-width media queries)
- [ ] Tailwind classes use mobile-base with responsive prefixes
- [ ] Color contrast meets 4.5:1 (text) / 3:1 (UI) minimums
- [ ] All images have appropriate `alt` attributes
- [ ] Interactive elements are keyboard accessible
- [ ] Focus indicators are visible
- [ ] Page language is declared
- [ ] Forms have associated labels
- [ ] ARIA used only when HTML semantics insufficient
- [ ] ARIA states updated dynamically on interaction
- [ ] Touch targets meet 44x44px minimum

---

## 5. Testing Requirements

### Automated
- Run Lighthouse accessibility audit (target: 100)
- Use axe DevTools browser extension

### Manual
- Tab through entire page with keyboard only
- Test with screen reader (VoiceOver on macOS)
- Verify at 200% zoom
- Test with `prefers-reduced-motion: reduce`

---

## References
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
