# Phase 1: Rapid Demo PRD

## Overview

**Phase**: 1 of 7  
**Status**: Pending  
**Priority**: Critical - This is where it all begins  
**Estimated Effort**: 2-3 days  
**Dependencies**: None  
**Output**: Complete working dashboard demo

---

## 🎯 Objective

Build a **fully functional, visually complete** store management dashboard that can be deployed and demonstrated immediately.

**Success Definition**: 
- Stakeholders can see and interact with the complete page
- All features work as designed
- Looks production-ready
- Uses design system properly

---

## ⚠️ Critical Design System Requirements

**Even though this is a "rapid" demo, you MUST use the design system.**

📄 **[Design System Reference](./_DESIGN_SYSTEM_REFERENCE.md)** - Read before coding

### Non-Negotiable Rules

1. **Colors**: ONLY use CSS variables
   - ❌ `background: #4FC3F7`
   - ✅ `background: var(--daydream-5)`

2. **Spacing**: Follow 4px grid
   - ❌ `gap: 13px`, `padding: 23px`
   - ✅ `gap: 12px`, `padding: 24px`

3. **Typography**: Use standard sizes
   - ✅ 12px, 14px, 16px, 18px, 20px, 24px

4. **Accessibility**: WCAG AA minimum
   - Color contrast ≥ 4.5:1 for text

**Why so strict?**
- Refactoring code structure is easy
- Changing colors/spacing across codebase is painful
- Good CSS foundations = smooth later refactoring

---

## 🏗️ Implementation Strategy

### Allowed Shortcuts (Speed over Architecture)

✅ **You CAN**:
- Put everything in 1-3 files (monolithic)
- Repeat similar code patterns
- Use inline mock data
- Keep types simple
- Use straightforward implementations

✅ **Simple is OK**:
```typescript
// This is fine for Phase 1
const navigation = {
  storeName: "Vancouver Store",
  date: "2025-10-29",
  // ... more data
}

// Repeated pattern is fine
<div className={styles.metric}>...</div>
<div className={styles.metric}>...</div>
<div className={styles.metric}>...</div>
```

### Required Quality (Architecture for Later)

✅ **You MUST**:
- Use design system CSS variables
- Keep functions reasonably sized (< 100 lines)
- Add clear TODO comments marking extraction points
- Maintain readable code structure
- Use semantic HTML
- Add basic TypeScript types

✅ **Structure Matters**:
```typescript
// Good - Clear sections with TODO markers
const JingjingOnePage = () => {
  // ============================================
  // DATA SECTION
  // TODO: Phase 2 - Extract to data/types.ts and data/*.ts
  // ============================================
  const mockNavigationData = { ... }
  const mockDashboardData = { ... }
  const mockTipsData = [ ... ]
  
  // ============================================
  // RENDER HELPERS
  // ============================================
  
  // TODO: Phase 4 - Extract to NavigationBar component
  const renderNavigation = () => { ... }
  
  // TODO: Phase 5 - Extract to PerformanceSnapshot component
  const renderPerformanceSnapshot = () => { ... }
  
  // TODO: Phase 3 - Extract to RichText component
  const renderRichText = (content) => { ... }
  
  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className={styles.page}>
      {renderNavigation()}
      <div className={styles.content}>
        {renderDashboard()}
        {renderTips()}
      </div>
    </div>
  )
}
```

---

## 📋 Features to Implement

### Navigation Bar (Top, Fixed)

**Visual**: Fixed bar, 64px height, full width

**Left Section**:
- Lululemon logo (use `/logo/BlackNoText.svg`)
- Store name: "Vancouver - Robson Street"

**Right Section**:
- Date: "Oct 29, 2025"
- Day: "Wednesday"
- Weather: Icon + "Sunny" + "18°"

**Design System Colors**:
- Background: `var(--color-bg-main)`
- Text: `var(--color-main)`
- Border: `var(--color-border-main)`

**TODO Marker**:
```typescript
// TODO: Phase 4 - Extract to NavigationBar component
// - Accept props: storeName, date, dayOfWeek, weather
// - Use WeatherWidget component (Phase 3)
```

---

### Dashboard Section (Left, ~60% width, Scrollable)

#### 1. Performance Snapshot

**Visual**: Blue gradient card, 2 columns

