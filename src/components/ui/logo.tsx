
import { cn } from "@/lib/utils";

export function Logo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 108 108"
      className={cn("text-primary", className)}
      {...props}
    >
      <g>
        <circle cx="54" cy="54" r="54" fill="currentColor" />
        <circle cx="54" cy="54" r="50" fill="none" stroke="white" strokeWidth="4" />

        <text
          x="54"
          y="60"
          fontFamily="Lexend, sans-serif"
          fontSize="20"
          fontWeight="bold"
          textAnchor="middle"
          fill="white"
        >
          AIMHIGH
        </text>
        <text
          x="54"
          y="78"
          fontFamily="Lexend, sans-serif"
          fontSize="14"
          fontWeight="normal"
          textAnchor="middle"
          fill="white"
          letterSpacing="0.05em"
        >
          FUNITURES
        </text>
        
        {/* Hammers Icon */}
        <g transform="translate(42, 22) scale(1.2)">
          <path d="M15.2 2.8L12.4 0 9.2 3.2l2.8 2.8L15.2 2.8zM4.8 17.2L2 20l3.2 3.2 2.8-2.8-2.8-2.8z" fill="white" />
          <path d="M12.4 14.8L9.6 12l-6.4 6.4 2.8 2.8 6.4-6.4zM9.2 8.8L6.4 6 0 12.4l2.8 2.8L9.2 8.8z" fill="white"/>
        </g>
        
        {/* Bottom rectangles */}
        <rect x="29" y="85" width="12" height="15" rx="1" fill="white"/>
        <rect x="48" y="85" width="12" height="15" rx="1" fill="white"/>
        <rect x="67" y="85" width="12" height="15" rx="1" fill="white"/>
      </g>
    </svg>
  );
}
