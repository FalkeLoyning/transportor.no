"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useBeltWizardStore } from "@/stores/useBeltWizardStore";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/* ---- colour helpers ---- */
const FRAME_COLORS: Record<string, string> = {
  aluminium: "#c0c8d4",
  stainless_steel: "#e2e8f0",
  painted_steel: "#3b82f6",
};
const BELT_COLORS: Record<string, string> = {
  pvc: "#1e40af",
  tpu: "#0d9488",
  monolithic_tpu: "#f0fdf4",
  modular_plastic: "#64748b",
  timing_belt: "#0f172a",
  bulk_rubber: "#1c1917",
};
const SURFACE_PATTERNS: Record<string, string> = {
  smooth: "#4a6fa5",
  grip: "#6b8f47",
  structured: "#7c6f4a",
  fda_hygiene: "#e0e7ee",
  antistatic: "#fbbf24",
  flame_retardant: "#ef4444",
};

function Drum({ position, radius, width, color = "#94a3b8" }: { position: [number, number, number]; radius: number; width: number; color?: string }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[radius, radius, width, 24]} />
      <meshStandardMaterial color={color} metalness={0.9} roughness={0.2} />
    </mesh>
  );
}

function Leg({ position, height }: { position: [number, number, number]; height: number }) {
  return (
    <mesh position={[position[0], height / 2, position[2]]}>
      <boxGeometry args={[0.035, height, 0.035]} />
      <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.4} />
    </mesh>
  );
}

function Foot({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[0.08, 0.008, 0.08]} />
      <meshStandardMaterial color="#374151" metalness={0.6} roughness={0.5} />
    </mesh>
  );
}

function SideRail({ position, length, angle }: { position: [number, number, number]; length: number; angle: number }) {
  return (
    <mesh position={position} rotation={[0, 0, angle]}>
      <boxGeometry args={[length, 0.05, 0.005]} />
      <meshStandardMaterial color="#64748b" metalness={0.7} roughness={0.3} transparent opacity={0.6} />
    </mesh>
  );
}

function IdlerRoller({ position, width }: { position: [number, number, number]; width: number }) {
  return (
    <mesh position={position} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.02, 0.02, width, 12]} />
      <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
    </mesh>
  );
}

function Cleat({ position, width, angle }: { position: [number, number, number]; width: number; angle: number }) {
  return (
    <mesh position={position} rotation={[0, 0, angle]}>
      <boxGeometry args={[0.008, 0.03, width * 0.9]} />
      <meshStandardMaterial color="#1e3a5f" metalness={0.3} roughness={0.7} />
    </mesh>
  );
}

function Sidewall({ position, length, height, angle, side }: { position: [number, number, number]; length: number; height: number; angle: number; side: number }) {
  return (
    <mesh position={[position[0], position[1] + height / 2, position[2] + side * 0.002]} rotation={[0, 0, angle]}>
      <boxGeometry args={[length, height, 0.004]} />
      <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.4} transparent opacity={0.5} />
    </mesh>
  );
}

