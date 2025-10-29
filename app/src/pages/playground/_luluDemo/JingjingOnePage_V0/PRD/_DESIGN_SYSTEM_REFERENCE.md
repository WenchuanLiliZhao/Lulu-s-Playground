# Design System Reference

## ⚠️ Critical Requirement

**ALL components MUST follow the existing design system defined in `@styles/`.**

Do NOT use hardcoded colors, spacing, or other design tokens. Always reference the existing design system.

---

## Color System

### Usage Colors (`@styles/color-use.scss`)

**Text Colors**:
- Primary text: `var(--color-main)`
- Secondary text: `var(--color-sec)`
- Negative/disabled text: `var(--color-neg)`
- Disabled text: `var(--color-disabled)`

**Background Colors**:
- Main background: `var(--color-bg-main)`
- Secondary background: `var(--color-bg-sec)`
- Secondary background 2: `var(--color-bg-sec-2)`

**Border Colors**:
- Main border: `var(--color-border-main)`
- Darkened border: `var(--color-border-darken-trans)`

**Semantic Colors**:
- Active/Info: `var(--color-semantic-active)` → `var(--indigo-5)`
- Success/Above: `var(--color-semantic-success)` → `var(--wilderness-4)`
- Warning: `var(--color-semantic-warning)` → `var(--amber-4)`
- Error/Below: `var(--color-semantic-error)` → `var(--hot-heat-4)`

### Color Chart (`@styles/color-chart.scss`)

**Available Color Scales** (0-8 index, where 4 is typically the "base"):

| Scale | Use Case | Base Index | Base Color |
|-------|----------|------------|------------|
| `--hot-heat-X` | Error, danger, critical | 4 | `#FF4646` |
| `--wilderness-X` | Success, positive, growth | 4 | `#78B664` |
| `--amber-X` | Warning, attention | 4 | `#F59E0B` |
| `--indigo-X` | Info, active, primary | 4 | `#4F46E5` |
| `--daydream-X` | Info, calm, secondary | 6 | `#C0DDFF` |
| `--cyan-X` | Accent, highlight | 4 | `#06B6D4` |
| `--teal-X` | Accent, action | 4 | `#14B8A6` |
| `--purple-X` | Accent, special | 4 | `#9333EA` |
| `--orange-X` | Alert, urgency | 4 | `#F97316` |
| `--sequoia-X` | Brand-related | 2 | `#6A2C3E` |
| `--rosewood-X` | Brand-related | 5 | `#DC6D87` |
| `--nomad-X` | Neutral, muted | 4 | `#7F746C` |
| `--bone-X` | Light neutral | 7 | `#EFEEEC` |
| `--riverstone-X` | Neutral | 6 | `#C8C2B8` |
| `--espresso-X` | Dark, emphasis | 0 | `#2B1F1E` |
| `--mossy-X` | Neutral, subtle | 3 | `#524A43` |
| `--pink-organza-X` | Accent, feminine | 7 | `#FFE5F7` |
| `--zest-X` | Energetic, bright | 7 | `#F4FF8E` |

**Usage Example**:
```scss
// ✅ Correct
background: var(--daydream-6);
color: var(--color-main);
border: 1px solid var(--color-border-main);

// ❌ Wrong - Do NOT hardcode colors
background: #C0DDFF;
color: #1a1a1a;
border: 1px solid #ebebeb;
```

---

## Spacing System

### Defined in `@styles/spacing.scss`

**Navigation Spacing**:
- `--spacing-nav-item-size`: 32px
- `--spacing-nav-padding`: 12px
- `--spacing-nav-size`: 56px (calculated)

**Content Spacing**:
- `--content-padding`: 48px

### Recommended Spacing Scale

Use multiples of **4px** for consistency:
- `4px` - Minimal gap
- `8px` - Small gap
- `12px` - Medium-small gap
- `16px` - Medium gap
- `24px` - Large gap
- `32px` - Extra large gap
- `48px` - Section padding

**Usage Example**:
```scss
// ✅ Correct
padding: var(--content-padding);
gap: 16px;
margin: 24px 0;

// ❌ Wrong - Avoid arbitrary values
padding: 45px;
gap: 13px;
margin: 19px 0;
```

---

## Shadow System

### Defined in `@styles/shadow.scss`

**Available Shadows**:
- `--pop-shadow`: `0 8px 24px rgba(0, 0, 0, 0.16)`

**Usage Example**:
```scss
// ✅ Correct
box-shadow: var(--pop-shadow);

// For subtle shadows, you can define component-specific ones
// but keep them consistent
.card {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}
```

---

## Typography

### Font Configuration (`@styles/font.scss`)