**Content**:
- Yesterday: "$24,580" + "103% of target"
- Today's Target: "$25,200" + "+2.5% vs yesterday"

**Design System Colors**:
- Background: `linear-gradient(135deg, var(--daydream-5), var(--daydream-6))`
- Text: `var(--color-bg-main)` (white)
- Shadow: `0 4px 12px rgba(41, 182, 246, 0.2)`

**TODO Marker**:
```typescript
// TODO: Phase 5 - Extract to PerformanceSnapshot component
// - Accept props: { yesterday: MetricValue, todayTarget: MetricValue }
// - Style must use var(--daydream-5) and var(--daydream-6)
```

---

#### 2. Three Metrics Row

**Visual**: 3 equal-width cards in a row

**Cards**:
1. **UPT**: "2.3" + "↑ Above" (green badge)
2. **Conv. Rate**: "68%" + "On Track" (blue badge)  
3. **AUR**: "$105" + "↓ Below" (red badge)

**Design System Colors**:
- Card background: `var(--color-bg-main)`
- Card border: `var(--color-border-main)`
- Success badge: `var(--wilderness-4)` background
- Info badge: `var(--indigo-5)` background
- Error badge: `var(--hot-heat-4)` background
- Badge text: `var(--color-bg-main)`

**TODO Markers**:
```typescript
// TODO: Phase 5 - Extract to MetricsRow component
// - Accept props: MetricsRowData
// - Uses StatusBadge component (Phase 3)

// TODO: Phase 3 - Extract status badge to StatusBadge component
// - Accept props: { label, status: 'success' | 'info' | 'error' }
// - Map status to design system colors
```

---

#### 3. Peak Hours & Category Mix (2 panels side-by-side)

**Peak Hours Panel**:
- Icon: 🕐
- Title: "Peak Hours"
- Content:
  - Best CR: "2-4PM (78%)"
  - Low CR: "10-12PM (52%)"
  - Rush: "5-7PM"

**Category Mix Panel**:
- Icon: 🛍️
- Title: "Category Mix"
- Content:
  - Men's: "58% (↑5%)"
  - Women's: "42%"
  - Traffic: "342 (+12)"

**Design System Colors**:
- Panel background: `var(--color-bg-main)`
- Border: `var(--color-border-main)`
- Title: `var(--color-main)`
- Content: `var(--color-sec)`

**TODO Markers**:
```typescript
// TODO: Phase 5 - Extract to PeakHoursPanel component
// - Uses InfoPanel component (Phase 3)

// TODO: Phase 5 - Extract to CategoryMixPanel component
// - Uses InfoPanel component (Phase 3)

// TODO: Phase 3 - Extract to InfoPanel component
// - Generic key-value display panel
// - Accept props: { icon, title, items: Array<{label, value}> }
```

---

#### 4. Today's Target Detail

**Visual**: Green gradient card

**Content**:
- Icon: 🎯
- Title: "Today's Target"
- Total: "$25,200" (large)
- Morning: 🌅 "$11,340"
- Evening: 🌙 "$13,860"

**Design System Colors**:
- Background: `linear-gradient(135deg, var(--wilderness-4), var(--wilderness-5))`
- Text: `var(--color-bg-main)` (white)
- Shadow: `0 4px 12px rgba(76, 175, 80, 0.2)`

**TODO Marker**:
```typescript
// TODO: Phase 5 - Extract to TodayTargetDetail component
// - Accept props: TodayTargetDetail
// - Style must use var(--wilderness-4) and var(--wilderness-5)
```

---

### Tips Section (Right, ~40% width, Scrollable)

#### Tip Cards

**6 Types of Tips** (render as separate cards):

1. **Sales Tips** (Blue border left)
2. **Labour Tips** (Purple border left)
3. **VM Tips** (Cyan border left)
4. **Season/Weather Tips** (Orange border left)
5. **Critical Out-of-Stock** (Red border left, 🔴 icon)
6. **Overstock Opportunities** (Orange border left, 🟡 icon)

**Card Structure**:
- Header: Icon + Title
- Body: Content blocks

**Content Block Types**:

**Paragraph Block**: 
- Rich text with bold, italic, highlight, colors
- Example: "Your **UPT** has ==decreased== by **15%**"

**Product Card Block**:
- Product title
- Summary
- Optional urgency indicator

