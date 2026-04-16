"use client";
import { WizardShell } from "@/components/wizard/WizardShell";
import { ApplicationStep } from "./steps/ApplicationStep";
import { MaterialStep } from "./steps/MaterialStep";
import { CapacityStep } from "./steps/CapacityStep";
import { GeometryStep } from "./steps/GeometryStep";
import { BeltStep } from "./steps/BeltStep";
import { FrameStep } from "./steps/FrameStep";
import { DriveStep } from "./steps/DriveStep";
import { SafetyStep } from "./steps/SafetyStep";
import { ReviewStep } from "./steps/ReviewStep";
import dynamic from "next/dynamic";

const BeltConveyorPreview = dynamic(
  () => import("@/components/3d/BeltConveyorPreview").then((m) => m.BeltConveyorPreview),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[300px] rounded-xl bg-surface animate-pulse" /> }
);

const steps = [
  { id: "application", title: "Applikasjon", description: "Type og bransje" },
  { id: "material", title: "Materiale", description: "Produkt/bulkdata" },
  { id: "capacity", title: "Kapasitet", description: "Ytelse og drift" },
  { id: "geometry", title: "Geometri", description: "Mål og layout" },
  { id: "belt", title: "Belte", description: "Type og overflate" },
  { id: "frame", title: "Ramme", description: "Konstruksjon" },
  { id: "drive", title: "Drivverk", description: "Motor og styring" },
  { id: "safety", title: "Sikkerhet", description: "Sertifisering" },
  { id: "review", title: "Oppsummering", description: "Send forespørsel" },
];

const stepComponents = [
  ApplicationStep, MaterialStep, CapacityStep, GeometryStep,
  BeltStep, FrameStep, DriveStep, SafetyStep, ReviewStep,
];

export default function BeltConveyorPage() {
  return (
    <WizardShell
      title="Båndtransportør – Forespørsel"
      steps={steps}
      preview={<BeltConveyorPreview />}
    >
      {(stepIndex) => {
        const StepComponent = stepComponents[stepIndex];
        return <StepComponent />;
      }}
    </WizardShell>
  );
}
