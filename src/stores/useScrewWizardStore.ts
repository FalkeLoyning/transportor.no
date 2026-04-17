import { create } from "zustand";

export type ScrewMode = "conveyor" | "feeder" | "inclined" | "vertical" | "shaftless" | "mixing" | "";
export type ShaftType = "shafted" | "shaftless" | "unknown" | "";
export type FlightType = "single_flight" | "ribbon" | "cut" | "cut_folded" | "paddles" | "unknown" | "";
export type PitchType = "standard" | "short_2_3D" | "half_1_2D" | "variable" | "unknown" | "";
export type HousingStyle = "sealed" | "trough" | "unknown" | "";
export type DriveCoupling = "spline" | "keyway" | "clamp_ring" | "driver" | "unknown" | "";
export type DriveEnd = "inlet" | "discharge" | "unknown" | "";
export type RotationDir = "cw" | "ccw" | "unknown" | "";

export interface ScrewWizardState {
  /* 1. Purpose */
  quotePurpose: "new" | "replacement" | "unknown" | "";
  /* 2. Function */
  screwMode: ScrewMode | "unknown";
  /* 3. Material & duty */
  materialName: string;
  materialUnknown: boolean;
  batchOrContinuous: "batch" | "continuous" | "unknown" | "";
  surgeLoads: boolean;
  /* 4. Abrasiveness */
  abrasiveness: "low" | "medium" | "high" | "unknown" | "";
  /* 5. Corrosiveness */
  corrosiveness: "low" | "medium" | "high" | "unknown" | "";
  /* 6. Shaft */
  shaftType: ShaftType;
  /* 7. Flight type */
  flightType: FlightType;
  /* 8. Shaft diameter */
  shaftDiameterMm: number | undefined;
  shaftDiameterUnknown: boolean;
  /* 9. Screw outer diameter */
  screwOuterDiameterMm: number | undefined;
  screwOuterDiameterUnknown: boolean;
  /* 10. Pitch */
  pitchMm: number | undefined;
  pitchType: PitchType;
  /* 11. Length */
  screwLengthMm: number | undefined;
  screwLengthUnknown: boolean;
  /* 12. Drive end */
  driveCoupling: DriveCoupling;
  driveEnd: DriveEnd;
  /* 13. Bearing end */
  bearingSizeMm: number | undefined;
  bearingSizeUnknown: boolean;
  /* 14. Rotation direction */
  rotationDirection: RotationDir;
  /* 15. Capacity */
  requiredCapacity: number | undefined;
  capacityUnit: "kg/h" | "t/h" | "m³/h";
  capacityUnknown: boolean;
  /* 16. Housing */
  housingStyle: HousingStyle;
  /* 17. Other info */
  additionalInfo: string;
  attachmentNames: string[];

  /* Utility */
  setField: <K extends keyof ScrewWizardState>(key: K, value: ScrewWizardState[K]) => void;
  reset: () => void;
}

const initialState: Omit<ScrewWizardState, "setField" | "reset"> = {
  quotePurpose: "",
  screwMode: "",
  materialName: "", materialUnknown: false,
  batchOrContinuous: "", surgeLoads: false,
  abrasiveness: "", corrosiveness: "",
  shaftType: "",
  flightType: "",
  shaftDiameterMm: undefined, shaftDiameterUnknown: false,
  screwOuterDiameterMm: undefined, screwOuterDiameterUnknown: false,
  pitchMm: undefined, pitchType: "",
  screwLengthMm: undefined, screwLengthUnknown: false,
  driveCoupling: "", driveEnd: "",
  bearingSizeMm: undefined, bearingSizeUnknown: false,
  rotationDirection: "",
  requiredCapacity: undefined, capacityUnit: "kg/h", capacityUnknown: false,
  housingStyle: "",
  additionalInfo: "", attachmentNames: [],
};

export const useScrewWizardStore = create<ScrewWizardState>((set) => ({
  ...initialState,
  setField: (key, value) => set({ [key]: value } as Partial<ScrewWizardState>),
  reset: () => set(initialState),
}));