**List Block**:
- For out-of-stock: Product + Action
- For overstock: Product + Quantity

**Design System Colors**:
- Card background: `var(--color-bg-main)`
- Critical border: `var(--hot-heat-4)` (4px left)
- Warning border: `var(--amber-4)` (4px left)
- Info border: `var(--indigo-5)` (4px left)
- Text bold: `font-weight: 600`
- Text highlight: `background: var(--amber-7)`
- Text color red: `color: var(--hot-heat-4)`
- Text color green: `color: var(--wilderness-4)`

**TODO Markers**:
```typescript
// TODO: Phase 6 - Extract to TipCard component
// - Accept props: TipCard
// - Category determines border color from design system

// TODO: Phase 6 - Extract to BlockRenderer system
// - Dispatches to ParagraphBlock, ProductCardBlock, ListBlock

// TODO: Phase 3 - Extract to RichText component
// - Handles bold, italic, highlight, colors
// - Must use design system colors for text colors

// TODO: Phase 6 - Extract to ProductCardBlock component
// - Display product info in card format

// TODO: Phase 6 - Extract to InventoryListBlock component
// - Display inventory items in list format
```

---

## 📁 File Structure for Phase 1

```
JingjingOnePage_V0/
├── index.tsx                 # Main component (400-600 lines is OK)
├── styles.module.scss        # All styles (500-800 lines is OK)
└── README.md                 # Basic usage doc
```

**That's it!** Just 2-3 files for Phase 1.

---

## 📐 Layout Implementation

### Three-Section Layout

```
┌────────────────────────────────────────────────────────────┐
│  Navigation (Fixed, 64px height)                           │
├──────────────────────────┬─────────────────────────────────┤
│                          │                                 │
│  Dashboard Section       │  Tips Section                   │
│  (60% width)             │  (40% width)                    │
│  Scroll: overflow-y      │  Scroll: overflow-y             │
│                          │                                 │
└──────────────────────────┴─────────────────────────────────┘
```

**Critical CSS**:
```scss
// Body scroll MUST be disabled
.page {
  width: 100%;
  height: 100vh;
  overflow: hidden;  // Critical!
}

.navigation {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  z-index: 100;
  background: var(--color-bg-main);
  border-bottom: 1px solid var(--color-border-main);
}

.content {
  display: flex;
  margin-top: 64px;
  height: calc(100vh - 64px);
  overflow: hidden;  // Critical!
}

.dashboardSection,
.tipsSection {
  height: 100%;
  overflow-y: auto;  // Only internal scroll
  overflow-x: hidden;
}

.dashboardSection {
  width: 60%;
  padding: 24px;
  background: var(--color-bg-sec);
  border-right: 1px solid var(--color-border-main);
}

.tipsSection {
  width: 40%;
  padding: 24px;
  background: var(--color-bg-main);
}
```

**TODO Marker**:
```scss
// TODO: Phase 4 - Extract these layout styles to PageLayout component
// - PageLayout wraps the entire page
// - Controls the 3-section layout and scroll behavior
```

---

## 📊 Mock Data Structure

**Keep it simple** - inline data is fine for Phase 1.

### Example Data Structure

```typescript
// TODO: Phase 2 - Extract to data/types.ts
interface NavigationData {
  storeName: string;
  date: string;
  dayOfWeek: string;
  weather: {
    condition: string;
    temperature: number;
    icon: string;
  };
}

// TODO: Phase 2 - Extract to data/navigationData.ts
const mockNavigationData: NavigationData = {
  storeName: "Vancouver - Robson Street",
  date: "2025-10-29",
  dayOfWeek: "Wednesday",
  weather: {
    condition: "Sunny",
    temperature: 18,
    icon: "sun"
  }
};

// ... more mock data
```

**Keep all data at the top of the file**, clearly marked for Phase 2 extraction.

---

## ✅ Acceptance Criteria

### Visual Match
- [ ] Navigation bar matches design
- [ ] Performance snapshot has blue gradient
- [ ] Three metrics display correctly with status badges
- [ ] Peak hours and category mix panels show data
- [ ] Today's target has green gradient
- [ ] All 6+ tip cards render with correct border colors
- [ ] Rich text formatting works (bold, highlight, colors)

