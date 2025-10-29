# Phase 6: Main Page Integration PRD

## Overview

**Phase**: 6 of 7  
**Status**: Pending  
**Priority**: High  
**Estimated Effort**: 1 day  
**Dependencies**: Phases 1-5 (All previous components)

## Objective

Integrate all components into the main page, configure routing, and ensure the complete dashboard works as a cohesive application.

---

## Files to Create/Update

### 6.1 Main Page Component

**File**: `JingjingOnePage_V0/index.tsx`

#### Requirements

**Purpose**: Main entry point that orchestrates all components and provides data.

#### Component Implementation

```typescript
import React from 'react';
import { LuluLayout } from '@/components/ui/AppLayout';
import { 
  PageLayout, 
  NavigationBar, 
  DashboardSection, 
  TipsSection 
} from './components';
import { mockStorePageData } from './data';
import styles from './styles.module.scss';

const JingjingOnePageV0: React.FC = () => {
  const { navigation, dashboard, tips } = mockStorePageData;

  return (
    <LuluLayout>
      <div className={styles.jingjingOnePage}>
        <PageLayout
          navigation={
            <NavigationBar 
              storeName={navigation.storeName}
              date={navigation.date}
              dayOfWeek={navigation.dayOfWeek}
              weather={navigation.weather}
              logo={
                <img 
                  src="/logo/BlackNoText.svg" 
                  alt="Lululemon" 
                  className={styles.logo}
                />
              }
            />
          }
          dashboard={
            <DashboardSection data={dashboard} />
          }
          tips={
            <TipsSection cards={tips} />
          }
          dashboardWidth="62%"
          tipsWidth="38%"
        />
      </div>
    </LuluLayout>
  );
};

export default JingjingOnePageV0;
```

---

### 6.2 Main Page Styles

**File**: `JingjingOnePage_V0/styles.module.scss`

#### SCSS Implementation

```scss
.jingjingOnePage {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  
  // Ensure global layout wrapper doesn't interfere
  :global(.lulu-layout) & {
    height: 100vh;
  }
}

.logo {
  height: 36px;
  width: auto;
  
  @media (max-width: 768px) {
    height: 28px;
  }
}

// Global overrides for this page (if needed)
:global {
  // Disable body scroll for this page
  body:has(.jingjingOnePage) {
    overflow: hidden;
  }
}
```

---

### 6.3 Update Playground Index

**File**: `src/pages/playground/_luluDemo/index.ts`

Add the new page to exports:

```typescript
import Demo_ColorChart_V0 from './Demo_ColorChart_V0';
import SalesEventCalendar_V1 from './SalesEventCalendar_V1';
import TrendChartDemo_V1 from './TrendChartDemo_V1';
import SalesEventTrend_V1 from './SalesEventTrend_V1';
import JingjingOnePage_V0 from './JingjingOnePage_V0';  // NEW

export const LuluDemoPages = {
  Demo_ColorChart_V0,
  SalesEventCalendar_V1,
  TrendChartDemo_V1,
  SalesEventTrend_V1,
  JingjingOnePage_V0,  // NEW
};
```

---

### 6.4 Update Playground Routes

**File**: `src/pages/playground/index.ts`

Add route configuration (adjust based on your routing setup):

```typescript
import { LuluDemoPages } from './_luluDemo';
import { CDDPages } from './CDD';
import { MediaPages } from './Media';

export const PlaygroundPages = {
  // ... existing pages
  'jingjing-one-page-v0': {
    path: '/playground/jingjing-one-page-v0',
    component: LuluDemoPages.JingjingOnePage_V0,
    title: 'JingJing One Page V0',
    description: 'Store management dashboard with performance metrics and actionable tips'
  }
};
```

---

### 6.5 Update App Routing (if needed)

**File**: `src/App.tsx` or relevant router file

Add route entry (syntax depends on your router):

```typescript
// Example with React Router
import JingjingOnePage_V0 from './pages/playground/_luluDemo/JingjingOnePage_V0';

// In your routes configuration:
<Route 
  path="/playground/jingjing-one-page-v0" 
  element={<JingjingOnePage_V0 />} 
/>
```

---

## Data Management Strategy

### Current Implementation (Phase 6)

Use static mock data:

```typescript
import { mockStorePageData } from './data';

// In component
const { navigation, dashboard, tips } = mockStorePageData;
```

### Future: Real Data Integration

Prepare structure for future API integration:

```typescript
// Example: Future implementation with data fetching
import { useState, useEffect } from 'react';
import { mockStorePageData } from './data';
import type { StorePageData } from './data/types';

const JingjingOnePageV0: React.FC = () => {
  const [data, setData] = useState<StorePageData>(mockStorePageData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Future: Fetch real data
    // fetchStoreData().then(setData).catch(setError);
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <LuluLayout>
      <PageLayout
        navigation={<NavigationBar {...data.navigation} />}
        dashboard={<DashboardSection data={data.dashboard} />}
        tips={<TipsSection cards={data.tips} />}
      />
    </LuluLayout>
  );
};
```

---

## Environment Configuration

### For Development

Ensure environment variables are set (if needed):

```typescript
// .env.local (if API integration is planned)
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENABLE_MOCK_DATA=true
```

---

## Testing Integration

### Manual Testing Checklist

#### Navigation Testing
- [ ] Logo displays correctly
- [ ] Store name shows
- [ ] Date formats properly
- [ ] Day of week displays
- [ ] Weather widget works
- [ ] Navigation stays fixed on scroll

