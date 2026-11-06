import { cn } from '@/lib/cn';

interface LogoProps {
  size?: number;
  className?: string;
  /** Show the "KALIKA AI" wordmark next to the mark. */
  withWordmark?: boolean;
  wordmarkClassName?: string;
}

/**
 * KALIKA AI brand mark: a hexagonal neural node with a teal→violet gradient.
 * Rendered inline as SVG so it stays crisp at any size and needs no request.
 */
export function Logo({ size = 40, className, withWordmark = false, wordmarkClassName }: LogoProps) {
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      role="img"
      aria-label="KALIKA AI"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="kalika-mark-gradient" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2DD4BF" />
          <stop offset="0.55" stopColor="#14B8A6" />
          <stop offset="1" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="kalika-mark-fill" x1="10" y1="8" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2DD4BF" stopOpacity="0.22" />
          <stop offset="1" stopColor="#8B5CF6" stopOpacity="0.22" />
        </linearGradient>
      </defs>

      {/* Hexagon shell */}
      <path
        d="M24 3.5 41.5 13.5v21L24 44.5 6.5 34.5v-21L24 3.5Z"
        fill="url(#kalika-mark-fill)"
        stroke="url(#kalika-mark-gradient)"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />

      {/* Neural connections */}
      <g stroke="url(#kalika-mark-gradient)" strokeWidth="1.4" strokeLinecap="round" opacity="0.85">
        <path d="M17 17.5 24 24l7-6.5" />
        <path d="M24 24v9.5" />
        <path d="M17 17.5 24 33.5l7-16" />
      </g>

      {/* Nodes */}
      <circle cx="17" cy="17.5" r="2.6" fill="#2DD4BF" />
      <circle cx="31" cy="17.5" r="2.6" fill="#8B5CF6" />
      <circle cx="24" cy="24" r="3.1" fill="#5EEAD4" />
      <circle cx="24" cy="33.5" r="2.2" fill="#A78BFA" />
    </svg>
  );

  if (!withWordmark) {
    return <span className={className}>{mark}</span>;
  }

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      {mark}
      <span
        className={cn(
          'text-[17px] font-bold tracking-[0.16em] text-white',
          wordmarkClassName,
        )}
      >
        KALIKA <span className="text-gradient">AI</span>
      </span>
    </span>
  );
}
