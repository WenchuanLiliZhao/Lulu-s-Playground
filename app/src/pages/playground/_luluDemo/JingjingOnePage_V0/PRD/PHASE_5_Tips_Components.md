# Phase 5: Tips Section Components PRD

## Overview

**Phase**: 5 of 7  
**Status**: Pending  
**Priority**: High  
**Estimated Effort**: 2-3 days  
**Dependencies**: Phase 1 (Universal Components), Phase 2 (Mock Data), Phase 3 (Layout Components)

## Objective

Build all components for the tips section, including tip cards and content block renderers that display different types of actionable recommendations.

---

## Components to Build

### 5.1 TipCard Component

**Location**: `JingjingOnePage_V0/components/TipsSection/TipCard/`

#### Requirements

**Purpose**: Wrapper component for individual tip cards with category-specific styling.

**Visual Reference**: From screenshots:
- Critical Out-of-Stock: Red (🔴) left border
- Overstock Opportunities: Yellow/Orange (🟡) left border
- Inventory Actions: Gray (📋) left border

#### API Specification

```typescript
interface TipCardProps {
  card: TipCard;
}

interface TipCard {
  id: string;
  category: TipCategory;
  label: string;
  body: ContentBlock[];
}

type TipCategory = 
  | 'sales'
  | 'labour'
  | 'vm'
  | 'season-weather'
  | 'out-of-stock'
  | 'overstock'
  | 'inventory-actions';
```

#### Files to Create

```
components/TipsSection/TipCard/
├── _component.tsx
├── _styles.module.scss
└── index.ts
```

#### Component Implementation

```typescript
import React from 'react';
import { Card } from '@/components/ui/Card';
import type { TipCard as TipCardData } from '../../../data/types';
import { BlockRenderer } from '../BlockRenderer';
import styles from './_styles.module.scss';

interface TipCardProps {
  card: TipCardData;
}

// Map category to card variant and style
const categoryStyleMap = {
  'sales': { variant: 'info' as const, borderColor: '#2196F3' },
  'labour': { variant: 'info' as const, borderColor: '#9C27B0' },
  'vm': { variant: 'info' as const, borderColor: '#00BCD4' },
  'season-weather': { variant: 'info' as const, borderColor: '#FF9800' },
  'out-of-stock': { variant: 'danger' as const, borderColor: '#D32F2F' },
  'overstock': { variant: 'warning' as const, borderColor: '#F57C00' },
  'inventory-actions': { variant: 'default' as const, borderColor: '#757575' }
};

export const TipCard: React.FC<TipCardProps> = ({ card }) => {
  const style = categoryStyleMap[card.category];

  return (
    <Card
      header={
        <div className={styles.cardHeader}>
          <h3 className={styles.cardLabel}>{card.label}</h3>
        </div>
      }
      body={
        <div className={styles.cardBody}>
          {card.body.map((block, index) => (
            <BlockRenderer key={index} block={block} />
          ))}
        </div>
      }
      variant={style.variant}
      borderColor={style.borderColor}
      borderPosition="left"
      className={styles.tipCard}
    />
  );
};
```

#### SCSS Implementation

```scss
.tipCard {
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateX(2px);
  }
}

.cardHeader {
  padding: 0;
}

.cardLabel {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text-primary, #212121);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cardBody {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0;
}
```

#### Acceptance Criteria

- [ ] Uses Card universal component
- [ ] Category determines border color and variant
- [ ] Label displays with proper styling
- [ ] Body renders all content blocks
- [ ] Hover effect subtle and smooth
- [ ] Clean typography and spacing

---

### 5.2 BlockRenderer Component

**Location**: `JingjingOnePage_V0/components/TipsSection/BlockRenderer/`

#### Requirements

**Purpose**: Dispatcher component that renders different block types (paragraph, product card, list).

#### API Specification

```typescript
interface BlockRendererProps {
  block: ContentBlock;
}

type ContentBlock = ParagraphBlock | ProductCardBlock | ListBlock;
```

#### Files to Create

```
components/TipsSection/BlockRenderer/
├── _component.tsx
├── _styles.module.scss
├── ParagraphBlock/
│   ├── _component.tsx
│   ├── _styles.module.scss
│   └── index.ts
├── ProductCardBlock/
│   ├── _component.tsx
│   ├── _styles.module.scss
│   └── index.ts
├── InventoryListBlock/
│   ├── _component.tsx
│   ├── _styles.module.scss
│   └── index.ts
└── index.ts
```

