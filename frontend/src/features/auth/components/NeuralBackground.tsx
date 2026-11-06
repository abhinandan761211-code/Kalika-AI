import { useMemo } from 'react';

interface Node {
  x: number;
  y: number;
  r: number;
  delay: number;
  duration: number;
}

interface Edge {
  from: number;
  to: number;
  delay: number;
}

/**
 * Deterministic pseudo-random generator so the network looks identical on
 * every render (no layout jitter) while still feeling organic.
 */
function seeded(seed: number) {
  let value = seed;
  return () => {
    value = (value * 16807) % 2147483647;
    return (value - 1) / 2147483646;
  };
}

function buildGraph() {
  const rand = seeded(20240517);
  const nodes: Node[] = [];
  const columns = 6;
  const rows = 5;

  for (let c = 0; c < columns; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      const jitterX = (rand() - 0.5) * 9;
      const jitterY = (rand() - 0.5) * 9;
      nodes.push({
        x: 8 + (c * 84) / (columns - 1) + jitterX,
        y: 10 + (r * 80) / (rows - 1) + jitterY,
        r: 0.9 + rand() * 1.5,
        delay: rand() * 6,
        duration: 4 + rand() * 5,
      });
    }
  }

  const edges: Edge[] = [];
  for (let c = 0; c < columns - 1; c += 1) {
    for (let r = 0; r < rows; r += 1) {
      const from = c * rows + r;
      // Connect to the node directly ahead plus one diagonal neighbour.
      edges.push({ from, to: (c + 1) * rows + r, delay: rand() * 5 });
      if (r < rows - 1 && rand() > 0.45) {
        edges.push({ from, to: (c + 1) * rows + (r + 1), delay: rand() * 5 });
      }
      if (r > 0 && rand() > 0.6) {
        edges.push({ from, to: (c + 1) * rows + (r - 1), delay: rand() * 5 });
      }
    }
  }

  return { nodes, edges };
}

export function NeuralBackground() {
  const { nodes, edges } = useMemo(buildGraph, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Ambient gradient orbs */}
      <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-teal-500/20 blur-[100px] animate-pulse-slow" />
      <div className="absolute -right-20 top-8 h-80 w-80 rounded-full bg-violet-600/20 blur-[110px] animate-pulse-slow animation-delay-700" />
      <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-400/10 blur-[90px] animate-pulse-slow animation-delay-300" />

      {/* Grid texture */}
      <div className="absolute inset-0 grid-texture opacity-70" />

      {/* Neural network */}
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full opacity-[0.55]"
      >
        <defs>
          <linearGradient id="neural-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2DD4BF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.55" />
          </linearGradient>
          <radialGradient id="neural-node">
            <stop offset="0%" stopColor="#5EEAD4" />
            <stop offset="100%" stopColor="#2DD4BF" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        <g stroke="url(#neural-edge)" strokeWidth="0.18">
          {edges.map((edge, index) => {
            const a = nodes[edge.from];
            const b = nodes[edge.to];
            return (
              <line
                key={`edge-${index}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                opacity="0.5"
                style={{
                  animation: `pulse-slow ${6 + (index % 5)}s ease-in-out ${edge.delay}s infinite`,
                }}
              />
            );
          })}
        </g>

        <g>
          {nodes.map((node, index) => (
            <circle
              key={`node-${index}`}
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="url(#neural-node)"
              style={{
                animation: `pulse-slow ${node.duration}s ease-in-out ${node.delay}s infinite`,
              }}
            />
          ))}
        </g>
      </svg>

      {/* Vignette so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-950/40 via-transparent to-navy-950/80" />
    </div>
  );
}
