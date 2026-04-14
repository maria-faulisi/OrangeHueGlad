import styles from './Typography.module.scss';

export interface BodyProps extends React.HTMLAttributes<HTMLParagraphElement> {
  /** Text size */
  size?: 'sm' | 'md';
  /** Reduces text to muted/secondary color */
  muted?: boolean;
}

/** Body text paragraph with size and muted variants. */
export const Body = ({
  size = 'md',
  muted = false,
  className,
  children,
  ...props
}: BodyProps) => {
  const classes = [
    styles.body,
    size === 'sm' ? styles.bodySm : styles.bodyMd,
    muted ? styles.bodyMuted : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <p className={classes} {...props}>
      {children}
    </p>
  );
};
