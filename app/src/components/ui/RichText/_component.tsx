import styles from "./_styles.module.scss";

export interface RichTextContent {
  text: string;
  styles?: {
    bold?: boolean;
    italic?: boolean;
    highlight?: boolean;
    color?: string; // Predefined color name or hex code
  };
}

export interface RichTextProps {
  content: RichTextContent[];
  className?: string;
}

// Predefined color mapping
const PREDEFINED_COLORS: Record<string, string> = {
  red: 'var(--hot-heat-4)',
  green: 'var(--wilderness-4)',
  blue: 'var(--indigo-5)',
  orange: 'var(--amber-4)',
  gray: 'var(--nomad-4)',
  cyan: 'var(--cyan-4)',
  teal: 'var(--teal-4)',
  purple: 'var(--purple-4)',
};

export const RichText = ({ content, className }: RichTextProps) => {
  const getColorValue = (color?: string): string | undefined => {
    if (!color) return undefined;
    // Check if it's a predefined color
    if (PREDEFINED_COLORS[color.toLowerCase()]) {
      return PREDEFINED_COLORS[color.toLowerCase()];
    }
    // Check if it's a CSS variable
    if (color.startsWith('--')) {
      return `var(${color})`;
    }
    // Assume it's a hex code or other valid CSS color
    return color;
  };

  const getTextClassName = (textStyles?: RichTextContent['styles']): string => {
    const classes: string[] = [];
    
    if (textStyles?.bold) classes.push(styles['text-bold']);
    if (textStyles?.italic) classes.push(styles['text-italic']);
    if (textStyles?.highlight) classes.push(styles['text-highlight']);
    
    return classes.join(' ');
  };

  return (
    <span className={`${styles['container']} ${className || ''}`}>
      {content.map((segment, index) => {
        const textClassName = getTextClassName(segment.styles);
        const colorValue = getColorValue(segment.styles?.color);
        
        return (
          <span
            key={index}
            className={textClassName}
            style={colorValue ? { color: colorValue } : undefined}
          >
            {segment.text}
          </span>
        );
      })}
    </span>
  );
};