### Functionality
- [ ] Page loads without errors
- [ ] Navigation bar stays fixed on scroll
- [ ] Dashboard section scrolls independently
- [ ] Tips section scrolls independently
- [ ] Body doesn't scroll
- [ ] All data displays correctly
- [ ] Responsive (works at 1440px, 1024px, 768px)

### Code Quality
- [ ] Uses design system CSS variables (NO hardcoded colors)
- [ ] Clear code structure with sections
- [ ] TODO comments mark extraction points
- [ ] Functions are reasonably sized
- [ ] Basic TypeScript types present
- [ ] Semantic HTML used

### Design System Compliance
- [ ] All colors use `var(--color-name)` format
- [ ] Spacing follows 4px grid
- [ ] Typography uses standard sizes
- [ ] Shadows use consistent values
- [ ] Border radius uses standard values (6px, 8px, 12px)

### Preparation for Refactoring
- [ ] Data section clearly marked for Phase 2
- [ ] Component boundaries marked with TODO comments
- [ ] At least 15+ TODO comments for future extraction
- [ ] Code structure logical and easy to refactor

---

## 🎨 Styling Guidelines

### SCSS Organization

```scss
// styles.module.scss

// ===========================================
// IMPORTS - Design System
// ===========================================
@import '@/styles/color-use.scss';
@import '@/styles/color-chart.scss';
@import '@/styles/spacing.scss';

// ===========================================
// LAYOUT
// TODO: Phase 4 - Extract to PageLayout styles
// ===========================================
.page { ... }
.navigation { ... }
.content { ... }
.dashboardSection { ... }
.tipsSection { ... }

// ===========================================
// NAVIGATION
// TODO: Phase 4 - Extract to NavigationBar styles
// ===========================================
.navLeft { ... }
.navRight { ... }
.storeName { ... }
.weather { ... }

// ===========================================
// DASHBOARD - Performance Snapshot
// TODO: Phase 5 - Extract to PerformanceSnapshot styles
// ===========================================
.performanceSnapshot {
  background: linear-gradient(
    135deg,
    var(--daydream-5),  // ✅ Design system color
    var(--daydream-6)   // ✅ Design system color
  );
  padding: 24px;  // ✅ 4px grid
  border-radius: 12px;  // ✅ Standard radius
  gap: 16px;  // ✅ 4px grid
}

// ... more styles
```

### Color Usage Examples

```scss
// ✅ CORRECT - Use design system
.performanceSnapshot {
  background: linear-gradient(
    135deg,
    var(--daydream-5),
    var(--daydream-6)
  );
  color: var(--color-bg-main);
}

.successBadge {
  background: var(--wilderness-4);
  color: var(--color-bg-main);
}

.errorBadge {
  background: var(--hot-heat-4);
  color: var(--color-bg-main);
}

// ❌ WRONG - Do NOT hardcode
.performanceSnapshot {
  background: linear-gradient(135deg, #4FC3F7, #29B6F6);  // ❌ NO!
  color: #FFFFFF;  // ❌ NO!
}
```

---

## 🚀 Implementation Order

### Step 1: Setup (30 min)
1. Create `index.tsx` and `styles.module.scss`
2. Import design system in SCSS
3. Set up basic page structure
4. Test that page loads

### Step 2: Layout (1 hour)
1. Implement 3-section layout
2. Add navigation bar structure
3. Add dashboard and tips containers
4. Verify scroll behavior works

### Step 3: Navigation (30 min)
1. Add logo and store name
2. Add date and day
3. Add weather display
4. Style with design system colors

### Step 4: Dashboard - Top Section (2 hours)
1. Performance Snapshot (blue gradient)
2. Three Metrics Row with status badges
3. Verify colors from design system

### Step 5: Dashboard - Bottom Section (1.5 hours)
1. Peak Hours panel
2. Category Mix panel
3. Today's Target (green gradient)

### Step 6: Tips Section (3 hours)
1. Implement rich text rendering
2. Create Sales Tips card
3. Create other tip cards (Labour, VM, etc.)
4. Implement product cards
5. Implement inventory lists

### Step 7: Mock Data (30 min)
1. Organize all mock data at top
2. Add TODO comments
3. Add basic TypeScript types

### Step 8: Polish (1-2 hours)
1. Add all TODO comments
2. Verify design system compliance
3. Test responsiveness
4. Fix any visual issues
5. Clean up code

