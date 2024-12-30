import React from "react";
import { cn } from "../../lib/utils"; // Utility for conditionally combining class names

interface CheckboxProps {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  icon?: React.ReactNode; // Allows custom icons
  disabled?: boolean
}

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  checked = false,
  onCheckedChange,
  icon,
  disabled = false,
}) => {
    return (
        <label
            className={cn(
            "flex items-center space-x-2 cursor-pointer select-none ",
            className
        )}
        >
            <div
                className={cn(
                "relative h-5 w-5 flex items-center justify-center border rounded-md transition-colors",
                checked ? "bg-primary border-accent text-foreground" : "border-primary-foreground opacity-90",
                )}
            >
                <input
                disabled={disabled}
                type="checkbox"
                checked={checked}
                onChange={(e) => onCheckedChange?.(e.target.checked)}
                className="absolute inset-0 opacity-0 cursor-pointer disabled:cursor-not-allowed"
                />
            {checked && (icon || <DefaultCheckIcon />)}
            
            </div>
        </label>
    );
};

// Default check icon
const DefaultCheckIcon = () => (
    <svg
    className="w-3.5 h-3.5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);



export default Checkbox;
