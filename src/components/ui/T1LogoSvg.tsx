import React from "react";

interface T1LogoSvgProps {
  className?: string;
  fill?: string;
  label?: string;
}

export function T1LogoSvg({
  className = "h-6 w-auto",
  fill = "#E4002B",
  label = "T1 Esports Official Crest",
}: T1LogoSvgProps) {
  return (
    <svg
      viewBox="0 0 300 118.62"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      className={className}
      fill={fill}
    >
      <path d="m96.307 69.753c8.3784 11.447 18.881 12.037 18.881 12.037h18.291l8.2604-12.037z" />
      <path d="m73.414 51.698c8.3784 11.447 18.881 12.037 18.881 12.037h53.575l8.2604-12.037z" />
      <path d="m50.639 33.643c8.3784 11.447 18.881 12.037 18.881 12.037h88.741l8.2604-12.037z" />
      <path d="m8.9828 3.5518c16.875 22.893 37.762 24.073 37.762 24.073h131.22l-43.544 63.369c-8.7324 12.627 12.627 24.073 12.627 24.073l60.183-87.442s20.887-1.1801 37.762-24.073z" />
      <path d="m291.02 3.5518h-29.266c-16.875 22.893-37.762 24.073-37.762 24.073h21.241l-43.544 63.369c-8.7324 12.627 12.627 24.073 12.627 24.073z" />
    </svg>
  );
}
