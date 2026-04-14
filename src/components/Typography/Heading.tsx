import styles from './Typography.module.scss';

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  /** Semantic HTML heading level */
  level: 1 | 2 | 3 | 4;
  /**
   * Visual size — decouples appearance from semantics.
   * Defaults: h1→2xl, h2→xl, h3→lg, h4→md.
   */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

const TAG_MAP = { 1: 'h1', 2: 'h2', 3: 'h3', 4: 'h4' } as const;

const DEFAULT_SIZE: Record<1 | 2 | 3 | 4, NonNullable<HeadingProps['size']>> = {
  1: '2xl',
  2: 'xl',
  3: 'lg',
  4: 'md',
};

// Maps size prop to camelCased CSS module class names.
// '2xl' → headingXxl uses 'xxl' internally to avoid digit-prefixed CSS identifiers.
const SIZE_CLASS: Record<NonNullable<HeadingProps['size']>, string> = {
  sm:   styles.headingSm  ?? '',
  md:   styles.headingMd  ?? '',
  lg:   styles.headingLg  ?? '',
  xl:   styles.headingXl  ?? '',
  '2xl': styles.headingXxl ?? '',
};

/** Semantic heading with decoupled visual size. */
export const Heading = ({
  level,
  size,
  className,
  children,
  ...props
}: HeadingProps) => {
  const Tag = TAG_MAP[level];
  const resolvedSize = size ?? DEFAULT_SIZE[level] ?? '2xl';
  const classes = [styles.heading, SIZE_CLASS[resolvedSize], className]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};
