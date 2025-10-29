# JingJing One Page V0 - Project Overview

## Quick Reference

**Project Type**: Store Management Dashboard  
**Strategy**: Demo-First, Progressive Refactoring  
**Total Phases**: 7  
**Time to Demo**: 2-3 days  
**Time to Production**: 12-15 days  

---

## 🎯 Implementation Strategy: Demo-First

**Core Philosophy**: Build a working demo first, then progressively refactor and componentize.

### Why This Approach?

1. **Fast Feedback**: See the complete page in 2-3 days
2. **Better Understanding**: Know what to extract after seeing the whole
3. **Lower Risk**: Validate design before heavy investment in architecture
4. **Clearer Boundaries**: Component interfaces emerge naturally from working code

### The Journey

```
Phase 1 (2-3 days)  → Complete Working Demo (monolithic but functional)
Phase 2 (1 day)     → Extract Data Layer (types + mock data)
Phase 3 (2 days)    → Extract Universal Components (5 reusable)
Phase 4 (1-2 days)  → Extract Layout Components (structure)
Phase 5 (2 days)    → Extract Dashboard Components (widgets)
Phase 6 (2 days)    → Extract Tips Components (content blocks)
Phase 7 (2-3 days)  → Polish & Testing (production-ready)
```

**Timeline**:
- **Day 3**: Full working demo ✅
- **Day 7**: Well-organized components ✅
- **Day 14**: Production-ready ✅

---

## ⚠️ CRITICAL: Design System Compliance

**Even in Phase 1 demo, MUST follow design system.**

📄 **[Read Design System Reference FIRST](./_DESIGN_SYSTEM_REFERENCE.md)**

### Non-Negotiable Requirements (ALL Phases)

- ✅ Use CSS variables from `@styles/color-use.scss` and `@styles/color-chart.scss`
- ✅ Follow 4px spacing grid
- ✅ Use semantic HTML
- ✅ Ensure WCAG AA accessibility
- ✅ Support light/dark modes
- ❌ NO hardcoded colors (even in demo)
- ❌ NO arbitrary spacing values

**Why strict in Phase 1?**
- Refactoring code structure is easy
- Refactoring colors/spacing across the codebase is painful
- Good CSS from the start = smooth refactoring later

---

## Phase Breakdown

### Phase 1: Rapid Demo (2-3 days) ⭐ **DEMO READY**

**Goal**: Complete functional page that looks production-ready

**Allowed**:
- Monolithic implementation (single file or few files)
- Repeated code patterns
- Simple TypeScript types
- Inline mock data

**Required**:
- ✅ Must use design system variables
- ✅ Clear code structure (functions, sections)
- ✅ TODO comments marking extraction points
- ✅ Basic TypeScript types
- ✅ All features working

**Output**: Fully functional demo at `/playground/jingjing-one-page-v0`

[📄 PHASE_1_Rapid_Demo.md](./PHASE_1_Rapid_Demo.md)

---

### Phase 2: Data Layer Extraction (1 day)

**Goal**: Separate data from UI, no visual changes

**Tasks**:
- Extract TypeScript interfaces to `data/types.ts`
- Extract mock data to `data/*.ts`
- Refactor Phase 1 to import data
- Zero UI changes

**Output**: Clean data layer, same UI

[📄 PHASE_2_Data_Layer.md](./PHASE_2_Data_Layer.md)

---

### Phase 3: Universal Components (2 days)

**Goal**: Extract 5 reusable UI components

**Tasks**:
- Identify repeated patterns from demo
- Create components in `src/components/ui/`
- Replace demo code incrementally
- Test after each replacement

**Components**: RichText, StatusBadge, Card, WeatherWidget, InfoPanel

**Output**: Reusable components, cleaner demo code

[📄 PHASE_3_Universal_Components.md](./PHASE_3_Universal_Components.md)

---

### Phase 4: Layout Refactoring (1-2 days)

**Goal**: Extract layout structure

**Tasks**:
- Extract PageLayout (3-section structure)
- Extract NavigationBar
- Extract DashboardSection container
- Extract TipsSection container

**Output**: Modular layout structure

[📄 PHASE_4_Layout_Refactoring.md](./PHASE_4_Layout_Refactoring.md)

---

### Phase 5: Dashboard Components (2 days)

**Goal**: Componentize dashboard section

