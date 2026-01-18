'use client';

interface BackdropProps {
  onClick: () => void;
}

export const Backdrop = ({ onClick }: BackdropProps) => (
  <div
    onClick={onClick}
    className="fixed inset-0 z-40 bg-black/50"
  />
);
