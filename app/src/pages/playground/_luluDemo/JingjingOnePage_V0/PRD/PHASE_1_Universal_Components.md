# Phase 1: Universal Components PRD

## Overview

**Phase**: 1 of 7  
**Status**: Pending  
**Priority**: High  
**Estimated Effort**: 2-3 days  
**Dependencies**: None (can start immediately)

## Objective

Build 5 reusable universal UI components that will be used throughout the JingJing One Page dashboard and potentially in other projects. These components have no business logic and are pure presentation components.

---

## ⚠️ CRITICAL: Design System Compliance

**ALL components in this phase MUST strictly follow the existing design system.**

### Required Reading
📄 **[Design System Reference](./_DESIGN_SYSTEM_REFERENCE.md)** - Read this FIRST before implementing any component.

### Design System Requirements

1. **Colors**: Use ONLY CSS variables from `@styles/color-use.scss` and `@styles/color-chart.scss`
   - ❌ NO hardcoded colors (e.g., `#FF0000`, `rgb(255, 0, 0)`)
   - ✅ USE CSS variables (e.g., `var(--color-main)`, `var(--hot-heat-4)`)

2. **Spacing**: Follow 4px grid system from `@styles/spacing.scss`
   - Use: 4px, 8px, 12px, 16px, 24px, 32px, 48px
   - Use `var(--content-padding)` for content padding

3. **Shadows**: Use `var(--pop-shadow)` from `@styles/shadow.scss`
   - For custom shadows, maintain consistent rgba values

4. **Typography**: Follow font hierarchy
   - Font sizes: 12px, 14px, 16px, 18px, 20px, 24px
   - Line heights: 1.2-1.3 for headings, 1.5-1.6 for body

5. **Accessibility**: Ensure WCAG AA compliance
   - Color contrast ratio ≥ 4.5:1 for normal text
   - Test in both light and dark modes

### Import Requirements

Every SCSS file MUST import design system:
```scss
@import '@/styles/color-use.scss';
@import '@/styles/color-chart.scss';
@import '@/styles/spacing.scss';
```

---

## Components to Build

### 1.1 RichText Component ⭐ **CRITICAL PATH**

**Location**: `src/components/ui/RichText/`

#### Requirements

**Purpose**: Render formatted text content with inline styles including bold, italic, highlight, and custom text colors.

**Visual Appearance**:
- Bold text should use font-weight: 600 or 700
- Italic text should use font-style: italic
- Highlighted text should have a background color (e.g., light yellow/amber)
- Colored text should support predefined colors and custom hex values

#### API Specification

```typescript
interface RichTextProps {
  content: RichTextContent[];
  className?: string;
}

interface RichTextContent {
  text: string;
  styles?: {
    bold?: boolean;
    italic?: boolean;
    highlight?: boolean;
    color?: string; // Predefined color name or hex code
  };
}
```

#### Supported Colors

```typescript
const PREDEFINED_COLORS = {
  red: '#D32F2F',      // For warnings/negative
  green: '#388E3C',    // For positive/success
  blue: '#1976D2',     // For informational
  orange: '#F57C00',   // For caution/attention
  gray: '#757575',     // For secondary/muted
  // Allow custom hex colors as well
};
```

#### Usage Examples

```typescript
// Example 1: Simple bold text
<RichText content={[
  { text: "Sales ", styles: { bold: true } },
  { text: "increased by " },
  { text: "15%", styles: { bold: true, color: "green" } }
]} />

// Example 2: Complex formatting
<RichText content={[
  { text: "Your " },
  { text: "UPT", styles: { bold: true } },
  { text: " has " },
  { text: "decreased", styles: { highlight: true, color: "red" } },
  { text: " by " },
  { text: "15%", styles: { bold: true, highlight: true, color: "red" } }
]} />
```

#### Files to Create

```
src/components/ui/RichText/
├── _component.tsx          # Main component implementation
├── _styles.module.scss     # Component styles
├── index.ts                # Exports
└── README.md               # Documentation with examples
```

