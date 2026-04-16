"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { useMemo } from "react";

function BeltModel() {
  const length = useBeltWizardStore((s) => s.overallLengthMm) ?? 3000;
  const width = useBeltWizardStore((s) => s.beltWidthMm) ?? 600;
  const infeed = useBeltWizardStore((s) => s.infeedHeightMm) ?? 800;
  const outfeed = useBeltWizardStore((s) => s.outfeedHeightMm) ?? 800;

  const scale = 0.001;
  const l = length * scale;
  const w = width * scale;
  const hIn = infeed * scale;
  const hOut = outfeed * scale;

  const angle = useMemo(() => Math.atan2(hOut - hIn, l), [hIn, hOut, l]);

  return (
    <group rotation={[0, 0, 0]}>
      {/* Frame */}
      <mesh position={[l / 2, (hIn + hOut) / 2, 0]} rotation={[0, 0, angle]}>
        <boxGeometry args={[l, 0.06, w + 0.04]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Belt surface */}
      <mesh position={[l / 2, (hIn + hOut) / 2 + 0.04, 0]} rotation={[0, 0, angle]}>
        <boxGeometry args={[l - 0.02, 0.015, w]} />
        <meshStandardMaterial color="#1e3a5f" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* Head drum */}
      <mesh position={[l, hOut, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.06, 0.06, w + 0.02, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Tail drum */}
      <mesh position={[0, hIn, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.05, w + 0.02, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Legs */}
      <mesh position={[0.15, hIn / 2, w / 2 + 0.02]}>
        <boxGeometry args={[0.04, hIn, 0.04]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0.15, hIn / 2, -(w / 2 + 0.02)]}>
        <boxGeometry args={[0.04, hIn, 0.04]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[l - 0.15, hOut / 2, w / 2 + 0.02]}>
        <boxGeometry args={[0.04, hOut, 0.04]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[l - 0.15, hOut / 2, -(w / 2 + 0.02)]}>
        <boxGeometry args={[0.04, hOut, 0.04]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

export function BeltConveyorPreview() {
  return (
    <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-background/50">
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 2, 3]} />
        <OrbitControls enablePan enableZoom enableRotate />
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <BeltModel />
        <gridHelper args={[10, 10, "#1e293b", "#0f172a"]} />
      </Canvas>
    </div>
  );
}