#### Dashboard Testing
- [ ] Performance Snapshot shows with blue gradient
- [ ] Yesterday's value displays
- [ ] Today's target displays
- [ ] All three metrics show (UPT, Conv Rate, AUR)
- [ ] Status badges show correct colors
- [ ] Peak Hours panel displays
- [ ] Category Mix panel displays
- [ ] Today's Target detail shows with green gradient
- [ ] Morning/evening breakdown displays

#### Tips Testing
- [ ] All tip cards render
- [ ] Card borders match categories
- [ ] Sales tips show
- [ ] Labour tips show
- [ ] VM tips show with product cards
- [ ] Out-of-stock list shows with red styling
- [ ] Overstock list shows with orange styling
- [ ] Inventory actions show

#### Layout Testing
- [ ] Three-section layout correct
- [ ] Dashboard section scrolls independently
- [ ] Tips section scrolls independently
- [ ] Body doesn't scroll
- [ ] No horizontal scroll
- [ ] Sections maintain width ratio

#### Responsive Testing
- [ ] Desktop (1440px): Perfect layout
- [ ] Laptop (1024px): Maintains two-column
- [ ] Tablet (768px): Consider layout adjustment
- [ ] Mobile (375px): Stacked layout works

---

## Performance Verification

### Load Time Testing

```bash
# Build production version
npm run build

# Check bundle size
npm run build -- --analyze  # If available

# Verify page loads quickly
# Target: < 2 seconds on 3G
```

### Runtime Performance

Open browser DevTools and verify:
- [ ] No console errors
- [ ] No console warnings
- [ ] Smooth scrolling (60fps)
- [ ] No layout thrashing
- [ ] Memory usage stable

### Lighthouse Audit

Run Lighthouse and aim for:
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 80

---

## Browser Compatibility

### Test in Browsers

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### Polyfills (if needed)

```typescript
// vite.config.ts or similar
export default {
  build: {
    target: 'es2015',  // Ensure broad compatibility
  }
};
```

---

## Accessibility Audit

### Screen Reader Testing

Test with:
- NVDA (Windows)
- JAWS (Windows)
- VoiceOver (macOS/iOS)

Verify:
- [ ] All sections announced properly
- [ ] Heading hierarchy logical
- [ ] Interactive elements focusable
- [ ] Focus order makes sense
- [ ] Status updates announced

### Keyboard Navigation

Test all functionality:
- [ ] Tab through all elements
- [ ] Navigate dashboard with keyboard
- [ ] Navigate tips with keyboard
- [ ] No keyboard traps
- [ ] Focus indicators visible
- [ ] Skip links available (if needed)

---

## Documentation Updates

### Create User Guide (Optional)

**File**: `JingjingOnePage_V0/USER_GUIDE.md`

```markdown
# JingJing One Page V0 - User Guide

## Overview
Store management dashboard for daily operations...

## Features

### Dashboard Section
- **Performance Snapshot**: View yesterday's results and today's targets
- **Key Metrics**: Monitor UPT, Conversion Rate, and AUR
- **Peak Hours**: Identify best/worst performing time slots
- **Category Mix**: Track category performance and traffic

### Tips Section
- **Sales Tips**: Actionable recommendations to improve sales
- **Labour Tips**: Staffing optimization suggestions
- **VM Tips**: Visual merchandising priorities
- **Inventory Alerts**: Out-of-stock and overstock notifications

## Navigation
- Dashboard section scrolls independently
- Tips section scrolls independently
- Both sections accessible simultaneously

## Accessing the Page
Navigate to: `/playground/jingjing-one-page-v0`
```

---

## Error Handling

### Add Error Boundaries

```typescript
// components/ErrorBoundary.tsx (create if doesn't exist)
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

Update main page to use error boundary:

```typescript
const JingjingOnePageV0: React.FC = () => {
  return (
    <ErrorBoundary>
      <LuluLayout>
        <PageLayout {...props} />
      </LuluLayout>
    </ErrorBoundary>
  );
};
```

---

## Deployment Preparation

### Build Configuration

Ensure build works:

```bash
# Test build
npm run build

# Test build output
npm run preview
```

### Environment Variables

Check all environment variables are properly set:

```typescript
// Verify in code
console.log('Environment:', import.meta.env.MODE);
console.log('Base URL:', import.meta.env.BASE_URL);
```

---

## Success Criteria

Phase 6 is complete when:

- [ ] Main page component created
- [ ] All sub-components integrated
- [ ] Routing configured and working
- [ ] Page accessible via URL
- [ ] Mock data flows through all components
- [ ] Navigation bar fully functional
- [ ] Dashboard section fully functional
- [ ] Tips section fully functional
- [ ] Three-section layout works correctly
- [ ] Independent scrolling works
- [ ] Responsive design works on all devices
- [ ] No console errors or warnings
- [ ] Performance is acceptable
- [ ] Browser compatibility verified
- [ ] Accessibility audit passed
- [ ] Error handling in place
- [ ] Documentation updated
- [ ] Ready for production deployment

---

## Known Issues & Future Work

### Known Limitations

1. **Static Data**: Currently uses mock data only
2. **No Real-time Updates**: Data doesn't refresh automatically
3. **No User Preferences**: Can't customize layout or content
4. **No Export Functionality**: Can't export reports

### Future Enhancements (Post-Phase 7)

1. **API Integration**: Connect to real backend
2. **Real-time Updates**: WebSocket or polling
3. **User Preferences**: Customizable dashboard
4. **Export Features**: PDF/CSV export
5. **Historical Data**: View past performance
6. **Comparison Mode**: Compare stores or time periods
7. **Notifications**: Push notifications for alerts
8. **Mobile App**: Native mobile version

---

## Next Phase

After completing Phase 6, proceed to **Phase 7: Polish & Testing** for final refinements, bug fixes, and comprehensive testing before considering the project complete.

