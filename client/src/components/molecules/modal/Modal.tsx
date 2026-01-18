'use client';

import { Backdrop } from "../../atoms/backdrop/Backdrop";
import { ModalProps } from "./modal.types";


export const Modal = ({ open, title, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <>
      <Backdrop onClick={onClose} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white shadow-lg">
          {title && (
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-lg font-semibold">{title}</h3>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          )}

          <div className="p-4">{children}</div>
        </div>
      </div>
    </>
  );
};