function MotorBox({ position, side, above }: { position: [number, number, number]; side: "left" | "right" | ""; above: "above" | "below" | "" }) {
  const zOff = side === "right" ? -0.15 : 0.15;
  const yOff = above === "below" ? -0.12 : 0.08;
  return (
    <group position={[position[0], position[1] + yOff, position[2] + zOff]}>
      {/* Motor body */}
      <mesh>
        <cylinderGeometry args={[0.045, 0.045, 0.12, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Fan cover */}
      <mesh position={[0, -0.07, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
        <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Cover({ position, length, width, angle }: { position: [number, number, number]; length: number; width: number; angle: number }) {
  return (
    <mesh position={[position[0], position[1] + 0.04, position[2]]} rotation={[0, 0, angle]}>
      <boxGeometry args={[length, 0.003, width * 1.05]} />
      <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.3} transparent opacity={0.3} />
    </mesh>
  );
}

function DrumMotor({ position, width }: { position: [number, number, number]; width: number }) {
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, width, 24]} />
        <meshStandardMaterial color="#1f2937" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* end cap */}
      <mesh position={[0, 0, width / 2 + 0.01]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.02, 12]} />
        <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

function BeltModel() {
  const s = useBeltWizardStore();

  const length = s.overallLengthMm ?? 3000;
  const width = s.beltWidthMm ?? 600;
  const infeed = s.infeedHeightMm ?? 800;
  const outfeed = s.outfeedHeightMm ?? 800;

  const sc = 0.001;
  const l = length * sc;
  const w = width * sc;
  const hIn = infeed * sc;
  const hOut = outfeed * sc;

  const angle = useMemo(() => Math.atan2(hOut - hIn, l), [hIn, hOut, l]);
  const cx = l / 2;
  const cy = (hIn + hOut) / 2;

  const frameColor = FRAME_COLORS[s.frameMaterial] ?? "#334155";
  const beltColor = s.beltSurface ? (SURFACE_PATTERNS[s.beltSurface] ?? "#1e3a5f") : (BELT_COLORS[s.beltFamily] ?? "#1e3a5f");

  const isDrumMotor = s.drivePosition === "drum_motor";
  const headDrumRadius = isDrumMotor ? 0.07 : 0.06;

  /* Idler positions */
  const idlerCount = s.supportType === "carrying_idlers" || s.supportType === "roller_support" ? Math.max(2, Math.floor(l / 0.4)) : 0;

  /* Cleat positions */
  const cleatCount = s.cleats ? Math.max(2, Math.floor(l / 0.15)) : 0;

  return (
    <group position={[-cx, 0, 0]}>
      {/* ---- FRAME ---- */}
      {/* Main frame beams (always shown) */}
      <mesh position={[cx, cy - 0.015, w / 2 + 0.015]} rotation={[0, 0, angle]}>
        <boxGeometry args={[l, 0.05, 0.025]} />
        <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[cx, cy - 0.015, -(w / 2 + 0.015)]} rotation={[0, 0, angle]}>
        <boxGeometry args={[l, 0.05, 0.025]} />
        <meshStandardMaterial color={frameColor} metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Slide bed (default support) */}
      {s.supportType !== "carrying_idlers" && s.supportType !== "roller_support" && (
        <mesh position={[cx, cy - 0.005, 0]} rotation={[0, 0, angle]}>
          <boxGeometry args={[l - 0.04, 0.008, w]} />
          <meshStandardMaterial color={frameColor} metalness={0.7} roughness={0.4} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Carrying idlers */}
      {idlerCount > 0 && Array.from({ length: idlerCount }).map((_, i) => {
        const t = (i + 1) / (idlerCount + 1);
        const x = t * l;
        const y = hIn + (hOut - hIn) * t;
        return <IdlerRoller key={`idler-${i}`} position={[x, y - 0.01, 0]} width={w + 0.01} />;
      })}

      {/* ---- BELT SURFACE ---- */}
      <mesh position={[cx, cy + 0.025, 0]} rotation={[0, 0, angle]}>
        <boxGeometry args={[l - 0.02, 0.012, w]} />
        <meshStandardMaterial color={beltColor} metalness={0.2} roughness={0.6} />
      </mesh>

      {/* Return belt (bottom) */}
      <mesh position={[cx, cy - 0.04, 0]} rotation={[0, 0, angle]}>
        <boxGeometry args={[l - 0.06, 0.006, w * 0.95]} />
        <meshStandardMaterial color={beltColor} metalness={0.15} roughness={0.7} transparent opacity={0.5} />
      </mesh>

      {/* ---- CLEATS ---- */}
      {cleatCount > 0 && Array.from({ length: cleatCount }).map((_, i) => {
        const t = (i + 1) / (cleatCount + 1);
        const x = t * l;
        const y = hIn + (hOut - hIn) * t + 0.045;
        return <Cleat key={`cleat-${i}`} position={[x, y, 0]} width={w} angle={angle} />;
      })}

      {/* ---- SIDEWALLS ---- */}
      {s.sidewalls && (
        <>
          <Sidewall position={[cx, cy + 0.025, w / 2]} length={l - 0.04} height={0.04} angle={angle} side={1} />
          <Sidewall position={[cx, cy + 0.025, -w / 2]} length={l - 0.04} height={0.04} angle={angle} side={-1} />
        </>
      )}

      {/* ---- DRUMS ---- */}
      {isDrumMotor ? (
        <DrumMotor position={[l, hOut, 0]} width={w + 0.02} />
      ) : (
        <Drum position={[l, hOut, 0]} radius={0.06} width={w + 0.02} />
      )}
      <Drum position={[0, hIn, 0]} radius={0.05} width={w + 0.02} />

      {/* ---- LEGS / STANDS ---- */}
      {s.stands && (
        <>
          <Leg position={[0.12, 0, w / 2 + 0.02]} height={hIn - 0.02} />
          <Leg position={[0.12, 0, -(w / 2 + 0.02)]} height={hIn - 0.02} />
          <Leg position={[l - 0.12, 0, w / 2 + 0.02]} height={hOut - 0.02} />
          <Leg position={[l - 0.12, 0, -(w / 2 + 0.02)]} height={hOut - 0.02} />
          <Foot position={[0.12, 0, w / 2 + 0.02]} />
          <Foot position={[0.12, 0, -(w / 2 + 0.02)]} />
          <Foot position={[l - 0.12, 0, w / 2 + 0.02]} />
          <Foot position={[l - 0.12, 0, -(w / 2 + 0.02)]} />
        </>
      )}

      {/* ---- SIDE RAILS ---- */}
      {s.sideRails && (
        <>
          <SideRail position={[cx, cy + 0.06, w / 2 + 0.005]} length={l - 0.1} angle={angle} />
          <SideRail position={[cx, cy + 0.06, -(w / 2 + 0.005)]} length={l - 0.1} angle={angle} />
        </>
      )}

      {/* ---- COVERS ---- */}
      {s.covers && (
        <Cover position={[cx, cy + 0.05, 0]} length={l - 0.06} width={w} angle={angle} />
      )}

      {/* ---- MOTOR ---- */}
      {s.drivePosition && s.drivePosition !== "drum_motor" && (
        <MotorBox
          position={[
            s.drivePosition === "center_drive" ? l / 2 : s.drivePosition === "head_infeed" ? 0.05 : l - 0.05,
            s.drivePosition === "center_drive" ? (hIn + hOut) / 2 : s.drivePosition === "head_infeed" ? hIn : hOut,
            0,
          ]}
          side={s.motorSide || "right"}
          above={s.aboveBelow || "below"}
        />
      )}

      {/* ---- GUIDE PROFILES (under belt) ---- */}
      {s.guideProfiles && (
        <>
          <mesh position={[cx, cy - 0.01, w * 0.3]} rotation={[0, 0, angle]}>
            <boxGeometry args={[l - 0.1, 0.015, 0.008]} />
            <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh position={[cx, cy - 0.01, -w * 0.3]} rotation={[0, 0, angle]}>
            <boxGeometry args={[l - 0.1, 0.015, 0.008]} />
            <meshStandardMaterial color="#6b7280" metalness={0.5} roughness={0.5} />
          </mesh>
        </>
      )}
    </group>
  );
}

export function BeltConveyorPreview() {
  return (
    <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-background/50">
      <Canvas>
        <PerspectiveCamera makeDefault position={[3, 2, 3]} />
        <OrbitControls enablePan enableZoom enableRotate />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} />
        <BeltModel />
        <gridHelper args={[10, 10, "#1e293b", "#0f172a"]} />
      </Canvas>
    </div>
  );
}
