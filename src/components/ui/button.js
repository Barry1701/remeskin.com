import React from "react";
import { Link } from "react-router-dom";

const Button = ({ to, children, className = "" }) => {
  const base = "bg-[#2142b2] text-white px-4 py-2 rounded hover:bg-[#242a3d]";
  if (to) {
    return (
      <Link to={to} className={`${base} ${className}`}>
        {children}
      </Link>
    );
  }
  return (
    <button type="button" className={`${base} ${className}`}> 
      {children}
    </button>
  );
};

export default Button;
