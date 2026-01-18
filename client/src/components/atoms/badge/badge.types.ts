export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}