#### Component Implementation

```typescript
import React from 'react';
import type { ContentBlock } from '../../../data/types';
import { ParagraphBlock } from './ParagraphBlock';
import { ProductCardBlock } from './ProductCardBlock';
import { InventoryListBlock } from './InventoryListBlock';

interface BlockRendererProps {
  block: ContentBlock;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ block }) => {
  switch (block.type) {
    case 'paragraph':
      return <ParagraphBlock block={block} />;
    case 'productCard':
      return <ProductCardBlock block={block} />;
    case 'list':
      return <InventoryListBlock block={block} />;
    default:
      return null;
  }
};
```

---

### 5.3 ParagraphBlock Component

**Location**: `JingjingOnePage_V0/components/TipsSection/BlockRenderer/ParagraphBlock/`

#### Requirements

**Purpose**: Render paragraph content using RichText universal component.

#### API Specification

```typescript
interface ParagraphBlockProps {
  block: ParagraphBlock;
}

interface ParagraphBlock {
  type: 'paragraph';
  content: RichTextContent[];
}
```

#### Component Implementation

```typescript
import React from 'react';
import { RichText } from '@/components/ui/RichText';
import type { ParagraphBlock as ParagraphBlockData } from '../../../../data/types';
import styles from './_styles.module.scss';

interface ParagraphBlockProps {
  block: ParagraphBlockData;
}

export const ParagraphBlock: React.FC<ParagraphBlockProps> = ({ block }) => {
  return (
    <div className={styles.paragraphBlock}>
      <RichText content={block.content} />
    </div>
  );
};
```

#### SCSS Implementation

```scss
.paragraphBlock {
  line-height: 1.6;
  color: var(--color-text-primary, #212121);
  
  & + & {
    margin-top: 8px;
  }
}
```

#### Acceptance Criteria

- [ ] Uses RichText universal component
- [ ] Proper line height for readability
- [ ] Spacing between multiple paragraphs
- [ ] All rich text formatting works

---

### 5.4 ProductCardBlock Component

**Location**: `JingjingOnePage_V0/components/TipsSection/BlockRenderer/ProductCardBlock/`

#### Requirements

**Purpose**: Display product information in a card format similar to Medium article cards.

**Visual Style**: Minimal, clean design with optional image, title, and summary.

#### API Specification

```typescript
interface ProductCardBlockProps {
  block: ProductCardBlock;
}

interface ProductCardBlock {
  type: 'productCard';
  image?: string;
  title: string;
  summary: string;
  urgency?: 'low' | 'medium' | 'high';
}
```

#### Component Implementation

```typescript
import React from 'react';
import type { ProductCardBlock as ProductCardBlockData } from '../../../../data/types';
import styles from './_styles.module.scss';

interface ProductCardBlockProps {
  block: ProductCardBlockData;
}

const urgencyStyleMap = {
  low: styles.urgencyLow,
  medium: styles.urgencyMedium,
  high: styles.urgencyHigh
};

export const ProductCardBlock: React.FC<ProductCardBlockProps> = ({ block }) => {
  const urgencyClass = block.urgency ? urgencyStyleMap[block.urgency] : '';

  return (
    <div className={`${styles.productCard} ${urgencyClass}`}>
      {block.image && (
        <div className={styles.imageContainer}>
          <img 
            src={block.image} 
            alt={block.title}
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.content}>
        <h4 className={styles.title}>{block.title}</h4>
        <p className={styles.summary}>{block.summary}</p>
      </div>
    </div>
  );
};
```

#### SCSS Implementation

```scss
.productCard {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: #F9FAFB;
  border-radius: 8px;
  border: 1px solid #E0E0E0;
  transition: border-color 0.2s, background 0.2s;
  
  &:hover {
    background: #F5F5F5;
    border-color: #BDBDBD;
  }
}

.imageContainer {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  background: #E0E0E0;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;  // Allow text truncation
}

.title {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text-primary, #212121);
  margin: 0;
  line-height: 1.3;
}

.summary {
  font-size: 13px;
  color: var(--color-text-secondary, #757575);
  margin: 0;
  line-height: 1.4;
}

// Urgency styling
.urgencyHigh {
  border-left: 3px solid #D32F2F;
  background: #FFEBEE;
}

.urgencyMedium {
  border-left: 3px solid #F57C00;
  background: #FFF3E0;
}

.urgencyLow {
  border-left: 3px solid #757575;
}
```

