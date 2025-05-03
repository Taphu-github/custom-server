"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type SwitchState = "yes" | "" | "no";

interface ThreeStateSwitchProps {
  id?: string;
  label?: string;
  defaultValue?: SwitchState;
  onValueChange?: (value: SwitchState) => void;
  className?: string;
}

export function ThreeStateSwitch({
  id,
  label,
  defaultValue = "",
  onValueChange,
  className,
}: ThreeStateSwitchProps) {
  const [state, setState] = useState<SwitchState>(defaultValue);

  const handleClick = () => {
    const nextState: SwitchState =
      state === "yes" ? "" : state === "" ? "no" : "yes";

    setState(nextState);
    onValueChange?.(nextState);
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}

      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={state === "yes"}
        data-state={state}
        onClick={handleClick}
        className={cn(
          "relative inline-flex items-center h-3 w-6 cursor-pointer rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          state === "yes" && "bg-primary",
          state === "" && "bg-gray-400",
          state === "no" && "bg-red-600"
        )}
      >
        <span className="sr-only">{state}</span>
        <span
          className={cn(
            "pointer-events-none block h-2 w-2 rounded-full bg-background shadow-lg ring-0 transition-transform",
            state === "yes" && "translate-x-3",
            state === "" && "translate-x-2",
            state === "no" && "translate-x-1"
          )}
        />
      </button>
    </div>
  );
}
