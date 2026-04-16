"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { useMemo } from "react";

function HelixSegment({ radius, pitch, turns, tubeRadius }: { radius: number; pitch: number; turns: number; tubeRadius: number }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = turns * 32;
    for (let i = 0; i <= segments; i++) {
      const t = i / segments;
      const angle = t * turns * Math.PI * 2;
      pts.push([Math.cos(angle) * radius, t * turns * pitch, Math.sin(angle) * radius]);
    }
    return pts;
  }, [radius, pitch, turns]);

  return (
    <group>
      {points.slice(0, -1).map((p, i) => {
        const next = points[i + 1];
        const mx = (p[0] + next[0]) / 2;
        const my = (p[1] + next[1]) / 2;
        const mz = (p[2] + next[2]) / 2;
        return (
          <mesh key={i} position={[mx, my, mz]}>
            <sphereGeometry args={[tubeRadius, 6, 6]} />
            <meshStandardMaterial color="#f97316" metalness={0.6} roughness={0.3} />
          </mesh>
        );
      })}
    </group>
  );
}

function ScrewModel() {
  const length = useScrewWizardStore((s) => s.centerlineLengthMm) ?? 2000;
  const diameter = useScrewWizardStore((s) => s.diameterKnown) ?? 300;
  const housingType = useScrewWizardStore((s) => s.housingType);

  const scale = 0.001;
  const l = length * scale;
  const d = diameter * scale;
  const r = d / 2;

  const turns = Math.max(2, Math.round(l / (d * 0.8)));

  return (
    <group rotation={[Math.PI / 2, 0, 0]} position={[0, r + 0.05, 0]}>
      {/* Shaft */}
      <mesh position={[0, l / 2, 0]}>
        <cylinderGeometry args={[r * 0.15, r * 0.15, l, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Helix flights */}
      <HelixSegment radius={r * 0.85} pitch={d * 0.8 * scale} turns={turns} tubeRadius={r * 0.08} />
      {/* Trough */}
      {housingType !== "tubular" ? (
        <mesh position={[0, l / 2, -r * 0.3]}>
          <boxGeometry args={[d * 1.1, l, d * 0.6]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} transparent opacity={0.4} />
        </mesh>
      ) : (
        <mesh position={[0, l / 2, 0]}>
          <cylinderGeometry args={[r * 1.05, r * 1.05, l, 24, 1, true]} />
          <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} transparent opacity={0.3} side={2} />
        </mesh>
      )}
    </group>
  );
}

export function ScrewConveyorPreview() {
  return (
    <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-background/50">
      <Canvas>
        <PerspectiveCamera makeDefault position={[2, 2, 3]} />
        <OrbitControls enablePan enableZoom enableRotate />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <ScrewModel />
        <gridHelper args={[10, 10, "#1e293b", "#0f172a"]} />
      </Canvas>
    </div>
  );
}
