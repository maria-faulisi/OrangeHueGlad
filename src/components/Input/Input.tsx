import styles from './Input.module.scss';

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Visible label text — rendered in a <label> element */
  label: string;
  /**
   * Must be provided — used to associate the <label> with the <input>
   * and to generate aria-describedby IDs for hint/error messages.
   */
  id: string;
  /** Helper text shown below the input */
  hint?: string;
  /** Error message — also sets aria-invalid on the input */
  error?: string;
  /** Input size */
  size?: 'sm' | 'md' | 'lg';
  /** Expands the input to fill its container */
  fullWidth?: boolean;
}

const SIZE_CLASS: Record<NonNullable<InputProps['size']>, string> = {
  sm: styles.inputSm ?? '',
  md: styles.inputMd ?? '',
  lg: styles.inputLg ?? '',
};

/** Accessible text input with label, hint, and error states. */
export const Input = ({
  label,
  id,
  hint,
  error,
  size = 'md',
  fullWidth = false,
  className,
  disabled,
  ...props
}: InputProps) => {
  const hintId  = hint  ? `${id}-hint`  : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const wrapperClasses = [
    styles.wrapper,
    fullWidth ? styles.fullWidth : '',
  ]
    .filter(Boolean)
    .join(' ');

  const inputClasses = [
    styles.input,
    SIZE_CLASS[size],
    error ? styles.inputError : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={wrapperClasses}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>

      <input
        id={id}
        className={inputClasses}
        aria-invalid={error ? true : undefined}
        {...(describedBy !== undefined && { 'aria-describedby': describedBy })}
        disabled={disabled}
        {...props}
      />

      {hint && !error && (
        <span id={hintId} className={styles.hint}>
          {hint}
        </span>
      )}

      {error && (
        <span id={errorId} className={styles.error} role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