#### Acceptance Criteria

- [ ] Image displays when provided
- [ ] Title and summary always display
- [ ] Clean, minimal card design
- [ ] Urgency adds left border and background
- [ ] Hover effect subtle
- [ ] Responsive and readable

---

### 5.5 InventoryListBlock Component

**Location**: `JingjingOnePage_V0/components/TipsSection/BlockRenderer/InventoryListBlock/`

#### Requirements

**Purpose**: Display inventory items in list format for out-of-stock, overstock, and actions.

**Visual Reference**: From screenshots:
- **Out-of-Stock**: Product name + Action (e.g., "Reorder!", "2 days lead")
- **Overstock**: Product name + Quantity (e.g., "18 pcs", "25 pcs")
- **Actions**: Action type + Detail (e.g., "Priority Reorder: Navy chinos 32x32")

#### API Specification

```typescript
interface InventoryListBlockProps {
  block: ListBlock;
}

interface ListBlock {
  type: 'list';
  variant: 'out-of-stock' | 'overstock' | 'actions';
  items: ListItem[];
}

interface ListItem {
  product: string;
  detail?: string;
  action?: string;
  quantity?: string;
}
```

#### Component Implementation

```typescript
import React from 'react';
import type { ListBlock } from '../../../../data/types';
import styles from './_styles.module.scss';

interface InventoryListBlockProps {
  block: ListBlock;
}

export const InventoryListBlock: React.FC<InventoryListBlockProps> = ({ block }) => {
  const variantClass = styles[`variant-${block.variant}`];

  const renderItem = (item: ListBlock['items'][0], index: number) => {
    return (
      <div key={index} className={`${styles.listItem} ${variantClass}`}>
        <div className={styles.product}>{item.product}</div>
        <div className={styles.value}>
          {item.action && <span className={styles.action}>{item.action}</span>}
          {item.quantity && <span className={styles.quantity}>{item.quantity}</span>}
          {item.detail && <span className={styles.detail}>{item.detail}</span>}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.inventoryList}>
      {block.items.map((item, index) => renderItem(item, index))}
    </div>
  );
};
```

#### SCSS Implementation

```scss
.inventoryList {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.listItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #F9FAFB;
  border-radius: 6px;
  border-left: 3px solid transparent;
  transition: background 0.2s;
  
  &:hover {
    background: #F5F5F5;
  }
}

.product {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text-primary, #212121);
  flex: 1;
}

.value {
  font-size: 14px;
  font-weight: 600;
  text-align: right;
}

.action {
  color: #D32F2F;
  font-weight: 700;
}

.quantity {
  color: #F57C00;
  font-weight: 700;
}

.detail {
  color: var(--color-text-secondary, #616161);
  font-weight: 500;
}

// Variant-specific styles
.variant-out-of-stock {
  border-left-color: #D32F2F;
  
  &:hover {
    background: #FFEBEE;
  }
}

.variant-overstock {
  border-left-color: #F57C00;
  
  &:hover {
    background: #FFF3E0;
  }
}

.variant-actions {
  border-left-color: #757575;
}

@media (max-width: 480px) {
  .listItem {
    flex-direction: column;
    align-items: flex-start;
    gap: 6px;
  }
  
  .value {
    text-align: left;
  }
}
```

#### Acceptance Criteria

- [ ] Items display in list format
- [ ] Product name on left, value on right
- [ ] Out-of-stock variant: red accent, action text
- [ ] Overstock variant: orange accent, quantity text
- [ ] Actions variant: gray accent, detail text
- [ ] Hover effect per variant
- [ ] Responsive layout on mobile

---

### 5.6 Update TipsSection Component

Update the `TipsSection` component to use real TipCard components.

**File**: `components/TipsSection/_component.tsx`

```typescript
import React from 'react';
import type { TipCard as TipCardData } from '../../data/types';
import { TipCard } from './TipCard';
import styles from './_styles.module.scss';

interface TipsSectionProps {
  cards: TipCardData[];
}

export const TipsSection: React.FC<TipsSectionProps> = ({ cards }) => {
  return (
    <div className={styles.tipsSection}>
      <h2 className={styles.sectionTitle}>💡 Tips & Actions</h2>
      
      <div className={styles.cardList}>
        {cards.map((card) => (
          <TipCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};
```

