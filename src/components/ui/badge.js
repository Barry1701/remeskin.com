import React from "react";

const variantClasses = {
  secondary: "bg-gray-200 text-gray-800",
  outline: "border border-gray-400 text-gray-800",
  default: "bg-blue-500 text-white",
};

export const Badge = ({ variant = "default", children, className = "" }) => (
  <span className={`px-2 py-1 rounded text-sm ${variantClasses[variant]} ${className}`}>
    {children}
  </span>
);

export default Badge;
