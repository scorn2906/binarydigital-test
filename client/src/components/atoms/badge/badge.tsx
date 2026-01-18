import clsx from 'clsx';
import { BadgeProps } from './badge.types';
import { badgeBase, sizes, variants } from './badge.style';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: BadgeProps) => {
  return (
    <span
      className={clsx(
        badgeBase,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