#### Implementation Requirements

1. **Render Logic**:
   - Map through `content` array
   - Apply styles cumulatively (e.g., text can be both bold and colored)
   - Use `<span>` elements for each text segment

2. **Styling Requirements**:
   - MUST use CSS modules (`.module.scss`)
   - MUST use design system colors (see _DESIGN_SYSTEM_REFERENCE.md)
   - Support className prop for custom wrapper styling
   - Ensure text remains readable with all style combinations
   - Bold: `font-weight: 600` or `700`
   - Italic: `font-style: italic`
   - Highlight: Use `var(--amber-7)` or `var(--zest-7)` for background
   - Text colors: Use corresponding design system variables

3. **Accessibility**:
   - MUST ensure color contrast WCAG AA (4.5:1 minimum)
   - Text MUST be readable even without colors (for colorblind users)
   - Use semantic HTML where appropriate

#### Test Cases

```typescript
// Test 1: Plain text only
content: [{ text: "Plain text" }]

// Test 2: All styles combined
content: [{ 
  text: "Bold, italic, highlighted, red", 
  styles: { bold: true, italic: true, highlight: true, color: "red" } 
}]

// Test 3: Mixed content
content: [
  { text: "Normal " },
  { text: "bold", styles: { bold: true } },
  { text: " and " },
  { text: "colored", styles: { color: "blue" } }
]

// Test 4: Custom hex color
content: [{ text: "Custom color", styles: { color: "#FF5733" } }]
```

#### Acceptance Criteria

- [ ] Component renders all text content correctly
- [ ] Bold style applies font-weight change
- [ ] Italic style applies font-style change
- [ ] Highlight style applies background color
- [ ] Color style applies text color
- [ ] Multiple styles can be combined on same text
- [ ] Predefined colors work correctly
- [ ] Custom hex colors work correctly
- [ ] className prop works for wrapper styling
- [ ] Component is fully typed with TypeScript
- [ ] README.md includes usage examples
- [ ] Styles follow design system colors

---

### 1.2 WeatherWidget Component

**Location**: `src/components/ui/WeatherWidget/`

#### Requirements

**Purpose**: Display weather information with icon, condition, and optional temperature.

**Visual Reference**: From screenshot - shows weather icon with condition in navigation bar

#### API Specification

```typescript
interface WeatherWidgetProps {
  condition: string;      // "Sunny", "Cloudy", "Rainy", etc.
  temperature?: number;   // Temperature in celsius
  icon?: string;          // Icon identifier or custom icon
  showTemperature?: boolean;  // Default: true
  size?: 'small' | 'medium' | 'large';  // Default: 'medium'
  className?: string;
}
```

#### Supported Weather Conditions

```typescript
const WEATHER_CONDITIONS = [
  'Sunny',
  'Cloudy', 
  'Partly Cloudy',
  'Rainy',
  'Stormy',
  'Snowy',
  'Foggy',
  'Windy'
];
```

#### Icon Mapping

Use existing Icon component or create simple weather icons:
- Sunny: ☀️ or sun icon
- Cloudy: ☁️ or cloud icon
- Rainy: 🌧️ or rain icon
- etc.

#### Files to Create

```
src/components/ui/WeatherWidget/
├── _component.tsx
├── _styles.module.scss
├── icons/                  # Optional: weather icon SVGs
│   ├── sunny.svg
│   ├── cloudy.svg
│   └── ...
├── index.ts
└── README.md
```

#### Usage Examples

```typescript
// Example 1: Full display
<WeatherWidget 
  condition="Sunny" 
  temperature={18}
  size="medium"
/>

// Example 2: Without temperature
<WeatherWidget 
  condition="Cloudy"
  showTemperature={false}
  size="small"
/>

// Example 3: Custom icon
<WeatherWidget 
  condition="Rainy"
  temperature={12}
  icon="custom-rain-icon"
/>
```

#### Component Layout

```
[Icon] Condition Temperature°
  ☀️    Sunny       18°
```

