import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: ReactNode;
  /** Delay before the reveal starts, in milliseconds. */
  delay?: number;
  /** Distance travelled on the Y axis, in pixels. */
  distance?: number;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'p' | 'span';
}

/**
 * Entrance animation driven by inline styles rather than CSS keyframes.
 *
 * Content is rendered fully visible by default and only animates once the
 * component has mounted, so a stalled or unsupported animation can never leave
 * text invisible. Respects `prefers-reduced-motion`.
 */
export function Reveal({ children, delay = 0, distance = 16, className, as = 'div' }: RevealProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const frame = window.requestAnimationFrame(() => setIsVisible(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const style: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : `translateY(${distance}px)`,
    transition: `opacity 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 600ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: isVisible ? undefined : 'opacity, transform',
  };

  const Tag = as;

  return (
    <Tag className={cn(className)} style={style}>
      {children}
    </Tag>
  );
}
