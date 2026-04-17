"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useScrewWizardStore } from "@/stores/useScrewWizardStore";
import { useMemo } from "react";

/* ---- colour maps ---- */
const FLIGHT_COLORS: Record<string, string> = {
  single_flight: "#f97316",
  ribbon: "#22d3ee",
  cut: "#a855f7",
  cut_folded: "#ec4899",
  paddles: "#84cc16",
};

/* ---- Helix using tube-like spheres ---- */
function HelixFlight({ radius, length, turns, tubeRadius, color, ribbon }: {
  radius: number; length: number; turns: number; tubeRadius: number; color: string; ribbon?: boolean;
}) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segs = turns * 40;
    for (let i = 0; i <= segs; i++) {
      const t = i / segs;
      const a = t * turns * Math.PI * 2;
      pts.push([Math.cos(a) * radius, t * length, Math.sin(a) * radius]);
    }
    return pts;
  }, [radius, length, turns]);

  return (
    <group>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[ribbon ? tubeRadius * 0.6 : tubeRadius, 6, 6]} />
          <meshStandardMaterial color={color} metalness={0.6} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ---- Paddle ---- */
function Paddle({ position, radius, angle }: { position: [number, number, number]; radius: number; angle: number }) {
  return (
    <mesh position={position} rotation={[0, angle, Math.PI / 6]}>
      <boxGeometry args={[radius * 0.7, 0.008, radius * 0.4]} />
      <meshStandardMaterial color="#84cc16" metalness={0.5} roughness={0.4} />
    </mesh>
  );
}

/* ---- Housing shapes ---- */
function UTrough({ length, radius, color, opacity }: { length: number; radius: number; color: string; opacity: number }) {
  return (
    <group>
      <mesh position={[0, length / 2, 0]}>
        <cylinderGeometry args={[radius * 1.08, radius * 1.08, length, 24, 1, true, Math.PI, Math.PI]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} transparent opacity={opacity} side={2} />
      </mesh>
      <mesh position={[-(radius * 1.08), length / 2, 0]}>
        <boxGeometry args={[0.006, length, radius * 0.8]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} transparent opacity={opacity} />
      </mesh>
      <mesh position={[radius * 1.08, length / 2, 0]}>
        <boxGeometry args={[0.006, length, radius * 0.8]} />
        <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} transparent opacity={opacity} />
      </mesh>
    </group>
  );
}

function TubularHousing({ length, radius, color, opacity }: { length: number; radius: number; color: string; opacity: number }) {
  return (
    <mesh position={[0, length / 2, 0]}>
      <cylinderGeometry args={[radius * 1.08, radius * 1.08, length, 24, 1, true]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.3} transparent opacity={opacity} side={2} />
    </mesh>
  );
}

/* ---- Inlet/Outlet port ---- */
function Port({ position, radius, isInlet }: { position: [number, number, number]; radius: number; isInlet: boolean }) {
  const size = radius * 0.6;
  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[size, isInlet ? size * 1.2 : size, 0.04, 12]} />
        <meshStandardMaterial color={isInlet ? "#22c55e" : "#ef4444"} metalness={0.5} roughness={0.4} transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, isInlet ? 0.02 : -0.02]}>
        <torusGeometry args={[size * 1.1, 0.004, 8, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

/* ---- End bearing ---- */
function EndBearing({ position, radius, sizeMm }: { position: [number, number, number]; radius: number; sizeMm?: number }) {
  const bR = sizeMm ? (sizeMm * 0.001) / 2 : radius * 0.25;
  return (
    <mesh position={position}>
      <cylinderGeometry args={[bR, bR, 0.03, 16]} />
      <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.2} />
    </mesh>
  );
}

/* ---- Drive unit ---- */
function DriveUnit({ position, coupling }: { position: [number, number, number]; coupling: string }) {
  return (
    <group position={position}>
      {/* Gearbox */}
      <mesh position={[0.08, 0, 0]}>
        <boxGeometry args={[0.08, 0.08, 0.08]} />
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Motor */}
      <mesh position={[0.16, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
        <meshStandardMaterial color="#1f2937" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Fan cover */}
      <mesh position={[0.22, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.045, 0.045, 0.02, 12]} />
        <meshStandardMaterial color="#4b5563" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Coupling indicator */}
      {coupling === "spline" && (
        <mesh position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.03, 12]} />
          <meshStandardMaterial color="#60a5fa" metalness={0.7} roughness={0.3} />
        </mesh>
      )}
      {coupling === "keyway" && (
        <mesh position={[0.04, 0.018, 0]}>
          <boxGeometry args={[0.03, 0.008, 0.01]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} />
        </mesh>
      )}
      {coupling === "clamp_ring" && (
        <mesh position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.022, 0.004, 8, 16]} />
          <meshStandardMaterial color="#f97316" metalness={0.7} roughness={0.3} />
        </mesh>
      )}
    </group>
  );
}

