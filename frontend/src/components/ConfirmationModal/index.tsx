"use client";

import { ReactNode } from "react";

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  icon?: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmButtonColor?: string;
}

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  icon,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmButtonColor = "bg-red-600 hover:bg-red-700",
}: ConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-100 rounded-2xl bg-white p-6 shadow-xl">
        {icon && <div className="mb-4 flex justify-center">{icon}</div>}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm  text-slate-500">{description}</p>
        </div>

        <div className="mt-6 grid sm:grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`rounded-md px-4 py-2 text-sm font-semibold text-white transition
              ${confirmButtonColor}
            `}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
