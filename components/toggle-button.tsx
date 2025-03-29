"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ToggleProps {
  defaultChecked?: boolean;
  onToggle?: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Toggle({
  defaultChecked = false,
  onToggle,
  label,
  disabled = false,
}: ToggleProps) {
  const [isChecked, setIsChecked] = useState(defaultChecked);

  const handleToggle = () => {
    if (disabled) return;

    const newState = !isChecked;
    setIsChecked(newState);
    onToggle?.(newState);
  };

  return (
    <div className="flex items-center gap-2">
      {label && <span className="text-sm">{label}</span>}
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          "focus-visible:ring-ring relative h-6 w-11 cursor-pointer rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none",
          isChecked ? "bg-black" : "bg-gray-300",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <motion.div
          className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-md"
          animate={{
            x: isChecked ? 20 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>
    </div>
  );
}
