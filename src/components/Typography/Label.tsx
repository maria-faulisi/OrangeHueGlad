import styles from './Typography.module.scss';

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Text size */
  size?: 'sm' | 'md';
}

/** Inline label text for UI elements. Renders as a styled span. */
export const Label = ({
  size = 'md',
  className,
  children,
  ...props
}: LabelProps) => {
  const classes = [
    styles.label,
    size === 'sm' ? styles.labelSm : styles.labelMd,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};
