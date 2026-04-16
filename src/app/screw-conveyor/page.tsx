"use client";
import { WizardShell } from "@/components/wizard/WizardShell";
import { FunctionTypeStep } from "./steps/FunctionTypeStep";
import { ScrewMaterialStep } from "./steps/ScrewMaterialStep";
import { ScrewCapacityStep } from "./steps/ScrewCapacityStep";
import { ScrewGeometryStep } from "./steps/ScrewGeometryStep";
import { ScrewTypeStep } from "./steps/ScrewTypeStep";
import { HousingStep } from "./steps/HousingStep";
import { InletOutletStep } from "./steps/InletOutletStep";
import { ScrewDriveStep } from "./steps/ScrewDriveStep";
import { ScrewReviewStep } from "./steps/ScrewReviewStep";
import dynamic from "next/dynamic";

const ScrewConveyorPreview = dynamic(
  () => import("@/components/3d/ScrewConveyorPreview").then((m) => m.ScrewConveyorPreview),
  { ssr: false, loading: () => <div className="w-full h-full min-h-[300px] rounded-xl bg-surface animate-pulse" /> }
);

const steps = [
  { id: "function", title: "Funksjonstype", description: "Transportør, mater, etc." },
  { id: "material", title: "Materiale", description: "Bulkdata" },
  { id: "capacity", title: "Kapasitet", description: "Ytelse og drift" },
  { id: "geometry", title: "Geometri", description: "Mål og layout" },
  { id: "screw", title: "Skruetype", description: "Aksel, vinger, stigning" },
  { id: "housing", title: "Hus", description: "Trau og deksel" },
  { id: "inlet-outlet", title: "Inn/utløp", description: "Porter og lagre" },
  { id: "drive", title: "Drivverk", description: "Motor og styring" },
  { id: "review", title: "Oppsummering", description: "Materialer & kontakt" },
];

const stepComponents = [
  FunctionTypeStep, ScrewMaterialStep, ScrewCapacityStep, ScrewGeometryStep,
  ScrewTypeStep, HousingStep, InletOutletStep, ScrewDriveStep, ScrewReviewStep,
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
