'use client'
import clsx from 'clsx';
import { ButtonProps } from "./button.types";
import { buttonBase, sizes, variants } from './button.style';


export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        buttonBase,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
