// import Link from "next/link";
import React from "react";
import { Link } from "react-router-dom";

function LinkButton({
  url,
  children,
  className,
}: {
  url: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      to={url}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 ${className}`}
    >
      {children}
    </Link>
  );
}

export default LinkButton;
