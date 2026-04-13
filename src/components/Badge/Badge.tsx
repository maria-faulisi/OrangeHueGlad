import styles from './Badge.module.scss';

export interface BadgeProps {
  /** Badge text */
  label: string;
  /** Visual variant */
  variant?: 'success' | 'neutral' | 'primary';
  /** Size */
  size?: 'sm' | 'md';
}

/** Compact label for statuses, tags, and categories. */
export const Badge = ({
  label,
  variant = 'success',
  size = 'sm',
}: BadgeProps) => {
  const classes = [
    styles.badge,
    styles[variant] ?? '',
    size === 'md' ? styles.sizeMd : styles.sizeSm,
  ]
    .filter(Boolean)
    .join(' ');

  return <span className={classes}>{label}</span>;
};
