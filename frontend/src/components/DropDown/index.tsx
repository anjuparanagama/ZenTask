"use client";

import { useState, useRef, useEffect, useId, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

export interface DropdownOption<T extends string = string> {
  value: T;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps<T extends string = string> {
  options: DropdownOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
}

export function Dropdown<T extends string = string>({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  disabled = false,
  className = "",
  id,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const generatedId = useId();
  const buttonId = id ?? `dropdown-${generatedId}`;

  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  // Client mount for portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // Find selected option
  const selected = options.find(
    (option) => String(option.value) === String(value),
  );

  // Update dropdown position
  useEffect(() => {
    if (!open || !buttonRef.current) return;

    const updatePosition = () => {
      const rect = buttonRef.current!.getBoundingClientRect();

      setPosition({
        top: rect.bottom + 6,
        left: rect.left,
        width: rect.width,
      });
    };

    updatePosition();

    window.addEventListener("scroll", updatePosition, true);

    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("scroll", updatePosition, true);

      window.removeEventListener("resize", updatePosition);
    };
  }, [open]);

  // Outside click close
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  function selectOption(option: DropdownOption<T>) {
    if (option.disabled) return;

    onChange(option.value);
    setOpen(false);
  }

  return (
    <div ref={rootRef} className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={buttonId}
          className="text-xs font-medium text-slate-500"
        >
          {label}
        </label>
      )}

      <button
        ref={buttonRef}
        id={buttonId}
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex w-full items-center justify-between
          rounded-lg border border-slate-200
          bg-white px-3 py-1
          text-sm font-normal
          text-slate-800
          shadow-sm
          transition
          hover:border-slate-300
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500/40
          disabled:cursor-not-allowed
          disabled:opacity-50
          ${className}
        `}
      >
        <span className="flex min-w-0 items-center gap-2">
          {selected?.icon && (
            <span className="flex h-5 w-5 items-center justify-center">
              {selected.icon}
            </span>
          )}

          <span
            className={`
              truncate
              ${!selected ? "text-slate-400" : "text-slate-800"}
            `}
          >
            {selected ? selected.label : placeholder}
          </span>
        </span>

        <ChevronDown
          size={16}
          strokeWidth={2.5}
          className={`
            text-slate-400
            transition-transform
            duration-200
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {open &&
        mounted &&
        createPortal(
          <ul
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: position.width,
            }}
            className="
              z-99999
              max-h-64
              overflow-auto
              rounded-xl
              border
              border-slate-200
              bg-white
              p-1.5
              shadow-xl
            "
          >
            {options.map((option) => {
              const isSelected = String(option.value) === String(value);

              return (
                <li
                  key={String(option.value)}
                  onClick={() => selectOption(option)}
                  className={`
                    flex items-center gap-2
                    rounded-lg
                    px-3 py-2
                    text-sm
                    transition-colors

                    ${
                      isSelected
                        ? "bg-green-50 text-green-600 font-medium"
                        : "text-slate-700"
                    }

                    ${
                      option.disabled
                        ? "cursor-not-allowed opacity-40"
                        : "cursor-pointer hover:bg-slate-100"
                    }
                  `}
                >
                  {option.icon && (
                    <span className="flex h-5 w-5 items-center justify-center">
                      {option.icon}
                    </span>
                  )}

                  <span className="truncate">{option.label}</span>
                </li>
              );
            })}
          </ul>,

          document.body,
        )}
    </div>
  );
}

export default Dropdown;