**Tasks**:
- Extract PerformanceSnapshot
- Extract MetricsRow
- Extract PeakHoursPanel, CategoryMixPanel
- Extract TodayTargetDetail

**Output**: Reusable dashboard widgets

[📄 PHASE_5_Dashboard_Components.md](./PHASE_5_Dashboard_Components.md)

---

### Phase 6: Tips Components (2 days)

**Goal**: Componentize tips section

**Tasks**:
- Extract TipCard
- Extract BlockRenderer system
- Extract block types (Paragraph, Product, List)

**Output**: Complete component architecture

[📄 PHASE_6_Tips_Components.md](./PHASE_6_Tips_Components.md)

---

### Phase 7: Polish & Testing (2-3 days)

**Goal**: Production-ready quality

**Tasks**:
- Performance optimization
- Cross-browser testing
- Accessibility audit
- Bug fixing
- Documentation

**Output**: Production deployment ready

[📄 PHASE_7_Polish_Testing.md](./PHASE_7_Polish_Testing.md)

---

## Code Quality Through Phases

### Phase 1: Working Code
```typescript
// Monolithic but organized
const JingjingOnePage = () => {
  // TODO: Phase 2 - Extract to data/types.ts
  const mockData = { ... }
  
  // TODO: Phase 3 - Extract to RichText component
  const renderText = () => { ... }
  
  // TODO: Phase 4 - Extract to NavigationBar
  const renderNav = () => { ... }
  
  return <div>...</div>
}
```

### Phase 3: With Universal Components
```typescript
import { RichText, StatusBadge } from '@/components/ui'

const JingjingOnePage = () => {
  const mockData = { ... } // Still inline
  
  // TODO: Phase 4 - Extract to NavigationBar
  const renderNav = () => (
    <div><RichText content={...} /></div>
  )
  
  return <div>...</div>
}
```

### Phase 7: Full Architecture
```typescript
import { PageLayout, NavigationBar, DashboardSection, TipsSection } from './components'
import { mockStorePageData } from './data'

const JingjingOnePage = () => (
  <PageLayout
    navigation={<NavigationBar {...mockStorePageData.navigation} />}
    dashboard={<DashboardSection data={mockStorePageData.dashboard} />}
    tips={<TipsSection cards={mockStorePageData.tips} />}
  />
)
```

---

## Design Specifications

### Layout
- Navigation: Fixed, 64px height
- Dashboard: Left, ~60% width, scrollable
- Tips: Right, ~40% width, scrollable
- Body scroll: Disabled

### Color System (Use Variables!)

**Performance Snapshot**:
- Background: `var(--daydream-5)` to `var(--daydream-6)` gradient
- Text: `var(--color-bg-main)`

**Today's Target**:
- Background: `var(--wilderness-4)` to `var(--wilderness-5)` gradient
- Text: `var(--color-bg-main)`

**Status Indicators**:
- Success: `var(--wilderness-4)` (green)
- Info: `var(--indigo-5)` (blue)
- Error: `var(--hot-heat-4)` (red)
- Warning: `var(--amber-4)` (orange)

**Tip Card Borders**:
- Critical: `var(--hot-heat-4)`
- Warning: `var(--amber-4)`
- Info: `var(--indigo-5)`
- Neutral: `var(--nomad-4)`

### Typography
- H1: 24px, 700
- H2: 20px, 600
- H3: 18px, 600
- Body: 14px, 400
- Small: 12px, 400

### Spacing (4px Grid)
- Gaps: 4, 8, 12, 16, 24, 32, 48px
- Padding: 12, 20, 24, 32px
- Border radius: 6, 8, 12px

---

## Final Component Architecture

### Universal Components (Phase 3)
Location: `src/components/ui/`

1. **RichText** - Formatted text renderer
2. **StatusBadge** - Status indicators
3. **Card** - Generic card container
4. **WeatherWidget** - Weather display
5. **InfoPanel** - Key-value info panel

### Layout Components (Phase 4)
Location: `JingjingOnePage_V0/components/`

1. **PageLayout** - 3-section layout
2. **NavigationBar** - Top bar with logo/weather
3. **DashboardSection** - Left section container
4. **TipsSection** - Right section container

### Dashboard Components (Phase 5)
Location: `JingjingOnePage_V0/components/DashboardSection/`

