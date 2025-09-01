
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 108 108"
      className={cn("text-primary", className)}
      {...props}
    >
      <circle cx="54" cy="54" r="54" fill="currentColor" />
      <g fill="white">
        <text
          x="54"
          y="62"
          fontFamily="Lexend, sans-serif"
          fontSize="22"
          fontWeight="bold"
          textAnchor="middle"
          fill="white"
        >
          AIMHIGH
        </text>
        <path d="M44 42 L64 26 M44 26 L64 42" stroke="white" strokeWidth="3" strokeLinecap="round" transform="rotate(-15, 54, 34)" />
        <rect x="29" y="72" width="10" height="15" rx="2" />
        <rect x="49" y="72" width="10" height="15" rx="2" />
        <rect x="69" y="72" width="10" height="15" rx="2" />
      </g>
    </svg>
  );
}