#### Acceptance Criteria

- [ ] Displays weather icon correctly
- [ ] Shows condition text
- [ ] Shows temperature when provided
- [ ] Temperature can be hidden via prop
- [ ] Supports small, medium, large sizes
- [ ] Icon maps correctly to condition
- [ ] Custom icons supported via prop
- [ ] Responsive and well-styled
- [ ] README.md with examples
- [ ] Fully typed with TypeScript

---

### 1.3 InfoPanel Component

**Location**: `src/components/ui/InfoPanel/`

#### Requirements

**Purpose**: Generic panel for displaying key-value information pairs with optional icon and title.

**Visual Reference**: From screenshot - Peak Hours and Category Mix panels use this pattern

**Screenshot Analysis**:
- **Peak Hours Panel**: 
  - Icon: Clock icon
  - Title: "Peak Hours"
  - Items: "Best CR: 2-4PM (78%)", "Low CR: 10-12PM (52%)", "Rush: 5-7PM"
  
- **Category Mix Panel**:
  - Icon: Shopping bag icon
  - Title: "Category Mix"
  - Items: "Men's: 58% (↑5%)", "Women's: 42%", "Traffic: 342 (+12)"

#### API Specification

```typescript
interface InfoPanelProps {
  icon?: React.ReactNode;
  title: string;
  items: InfoItem[];
  variant?: 'default' | 'compact' | 'highlighted';
  layout?: 'vertical' | 'horizontal';
  className?: string;
}

interface InfoItem {
  label: string;
  value: string | React.ReactNode;
  highlight?: boolean;
  color?: string;
  sublabel?: string;  // For additional info
}
```

#### Files to Create

```
src/components/ui/InfoPanel/
├── _component.tsx
├── _styles.module.scss
├── index.ts
└── README.md
```

#### Usage Examples

```typescript
// Example 1: Peak Hours Panel
<InfoPanel
  icon={<ClockIcon />}
  title="Peak Hours"
  items={[
    { label: "Best CR", value: "2-4PM (78%)", highlight: true },
    { label: "Low CR", value: "10-12PM (52%)" },
    { label: "Rush", value: "5-7PM" }
  ]}
/>

// Example 2: Category Mix Panel
<InfoPanel
  icon={<ShoppingBagIcon />}
  title="Category Mix"
  items={[
    { label: "Men's", value: "58% (↑5%)", color: "green" },
    { label: "Women's", value: "42%" },
    { label: "Traffic", value: "342 (+12)" }
  ]}
/>

// Example 3: Compact variant
<InfoPanel
  title="Quick Stats"
  items={[
    { label: "Total", value: "$12,500" },
    { label: "Items", value: "45" }
  ]}
  variant="compact"
/>
```

#### Component Layout

```
┌─────────────────────────┐
│ [Icon] Title            │
│                         │
│ Label 1        Value 1  │
│ Label 2        Value 2  │
│ Label 3        Value 3  │
└─────────────────────────┘
```

#### Styling Requirements

- Clean, minimal design
- Proper spacing between items
- Icon and title aligned horizontally
- Labels left-aligned, values right-aligned
- Highlight option adds subtle background or bold text
- Responsive layout

#### Acceptance Criteria

- [ ] Displays icon and title
- [ ] Renders all items with label-value pairs
- [ ] Supports React nodes as values
- [ ] Highlight option works
- [ ] Color option for values works
- [ ] Sublabel support
- [ ] Variant styles (default, compact, highlighted)
- [ ] Layout options (vertical, horizontal)
- [ ] Clean, professional styling
- [ ] README.md with examples
- [ ] Fully typed with TypeScript

---

### 1.4 Card Component

**Location**: `src/components/ui/Card/`

#### Requirements

**Purpose**: Generic card container with header, body, and optional footer. Supports variants for different use cases.

**Visual Reference**: From screenshots - All tip cards use this pattern with different border colors

