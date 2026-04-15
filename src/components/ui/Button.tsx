import React from 'react';
import Link from 'next/link';
import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  href?: string;
  onClick?: () => void;
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export default function Button({
  children,
  variant = 'primary',
  href,
  onClick,
  fullWidth = false,
  className = '',
  type = 'button'
}: ButtonProps) {
  const classes = `${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`;

  if (href) {
    // Determine if internal or external link
    const isInternal = href.startsWith('/');
    if (isInternal) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
