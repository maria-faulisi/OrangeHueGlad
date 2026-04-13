import styles from './Card.module.scss';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Inner padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Shadow depth */
  elevation?: 'flat' | 'raised';
  /** Rendered HTML element */
  as?: 'div' | 'article' | 'section';
}

const PADDING_CLASS: Record<NonNullable<CardProps['padding']>, string> = {
  none: '',
  sm:   styles.paddingSm  ?? '',
  md:   styles.paddingMd  ?? '',
  lg:   styles.paddingLg  ?? '',
};

/** Content container with optional padding and elevation. */
export const Card = ({
  padding = 'md',
  elevation = 'flat',
  as: Tag = 'div',
  className,
  children,
  ...props
}: CardProps) => {
  const classes = [
    styles.card,
    PADDING_CLASS[padding],
    elevation === 'raised' ? styles.raised : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Tag className={classes} {...props}>
      {children}
    </Tag>
  );
};