/* ================================================================ */
function ScrewModel() {
  const s = useScrewWizardStore();

  const lengthMm = s.screwLengthMm ?? 2000;
  const diameterMm = s.screwOuterDiameterMm ?? 300;
  const shaftDiaMm = s.shaftDiameterMm;

  const sc = 0.001;
  const l = lengthMm * sc;
  const d = diameterMm * sc;
  const r = d / 2;
  const shaftR = shaftDiaMm ? (shaftDiaMm * sc) / 2 : r * 0.15;

  const turns = Math.max(2, Math.round(l / (d * 0.8)));

  const housingColor = "#334155";
  const flightColor = FLIGHT_COLORS[s.flightType] ?? "#f97316";
  const isShaftless = s.shaftType === "shaftless";
  const isPaddles = s.flightType === "paddles";

  const hasDrive = s.driveCoupling && s.driveCoupling !== "unknown";
  const driveAtDischarge = s.driveEnd !== "inlet";

  return (
    <group position={[0, r + 0.08, 0]}>
      <group rotation={[Math.PI / 2, 0, 0]}>

        {/* ---- SHAFT ---- */}
        {!isShaftless && s.shaftType && (
          <mesh position={[0, l / 2, 0]}>
            <cylinderGeometry args={[shaftR, shaftR, l + 0.06, 16]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
        )}

        {/* ---- FLIGHTS ---- */}
        {s.flightType && !isPaddles && (
          <HelixFlight
            radius={isShaftless ? r * 0.92 : r * 0.85}
            length={l}
            turns={turns * (s.pitchType === "short_2_3D" ? 1.3 : s.pitchType === "half_1_2D" ? 1.6 : s.pitchType === "variable" ? 1.1 : 1)}
            tubeRadius={isShaftless ? r * 0.12 : r * 0.08}
            color={flightColor}
            ribbon={s.flightType === "ribbon"}
          />
        )}

        {/* ---- PADDLES ---- */}
        {isPaddles && Array.from({ length: Math.floor(turns * 4) }).map((_, i) => {
          const t = (i + 0.5) / (turns * 4);
          const a = t * turns * Math.PI * 2;
          return (
            <Paddle
              key={i}
              position={[Math.cos(a) * r * 0.5, t * l, Math.sin(a) * r * 0.5]}
              radius={r}
              angle={a}
            />
          );
        })}

        {/* ---- HOUSING ---- */}
        {s.housingStyle === "sealed" && (
          <TubularHousing length={l} radius={r} color={housingColor} opacity={0.25} />
        )}
        {s.housingStyle === "trough" && (
          <UTrough length={l} radius={r} color={housingColor} opacity={0.25} />
        )}
        {/* Default trough when nothing selected but screw shape is visible */}
        {(!s.housingStyle || s.housingStyle === "unknown") && (s.shaftType || s.flightType) && (
          <UTrough length={l} radius={r} color={housingColor} opacity={0.15} />
        )}

        {/* ---- END BEARINGS ---- */}
        {(s.bearingSizeMm || s.shaftType === "shafted") && (
          <>
            <EndBearing position={[0, -0.02, 0]} radius={r} sizeMm={s.bearingSizeMm} />
            <EndBearing position={[0, l + 0.02, 0]} radius={r} sizeMm={s.bearingSizeMm} />
          </>
        )}

        {/* ---- INLET / OUTLET ---- */}
        {(s.shaftType || s.flightType) && (
          <>
            <Port position={[0, l * 0.1, r * 1.1]} radius={r} isInlet />
            <Port position={[0, l * 0.9, -r * 1.1]} radius={r} isInlet={false} />
          </>
        )}

        {/* ---- DRIVE UNIT ---- */}
        {hasDrive && (
          <DriveUnit
            position={[0, driveAtDischarge ? l + 0.04 : -0.04, 0]}
            coupling={s.driveCoupling}
          />
        )}
      </group>
    </group>
  );
}

export function ScrewConveyorPreview() {
  return (
    <div className="w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-background/50">
      <Canvas>
        <PerspectiveCamera makeDefault position={[2, 2, 3]} />
        <OrbitControls enablePan enableZoom enableRotate />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-3, 2, -2]} intensity={0.3} />
        <ScrewModel />
        <gridHelper args={[10, 10, "#1e293b", "#0f172a"]} />
      </Canvas>
    </div>
  );
}