### Step 9: Documentation (30 min)
1. Write basic README
2. Document how to run/view
3. Note what works

**Total**: ~12-16 hours = 2-3 days

---

## 📝 TODO Comment Examples

### Mark Data for Extraction

```typescript
// ============================================
// MOCK DATA - PHASE 2 EXTRACTION
// TODO: Phase 2 - Move to data/types.ts
// TODO: Phase 2 - Move to data/navigationData.ts
// TODO: Phase 2 - Move to data/dashboardData.ts
// TODO: Phase 2 - Move to data/tipsData.ts
// ============================================
```

### Mark Components for Extraction

```typescript
// TODO: Phase 3 - Extract to RichText component
// Location: src/components/ui/RichText/
// Props: { content: RichTextContent[] }
// This renders text with bold, italic, highlight, colors
const renderRichText = (content) => { ... }

// TODO: Phase 4 - Extract to NavigationBar component
// Location: components/NavigationBar/
// Props: { storeName, date, dayOfWeek, weather }
// Uses WeatherWidget from Phase 3
const renderNavigation = () => { ... }

// TODO: Phase 5 - Extract to PerformanceSnapshot component
// Location: components/DashboardSection/PerformanceSnapshot/
// Props: { yesterday: MetricValue, todayTarget: MetricValue }
// Must use var(--daydream-5) and var(--daydream-6) for gradient
const renderPerformanceSnapshot = () => { ... }
```

### Mark Styles for Extraction

```scss
// ===========================================
// TODO: Phase 4 - Extract to PageLayout/_styles.module.scss
// ===========================================
.page { ... }
.navigation { ... }
.content { ... }

// ===========================================
// TODO: Phase 5 - Extract to PerformanceSnapshot/_styles.module.scss
// Background must use var(--daydream-5) and var(--daydream-6)
// ===========================================
.performanceSnapshot { ... }
```

---

## ⚠️ Common Pitfalls to Avoid

### ❌ Don't Do This

```typescript
// ❌ Deep nesting - hard to extract later
const renderDashboard = () => {
  return (
    <div>
      <div>
        <div>
          <div>
            <div>...</div>  // Too deep!
          </div>
        </div>
      </div>
    </div>
  )
}

// ❌ Hardcoded colors
.card {
  background: #FFFFFF;  // NO!
  color: #212121;       // NO!
}

// ❌ No structure - everything in one render
return (
  <div>
    {/* 500 lines of JSX here */}
  </div>
)
```

### ✅ Do This Instead

```typescript
// ✅ Break into logical sections
const renderNavigation = () => { ... }
const renderDashboard = () => { ... }
const renderTips = () => { ... }

return (
  <div className={styles.page}>
    {renderNavigation()}
    <div className={styles.content}>
      {renderDashboard()}
      {renderTips()}
    </div>
  </div>
)

// ✅ Use design system
.card {
  background: var(--color-bg-main);
  color: var(--color-main);
}

// ✅ Further break down into sub-sections
const renderDashboard = () => (
  <div className={styles.dashboard}>
    {renderPerformanceSnapshot()}
    {renderMetricsRow()}
    {renderInfoPanels()}
    {renderTargetDetail()}
  </div>
)
```

---

## 🎯 Success = Demo + Foundation

**Phase 1 is successful when**:

1. ✅ **Demo Ready**: Can be deployed and shown to stakeholders
2. ✅ **Visually Complete**: Looks like production quality
3. ✅ **Functionally Complete**: All features work
4. ✅ **Design System**: Uses CSS variables throughout
5. ✅ **Well-Structured**: Clear sections and functions
6. ✅ **Well-Marked**: TODO comments guide refactoring
7. ✅ **No Blockers**: Nothing prevents Phase 2-7 refactoring

**Remember**: This phase balances speed (demo in 2-3 days) with quality (foundation for refactoring).

---

## 📚 Resources

- [Design System Reference](./_DESIGN_SYSTEM_REFERENCE.md) - Color/spacing/typography
- [Main README](../README.md) - Detailed requirements
- [Screenshots](../) - Visual reference

---

## Next Phase

After Phase 1 complete:
→ **[Phase 2: Data Layer Extraction](./PHASE_2_Data_Layer.md)**

Extract types and mock data to separate files. Zero UI changes.

