import React from "react";

export const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow p-4 ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className = "" }) => (
  <div className={`mb-2 font-semibold flex items-center gap-2 ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = "" }) => (
  <div className={`mb-2 ${className}`}>{children}</div>
);

export const CardFooter = ({ children, className = "" }) => (
  <div className={`mt-4 flex justify-between items-center ${className}`}>{children}</div>
);

export default Card;
