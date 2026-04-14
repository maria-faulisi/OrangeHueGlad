import styles from './NavLink.module.scss';

export interface NavLinkProps {
  /** Destination URL */
  href: string;
  /** Link text or child elements */
  children: React.ReactNode;
  /**
   * Opens in a new tab and adds rel="noopener noreferrer" automatically.
   */
  external?: boolean;
  /** Visual style variant */
  variant?: 'default' | 'muted' | 'primary';
  /**
   * Escape hatch for router integrations (React Router, Next.js Link, etc.).
   * Receives the same props that would be spread on an <a> and should return
   * the router's link element.
   *
   * @example
   * renderAs={(p) => <RouterLink to={href} {...p} />}
   */
  renderAs?: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => React.ReactElement;
  /** Additional CSS class */
  className?: string;
}

const VARIANT_CLASS: Record<NonNullable<NavLinkProps['variant']>, string> = {
  default: styles.variantDefault ?? '',
  muted:   styles.variantMuted   ?? '',
  primary: styles.variantPrimary ?? '',
};

/** Router-agnostic anchor link with variant styling. */
export const NavLink = ({
  href,
  children,
  external = false,
  variant = 'default',
  renderAs,
  className,
}: NavLinkProps) => {
  const anchorProps: React.AnchorHTMLAttributes<HTMLAnchorElement> = {
    href,
    className: [styles.navLink, VARIANT_CLASS[variant], className]
      .filter(Boolean)
      .join(' '),
    ...(external && {
      target: '_blank',
      rel: 'noopener noreferrer',
    }),
    children,
  };

  if (renderAs) {
    return renderAs(anchorProps);
  }

  return <a {...anchorProps} />;
};