**Card Variants Observed**:
- Critical Out-of-Stock: Red left border
- Overstock Opportunities: Yellow/orange left border
- Inventory Actions: Gray left border
- Sales Tips: Blue border (implied)

#### API Specification

```typescript
interface CardProps {
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated' | 'danger' | 'warning' | 'success' | 'info';
  borderColor?: string;  // Custom border color (overrides variant)
  borderPosition?: 'left' | 'top' | 'right' | 'bottom' | 'all';
  className?: string;
  onClick?: () => void;
}
```

#### Files to Create

```
src/components/ui/Card/
├── _component.tsx
├── _styles.module.scss
├── index.ts
└── README.md
```

#### Usage Examples

```typescript
// Example 1: Simple card
<Card 
  header={<h3>Card Title</h3>}
  body={<p>Card content goes here</p>}
/>

// Example 2: Danger variant with left border
<Card 
  header="🔴 Critical Out-of-Stock"
  body={<InventoryList items={items} />}
  variant="danger"
  borderPosition="left"
/>

// Example 3: Custom border color
<Card 
  header="Custom Card"
  body={<div>Content</div>}
  borderColor="#FF5733"
  borderPosition="left"
/>

// Example 4: Elevated card with footer
<Card 
  header="Today's Target"
  body={<TargetDetails />}
  footer={<Button>View Details</Button>}
  variant="elevated"
/>
```

#### Variant Styles

```scss
// Danger: Red theme
.card-danger {
  border-left: 4px solid #D32F2F;
  background: #FFEBEE;  // Light red background
}

// Warning: Yellow/orange theme
.card-warning {
  border-left: 4px solid #F57C00;
  background: #FFF3E0;  // Light orange background
}

// Success: Green theme
.card-success {
  border-left: 4px solid #388E3C;
  background: #E8F5E9;  // Light green background
}

// Info: Blue theme
.card-info {
  border-left: 4px solid #1976D2;
  background: #E3F2FD;  // Light blue background
}

// Default: Neutral
.card-default {
  border: 1px solid #E0E0E0;
  background: #FFFFFF;
}

// Outlined: Border only
.card-outlined {
  border: 1px solid #BDBDBD;
  background: transparent;
}

// Elevated: Shadow
.card-elevated {
  border: none;
  background: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

#### Component Structure

```tsx
<div className={`card card-${variant}`}>
  {header && <div className="card-header">{header}</div>}
  <div className="card-body">{body}</div>
  {footer && <div className="card-footer">{footer}</div>}
</div>
```

#### Acceptance Criteria

- [ ] Renders header, body, footer correctly
- [ ] All variants styled correctly
- [ ] Custom border color works
- [ ] Border position configurable
- [ ] onClick handler supported
- [ ] Responsive and well-spaced
- [ ] Clean visual hierarchy
- [ ] README.md with all variant examples
- [ ] Fully typed with TypeScript

---

### 1.5 StatusBadge Component

**Location**: `src/components/ui/StatusBadge/`

#### Requirements

**Purpose**: Display status indicators with appropriate colors, icons, and labels.

**Visual Reference**: From screenshot - UPT "↑ Above" (green), Conv. Rate "On Track" (blue), AUR "↓ Below" (red/pink)

#### API Specification

```typescript
interface StatusBadgeProps {
  label: string;
  status: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
  variant?: 'filled' | 'outlined' | 'light';
  className?: string;
}
```

#### Status Color Mapping

```typescript
const STATUS_COLORS = {
  success: {
    bg: '#E8F5E9',      // Light green
    text: '#2E7D32',    // Dark green
    border: '#4CAF50'   // Green
  },
  warning: {
    bg: '#FFF3E0',      // Light orange
    text: '#E65100',    // Dark orange
    border: '#FF9800'   // Orange
  },
  danger: {
    bg: '#FFEBEE',      // Light red/pink
    text: '#C62828',    // Dark red
    border: '#F44336'   // Red
  },
  info: {
    bg: '#E3F2FD',      // Light blue
    text: '#1565C0',    // Dark blue
    border: '#2196F3'   // Blue
  },
  neutral: {
    bg: '#F5F5F5',      // Light gray
    text: '#616161',    // Dark gray
    border: '#9E9E9E'   // Gray
  }
};
```

#### Files to Create

```
src/components/ui/StatusBadge/
├── _component.tsx
├── _styles.module.scss
├── index.ts
└── README.md
```

#### Usage Examples

```typescript
// Example 1: Success with icon
<StatusBadge 
  label="↑ Above" 
  status="success"
  variant="light"