The project uses system fonts with fallbacks.

**Font Hierarchy** (Recommended):
- **H1**: 24px, weight 700
- **H2**: 20px, weight 600
- **H3**: 18px, weight 600
- **H4**: 16px, weight 600
- **Body**: 14px, weight 400
- **Small**: 12px, weight 400
- **Label**: 12px, weight 600, uppercase, letter-spacing 0.5px

**Line Heights**:
- Headings: 1.2 - 1.3
- Body text: 1.5 - 1.6
- Labels: 1.0

---

## Component Color Mapping

### For JingJing One Page Dashboard

Based on design requirements:

**Performance Snapshot** (Blue gradient):
- Use: `--daydream-5` to `--daydream-6` or `--cyan-4` to `--cyan-5`
- Text: `white` or `var(--color-bg-main)`

**Status Indicators**:
- Success/Above: `var(--color-semantic-success)` or `var(--wilderness-4)`
- Info/On Track: `var(--color-semantic-active)` or `var(--indigo-5)`
- Error/Below: `var(--color-semantic-error)` or `var(--hot-heat-4)`

**Today's Target** (Green gradient):
- Use: `--wilderness-4` to `--wilderness-5`
- Text: `white` or `var(--color-bg-main)`

**Tip Card Borders**:
- Critical/Danger: `var(--hot-heat-4)`
- Warning: `var(--amber-4)` or `var(--orange-4)`
- Info: `var(--indigo-5)` or `var(--cyan-4)`
- Neutral: `var(--color-border-darken-trans)` or `var(--nomad-4)`

---

## Dark Mode Support

The color system supports both light and dark modes through CSS variables.

**How it works**:
- Light mode: Default (`:root`)
- Dark mode: Applied via `[data-theme="dark"]`
- System preference: `@media (prefers-color-scheme: dark)`

**Implementation**:
- Always use CSS variables (`var(--color-main)`)
- Never hardcode colors
- Test in both light and dark modes

---

## Accessibility Requirements

### Color Contrast

**WCAG AA Minimum Ratios**:
- Normal text (< 18px): 4.5:1
- Large text (≥ 18px): 3:1
- UI components: 3:1

**Testing**:
- Use browser DevTools to check contrast
- Verify all text is readable in both light/dark modes
- Don't rely solely on color to convey information

---

## Border Radius

**Recommended Values**:
- Small elements (badges, pills): `4px`
- Cards, panels: `6px` to `8px`
- Large cards: `12px`
- Buttons: `6px`

---

## Z-Index System

### Defined in `@styles/z-index.scss`

Keep z-index values organized and meaningful:
- Modals/Overlays: 1000+
- Fixed Navigation: 100
- Sticky Headers: 10
- Default content: 1 or auto

---

## Import Order

In component SCSS files, always import design system first:

```scss
// ✅ Correct import order
@import '@/styles/color-use.scss';
@import '@/styles/color-chart.scss';
@import '@/styles/spacing.scss';

.component {
  color: var(--color-main);
  padding: var(--content-padding);
}
```

---

## Component Styling Checklist

Before finalizing any component, verify:

- [ ] All colors use CSS variables from `color-use.scss` or `color-chart.scss`
- [ ] Spacing follows the 4px grid system
- [ ] No hardcoded color values (like `#FF0000`)
- [ ] Proper color contrast (WCAG AA)
- [ ] Works in both light and dark modes
- [ ] Consistent border radius values
- [ ] Uses semantic color variables for meaning (success, error, etc.)
- [ ] Font sizes follow typography scale
- [ ] Shadows use existing shadow variables or consistent values

---

## Quick Reference

### Most Common Variables

```scss
/* Text */
color: var(--color-main);              // Primary text
color: var(--color-sec);               // Secondary text

/* Backgrounds */
background: var(--color-bg-main);      // Main background
background: var(--color-bg-sec);       // Secondary background

/* Borders */
border: 1px solid var(--color-border-main);

/* Semantic */
--success: var(--color-semantic-success);
--error: var(--color-semantic-error);
--warning: var(--color-semantic-warning);
--info: var(--color-semantic-active);

/* Shadows */
box-shadow: var(--pop-shadow);

/* Spacing */
padding: var(--content-padding);
gap: 16px;
margin: 24px;
```

---

## Need More Colors?

If you need a specific shade:
1. Check if existing color scales have what you need (0-8 index)
2. Use lighter/darker variants from the same scale
3. Combine with opacity: `rgba(var(--color-main), 0.5)`
4. Do NOT create new hardcoded colors

---

**Remember: Consistency is key. When in doubt, reference existing components in the codebase!**

