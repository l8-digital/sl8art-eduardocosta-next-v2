
import React, { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';

type ButtonBaseProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  target?:string;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type ButtonAsButton = ButtonBaseProps & {
  type?: 'button' | 'submit' | 'reset';
  href?: never;
};

type ButtonAsAnchor = ButtonBaseProps & {
  type: 'a';
  href: string;
  target?:string;
};

type ButtonAsLink = ButtonBaseProps & {
  type: 'link';
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsLink;

export function Button({
  size = 'md',
  color = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  target,
  href,
  onClick,
  className = '',
  children,
  ...rest
}: ButtonProps) {

  const defaultClasses =
    'flex items-center justify-center whitespace-nowrap rounded uppercase text-center font-bold tracking-wide focus:outline-none transition duration-300 ease-in-out appearance-none w-full';

  const sizeClasses = {
    xs: 'text-xs px-4 py-2',
    sm: 'text-[0.9375rem] px-5 py-2 leading-[1.1]',
    lg: 'text-base md:text-lg leading-[0.875] px-3 md:px-6 py-4',
    md: 'text-base leading-[0.875] px-3 md:px-6 py-3.5',
  }[size];

  const colorClasses = {
    primary: 'bg-primary text-black',
    'outline-primary': 'border border-primary text-primary',
    'outline-light': 'border border-white text-white',
    black: 'bg-black text-white hover:bg-black/80',
    secondary: 'bg-secondary hover:bg-primary-dark border border-secondary hover:border-primary-dark text-white',
    // ... demais cores
  }[color] || '';

  const loadingClasses = loading
    ? {
      primary: 'is-loading before:text-gray before:border-r-black',
      black: 'is-loading before:text-white/90 before:border-r-black',
    }[color] || 'is-loading before:text-gray-light before:border-r-white'
    : '';

  const disabledClasses = disabled
    ? {
      success:
        'disabled:hover:bg-gray-light disabled:bg-gray-light disabled:border-gray-light disabled:cursor-not-allowed',
      black:
        'disabled:hover:bg-black-light disabled:bg-black-light disabled:cursor-not-allowed',
    }[color] || ''
    : '';

  const classes = clsx(
    defaultClasses,
    sizeClasses,
    colorClasses,
    loadingClasses,
    disabledClasses,
    className
  );

  if (type === 'a' && href) {
    return (
      <a href={href} target={target} className={classes} {...rest}  rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  if (type === 'link' && href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      type={typeof type === 'string' && ['button', 'submit', 'reset'].includes(type)
        ? (type as 'button' | 'submit' | 'reset')
        : 'button'}
      disabled={disabled || loading}
      onClick={onClick}
      className={classes}
      {...rest}
      aria-label='Botao'
    >
      {children}
    </button>
  );
}