/>

// Example 2: Info status
<StatusBadge 
  label="On Track" 
  status="info"
  variant="light"
/>

// Example 3: Danger with icon
<StatusBadge 
  label="↓ Below" 
  status="danger"
  variant="light"
/>

// Example 4: Custom icon
<StatusBadge 
  label="Processing" 
  status="warning"
  icon={<SpinnerIcon />}
/>
```

#### Variant Styles

**Light (Default)**: Colored background with darker text
**Filled**: Solid background with white text
**Outlined**: Transparent background with colored border and text

#### Component Layout

```
┌─────────────────┐
│ [Icon] Label    │
└─────────────────┘
```

#### Acceptance Criteria

- [ ] All status types render correctly
- [ ] Colors match design system
- [ ] Icons supported (optional)
- [ ] Three size variants work
- [ ] Three style variants work
- [ ] Badge is inline-friendly
- [ ] Text is readable with good contrast
- [ ] README.md with examples
- [ ] Fully typed with TypeScript

---

## Development Guidelines

### Follow Workspace Rules

Before starting, fetch and follow these rules:
- `color-guide` - For all color usage in styles
- `component-structure` - For component file organization

### Code Quality Standards

1. **TypeScript**:
   - All props must be fully typed
   - No `any` types
   - Export interfaces from component files

2. **SCSS**:
   - Use CSS modules (`.module.scss`)
   - Follow color system from workspace
   - Use design tokens where available
   - Mobile-first responsive design

3. **Documentation**:
   - Every component needs README.md
   - Include usage examples
   - Document all props
   - Show visual examples if possible

4. **Accessibility**:
   - Proper color contrast (WCAG AA minimum)
   - Semantic HTML
   - ARIA labels where needed
   - Keyboard navigation support

5. **File Structure**:
   ```
   ComponentName/
   ├── _component.tsx       # Component implementation
   ├── _styles.module.scss  # Scoped styles
   ├── index.ts             # Exports
   └── README.md            # Documentation
   ```

### Testing Checklist

For each component:
- [ ] Test with minimal props
- [ ] Test with all props
- [ ] Test edge cases (empty content, long text, etc.)
- [ ] Test responsive behavior
- [ ] Test in light/dark mode (if applicable)
- [ ] Visual verification in browser

---

## Export Configuration

After building all components, update the main export file:

**File**: `src/components/ui/index.ts`

```typescript
// Add these exports
export { RichText } from './RichText';
export type { RichTextProps, RichTextContent } from './RichText';

export { WeatherWidget } from './WeatherWidget';
export type { WeatherWidgetProps } from './WeatherWidget';

export { InfoPanel } from './InfoPanel';
export type { InfoPanelProps, InfoItem } from './InfoPanel';

export { Card } from './Card';
export type { CardProps } from './Card';

export { StatusBadge } from './StatusBadge';
export type { StatusBadgeProps } from './StatusBadge';
```

---

## Success Criteria

Phase 1 is complete when:

- [ ] All 5 components built and exported
- [ ] All components have complete TypeScript types
- [ ] All components have SCSS module styles
- [ ] All components have README.md documentation
- [ ] All components follow workspace style rules
- [ ] All components are accessible
- [ ] Components can be imported from `src/components/ui/`
- [ ] Visual verification in Storybook or test page (optional but recommended)

---

## Next Phase

After completing Phase 1, proceed to **Phase 2: Mock Data & Types** to create the data structures that will be used throughout the application.