1. **PerformanceSnapshot** - Yesterday vs Today
2. **MetricsRow** - UPT, Conv Rate, AUR
3. **PeakHoursPanel** - Peak hours info
4. **CategoryMixPanel** - Category breakdown
5. **TodayTargetDetail** - Target with time splits

### Tips Components (Phase 6)
Location: `JingjingOnePage_V0/components/TipsSection/`

1. **TipCard** - Tip card with category styling
2. **BlockRenderer** - Content block dispatcher
3. **ParagraphBlock** - Text block
4. **ProductCardBlock** - Product display
5. **InventoryListBlock** - Inventory lists

**Total**: 19 components by Phase 7

---

## Success Metrics

### Phase 1 Success
- [ ] Complete visual match with design
- [ ] All sections functional
- [ ] Uses design system colors
- [ ] Clear code structure with TODO comments
- [ ] Can be deployed and demoed

### Phase 7 Success
- [ ] 0 TypeScript errors
- [ ] 0 linter warnings
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] All components properly abstracted
- [ ] Full test coverage
- [ ] Production deployed

---

## Development Workflow

### For Each Phase

1. **Read**: Phase PRD completely
2. **Plan**: Understand extraction targets
3. **Implement**: Make changes incrementally
4. **Test**: Verify no regressions
5. **Document**: Update component READMEs
6. **Commit**: One logical commit per extraction

### Incremental Refactoring Pattern

```bash
# Example: Phase 3, extracting RichText
1. Create RichText component
2. Test RichText in isolation
3. Replace first usage in demo
4. Test demo still works
5. Replace second usage
6. Test again
7. Replace all usages
8. Remove old code
9. Commit
```

---

## Risk Mitigation

### Risk: Phase 1 code too messy to refactor

**Mitigation**:
- Enforce clear function boundaries in Phase 1
- Require TODO comments marking extraction points
- Use design system from the start
- Code review Phase 1 before proceeding

### Risk: Breaking changes during refactoring

**Mitigation**:
- Replace one component at a time
- Test after each replacement
- Keep git commits atomic
- Can rollback easily

### Risk: Over-engineering in later phases

**Mitigation**:
- Each phase has specific, limited scope
- Extract only what makes sense
- Don't abstract prematurely
- Follow the PRD strictly

---

## Getting Started

### For AI Implementation

1. **Essential Reading** (in order):
   - ⭐ `_DESIGN_SYSTEM_REFERENCE.md` - **MUST READ FIRST**
   - ⭐ This overview
   - `README.md` - Detailed requirements
   - `IMPLEMENTATION_STRATEGY.md` - Original strategy (now superseded)

2. **Fetch Workspace Rules**:
   - `color-guide`
   - `component-structure`

3. **Start Phase 1**:
   - Read `PHASE_1_Rapid_Demo.md`
   - Build complete functional demo
   - Use design system strictly
   - Add TODO comments for extractions

4. **Progressive Refactoring** (Phases 2-6):
   - Extract incrementally
   - Test continuously
   - No regressions allowed

5. **Final Polish** (Phase 7):
   - Optimize performance
   - Fix all issues
   - Production deployment

---

## Key Principles

### Do's ✅

- Start with working demo
- Use design system from day 1
- Mark extraction points clearly
- Test after every change
- Refactor incrementally
- Keep commits atomic

### Don'ts ❌

- Don't hardcode colors (ever!)
- Don't skip TODO comments in Phase 1
- Don't extract everything at once
- Don't break working features
- Don't over-abstract early
- Don't skip testing

---

## Document Conventions

- ⭐ Critical / Start Here
- ✅ Required / Do This
- ❌ Forbidden / Don't Do
- 📄 Document Link
- ⚠️ Important Warning
- 💡 Tip / Suggestion
- 🎯 Goal / Objective

---

## Ready? 🚀

**Your Path**:

1. ✅ Read `_DESIGN_SYSTEM_REFERENCE.md` 
2. ✅ Read this overview
3. ✅ Fetch workspace rules
4. ✅ Start `PHASE_1_Rapid_Demo.md`
5. ✅ Build, demo, show stakeholders
6. ✅ Refactor progressively (Phases 2-6)
7. ✅ Polish to perfection (Phase 7)

**Remember**: 
- Phase 1 = Show value fast
- Phases 2-6 = Build quality architecture  
- Phase 7 = Achieve production excellence

Let's build something great! 🎨
