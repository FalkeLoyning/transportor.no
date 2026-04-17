"use client";
import { WizardShell } from "@/components/wizard/WizardShell";
import { PurposeStep } from "./steps/PurposeStep";
import { MaterialStep } from "./steps/MaterialStep";
import { ApplicationStep } from "./steps/ApplicationStep";
import { DutyStep } from "./steps/DutyStep";
import { ThroughputStep } from "./steps/ThroughputStep";
import { RouteTypeStep } from "./steps/RouteTypeStep";
import { DimensionsStep } from "./steps/DimensionsStep";
import { BeltFamilyStep } from "./steps/BeltFamilyStep";
import { BeltSurfaceStep } from "./steps/BeltSurfaceStep";
import { BeltExtrasStep } from "./steps/BeltExtrasStep";
import { FrameMaterialStep } from "./steps/FrameMaterialStep";
import { SupportTypeStep } from "./steps/SupportTypeStep";
import { FrameExtrasStep } from "./steps/FrameExtrasStep";
import { DrivePositionStep } from "./steps/DrivePositionStep";
import { SpeedControlStep } from "./steps/SpeedControlStep";
import { BeltOtherInfoStep } from "./steps/BeltOtherInfoStep";
import dynamic from "next/dynamic";

const BeltConveyorPreview = dynamic(
  () => import("@/components/3d/BeltConveyorPreview").then((m) => m.BeltConveyorPreview),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[300px] rounded-xl bg-surface animate-pulse" /> }
);

const steps = [
  { id: "purpose", title: "Formål", description: "Nytt eller erstatning?" },
  { id: "material", title: "Materiale", description: "Hva skal flyttes?" },
  { id: "application", title: "Applikasjon", description: "Type håndtering" },
  { id: "duty", title: "Driftsform", description: "Kontinuerlig eller batch?" },
  { id: "throughput", title: "Kapasitet", description: "Mengde og hastighet" },
  { id: "route", title: "Rutetype", description: "Rett, helning eller kurve?" },
  { id: "dimensions", title: "Dimensjoner", description: "Mål og vinkler" },
  { id: "belt-family", title: "Belttype", description: "PVC, TPU, modulbånd?" },
  { id: "belt-surface", title: "Overflate", description: "Glatt, grip, hygiene?" },
  { id: "belt-extras", title: "Belttillegg", description: "Medbringere, sidevegger?" },
  { id: "frame-material", title: "Ramme", description: "Aluminium, stål, rustfritt?" },
  { id: "support", title: "Understøttelse", description: "Gliseng eller ruller?" },
  { id: "frame-extras", title: "Rammeutstyr", description: "Stativ, sidekanter, deksler?" },
  { id: "drive-position", title: "Driv", description: "Hode, senter, trommel?" },
  { id: "speed-control", title: "Hastighet", description: "Fast, VFD eller servo?" },
  { id: "other", title: "Annet", description: "Info, bilder, kontakt" },
];

const stepComponents = [
  PurposeStep, MaterialStep, ApplicationStep, DutyStep,
  ThroughputStep, RouteTypeStep, DimensionsStep,
  BeltFamilyStep, BeltSurfaceStep, BeltExtrasStep,
  FrameMaterialStep, SupportTypeStep, FrameExtrasStep,
  DrivePositionStep, SpeedControlStep, BeltOtherInfoStep,
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