**Update exports in** `components/TipsSection/index.ts`:

```typescript
export { TipsSection } from './_component';
export { TipCard } from './TipCard';
export { BlockRenderer } from './BlockRenderer';
export { ParagraphBlock } from './BlockRenderer/ParagraphBlock';
export { ProductCardBlock } from './BlockRenderer/ProductCardBlock';
export { InventoryListBlock } from './BlockRenderer/InventoryListBlock';

export type { TipsSectionProps } from './_component';
```

---

## Component Composition Summary

```
TipsSection
└── TipCard (for each tip)
    ├── Card [Universal Component]
    └── BlockRenderer (for each content block)
        ├── ParagraphBlock
        │   └── RichText [Universal Component]
        ├── ProductCardBlock
        └── InventoryListBlock
```

---

## Testing Strategy

### Test Each Block Type

```typescript
// Test 1: Paragraph with rich formatting
const paragraphBlock: ParagraphBlock = {
  type: 'paragraph',
  content: [
    { text: "Your ", styles: {} },
    { text: "UPT", styles: { bold: true } },
    { text: " decreased by ", styles: {} },
    { text: "15%", styles: { bold: true, color: "red", highlight: true } }
  ]
};

// Test 2: Product card with urgency
const productBlock: ProductCardBlock = {
  type: 'productCard',
  title: "Slim Fit Chino - Navy (32x32)",
  summary: "High demand - reorder immediately",
  urgency: "high"
};

// Test 3: Out-of-stock list
const listBlock: ListBlock = {
  type: 'list',
  variant: 'out-of-stock',
  items: [
    { product: "Chinos - Navy", action: "Reorder!" },
    { product: "Oxford Shirt", action: "2 days lead" }
  ]
};
```

### Visual Verification Checklist

- [ ] Sales Tips: Blue left border, paragraph formatting
- [ ] Labour Tips: Purple left border, clear recommendations
- [ ] VM Tips: Cyan left border, product cards display
- [ ] Out-of-Stock: Red border, action labels prominent
- [ ] Overstock: Orange border, quantity labels prominent
- [ ] Inventory Actions: Gray border, detail text clear

### Content Testing

Test with:
- Short tips (1 paragraph)
- Long tips (3-4 paragraphs + cards)
- Multiple product cards (5-6 cards)
- Long product names (truncation/wrapping)
- Missing optional fields (images, trends, etc.)

---

## Accessibility Requirements

### For All Components

1. **Semantic HTML**:
   - Use appropriate heading levels
   - Use lists (`<ul>`, `<ol>`) where appropriate
   - Use `<article>` for tip cards

2. **Color Contrast**:
   - Ensure WCAG AA compliance (4.5:1 for text)
   - Don't rely solely on color to convey information

3. **Interactive Elements**:
   - Keyboard navigation support
   - Focus indicators visible
   - ARIA labels where needed

4. **Screen Readers**:
   - Alt text for images
   - Descriptive labels
   - Proper heading hierarchy

---

## Performance Optimization

### For List Rendering

If tip list becomes very long (20+ cards):

```typescript
// Consider virtual scrolling
import { FixedSizeList } from 'react-window';

// Or implement lazy loading
const [visibleCards, setVisibleCards] = useState(cards.slice(0, 10));
```

### For Images

```typescript
// Lazy load product images
<img 
  src={block.image} 
  loading="lazy"
  alt={block.title}
/>
```

---

## Success Criteria

Phase 5 is complete when:

- [ ] TipCard component built with category styling
- [ ] BlockRenderer dispatcher built
- [ ] ParagraphBlock built and uses RichText
- [ ] ProductCardBlock built with urgency levels
- [ ] InventoryListBlock built with three variants
- [ ] TipsSection updated to use real components
- [ ] All content blocks render correctly
- [ ] Category-specific border colors applied
- [ ] Rich text formatting works (bold, italic, highlight, colors)
- [ ] Product cards look clean and professional
- [ ] Inventory lists properly styled
- [ ] Hover effects smooth and appropriate
- [ ] Responsive on all screen sizes
- [ ] No TypeScript errors
- [ ] Matches visual design from screenshots

---

## Next Phase

After completing Phase 5, proceed to **Phase 6: Main Page Integration** to connect all components together in the main page and handle routing.

