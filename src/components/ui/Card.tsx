import React from 'react';
import styles from './Card.module.css';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  accentColor?: string;
}

export default function Card({ title, children, onClick, className = '', icon, accentColor }: CardProps) {
  const isInteractive = !!onClick;
  
  return (
    <div 
      className={`${styles.card} ${isInteractive ? styles.interactive : ''} ${className}`}
      onClick={onClick}
      style={accentColor ? { '--card-accent': accentColor } as React.CSSProperties : undefined}
    >
      {/* Decorative accent line */}
      <div className={styles.accentLine} />
      
      {icon && <div className={styles.iconArea}>{icon}</div>}
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}
