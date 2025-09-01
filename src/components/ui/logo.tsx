import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn("text-primary", className)}
      {...props}
    >
      <circle cx="50" cy="50" r="48" fill="currentColor" />
      <g fill="white">
        <text
          x="50"
          y="58"
          fontFamily="Lexend, sans-serif"
          fontSize="22"
          fontWeight="bold"
          textAnchor="middle"
          fill="white"
        >
          AIMHIGH
        </text>
        <path d="M40 38 L60 22 M40 22 L60 38" stroke="white" strokeWidth="3" strokeLinecap="round" transform="rotate(-15, 50, 30)" />
        <rect x="25" y="68" width="10" height="15" rx="2" />
        <rect x="45" y="68" width="10" height="15" rx="2" />
        <rect x="65" y="68" width="10" height="15" rx="2" />
      </g>
    </svg>
  );
}
