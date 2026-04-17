"use client";
import { WizardShell } from "@/components/wizard/WizardShell";
import { ScrewPurposeStep } from "./steps/ScrewPurposeStep";
import { MaterialDutyStep } from "./steps/MaterialDutyStep";
import { FunctionTypeStep } from "./steps/FunctionTypeStep";
import { DutyStep } from "./steps/DutyStep";
import { AbrasivenessStep } from "./steps/AbrasivenessStep";
import { CorrosivenessStep } from "./steps/CorrosivenessStep";
import { ShaftTypeStep } from "./steps/ShaftTypeStep";
import { FlightTypeStep } from "./steps/FlightTypeStep";
import { ShaftDiameterStep } from "./steps/ShaftDiameterStep";
import { OuterDiameterStep } from "./steps/OuterDiameterStep";
import { PitchTypeStep } from "./steps/PitchTypeStep";
import { ScrewLengthStep } from "./steps/ScrewLengthStep";
import { DriveEndStep } from "./steps/DriveEndStep";
import { BearingEndStep } from "./steps/BearingEndStep";
import { RotationStep } from "./steps/RotationStep";
import { ScrewCapacityStep } from "./steps/ScrewThroughputStep";
import { HousingStyleStep } from "./steps/HousingStyleStep";
import { OtherInfoStep } from "./steps/OtherInfoStep";
import dynamic from "next/dynamic";

const ScrewConveyorPreview = dynamic(
  () => import("@/components/3d/ScrewConveyorPreview").then((m) => m.ScrewConveyorPreview),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[300px] rounded-xl bg-surface animate-pulse" /> }
);

const steps = [
  { id: "purpose", title: "Formål", description: "Nyanlegg eller erstatning?" },
  { id: "material", title: "Materiale", description: "Hva skal forflyttes?" },
  { id: "function", title: "Funksjon", description: "Hva skal skruen gjøre?" },
  { id: "duty", title: "Driftsform", description: "Batch eller kontinuerlig?" },
  { id: "abrasiveness", title: "Abrasivitet", description: "Hvor slitende?" },
  { id: "corrosiveness", title: "Korrosivitet", description: "Hvor korrosivt?" },
  { id: "shaft", title: "Aksel", description: "Med eller uten aksel?" },
  { id: "flight", title: "Vingetype", description: "Type skruevinge" },
  { id: "shaft-dia", title: "Dia. aksling", description: "Diameter på akselen" },
  { id: "outer-dia", title: "Ytterdia. skrue", description: "Ytterdiameter" },
  { id: "pitch", title: "Stigning", description: "Stigning på skruen" },
  { id: "length", title: "Lengde", description: "Lengde på skruen" },
  { id: "drive-end", title: "Drivende ende", description: "Kobling og drivside" },
  { id: "bearing-end", title: "Opplagret ende", description: "Lagerstørrelse" },
  { id: "rotation", title: "Retning", description: "Rotasjonsretning" },
  { id: "capacity", title: "Kapasitet", description: "Mengde og enhet" },
  { id: "housing", title: "Hus", description: "Tett eller trau?" },
  { id: "other", title: "Annet", description: "Info, bilder, tegninger" },
];

const stepComponents = [
  ScrewPurposeStep, MaterialDutyStep, FunctionTypeStep, DutyStep,
  AbrasivenessStep, CorrosivenessStep,
  ShaftTypeStep, FlightTypeStep, ShaftDiameterStep, OuterDiameterStep,
  PitchTypeStep, ScrewLengthStep,
  DriveEndStep, BearingEndStep, RotationStep,
  ScrewCapacityStep, HousingStyleStep, OtherInfoStep,
];

export default function ScrewConveyorPage() {
  return (
    <WizardShell
      title="Skruetransportør – Forespørsel"
      steps={steps}
      preview={<ScrewConveyorPreview />}
    >
      {(stepIndex) => {
        const StepComponent = stepComponents[stepIndex];
        return <StepComponent />;
      }}
    </WizardShell>
  );
}
