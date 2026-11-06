import { Logo } from '@/components/common/Logo';
import { Reveal } from '@/components/common/Reveal';
import { CapabilityCard } from './CapabilityCard';
import { NeuralBackground } from './NeuralBackground';

const capabilities = [
  {
    title: 'Intelligent AI Assistant',
    description: 'Context-aware conversations that reason across your data and workflows.',
    accent: 'teal' as const,
    icon: <AssistantIcon />,
  },
  {
    title: 'Advanced Image Intelligence',
    description: 'Vision models for detection, quality grading and content moderation.',
    accent: 'violet' as const,
    icon: <VisionIcon />,
  },
  {
    title: 'Smart Agriculture AI',
    description: 'Crop health, yield and price forecasting built for real farms.',
    accent: 'mixed' as const,
    icon: <AgricultureIcon />,
  },
];

export function BrandPanel() {
  return (
    <aside
      className="relative hidden overflow-hidden lg:flex lg:w-[52%] xl:w-[55%]"
      aria-label="About KALIKA AI"
    >
      <NeuralBackground />

      <div className="relative z-10 flex w-full flex-col justify-between px-10 py-10 xl:px-16 xl:py-14">
        {/* Brand */}
        <Reveal distance={0}>
          <Logo size={44} withWordmark wordmarkClassName="text-[19px]" />
        </Reveal>

        {/* Headline */}
        <div className="max-w-xl">
          <Reveal className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-400/25 bg-teal-400/[0.07] px-3.5 py-1.5 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-teal-400" />
            </span>
            <span className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-teal-200">
              AI Platform · Live
            </span>
          </Reveal>

          <Reveal
            as="div"
            delay={100}
            className="text-[2.6rem] font-bold leading-[1.08] tracking-tight text-white xl:text-[3.4rem]"
          >
            <h1>
              Intelligence
              <br />
              <span className="text-gradient">Beyond Limits.</span>
            </h1>
          </Reveal>

          <Reveal
            as="p"
            delay={200}
            className="mt-5 max-w-md text-[15.5px] leading-relaxed text-slate-400 xl:text-base"
          >
            One AI Platform. Multiple Possibilities.
          </Reveal>

          <Reveal delay={300} className="mt-10 grid gap-3 sm:grid-cols-1 xl:max-w-lg">
            {capabilities.map((capability) => (
              <CapabilityCard key={capability.title} {...capability} />
            ))}
          </Reveal>
        </div>

        {/* Footer */}
        <Reveal delay={500} className="flex items-center gap-4 text-[12px] text-slate-500">
          <span className="flex items-center gap-1.5">
            <ShieldIcon />
            Enterprise-grade security
          </span>
          <span className="h-3 w-px bg-white/10" />
          <span>Trusted by teams across 12+ countries</span>
        </Reveal>
      </div>
    </aside>
  );
}

function AssistantIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 0 1-4-.84L3 21l1.2-3.6A7.6 7.6 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
      />
    </svg>
  );
}

function VisionIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.04 12.32a1 1 0 0 1 0-.64C3.42 7.51 7.36 4.5 12 4.5s8.58 3.01 9.96 7.18a1 1 0 0 1 0 .64C20.58 16.49 16.64 19.5 12 19.5s-8.58-3.01-9.96-7.18Z"
      />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function AgricultureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V11" />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 11c0-3.5 2.5-6 6-6 0 3.5-2.5 6-6 6Zm0 0c0-3.5-2.5-6-6-6 0 3.5 2.5 6 6 6Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 21h14" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 3 5 6v5.5c0 4.2 2.9 8.1 7 9.5 4.1-1.4 7-5.3 7-9.5V6l-7-3Z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="m9.5 12 1.8 1.8 3.4-3.6" />
    </svg>
  );
}
