import { create } from "zustand";

export type ScrewMode = "conveyor" | "feeder" | "inclined" | "vertical" | "shaftless" | "mixing" | "";
export type ShaftType = "shafted" | "shaftless" | "";
export type FlightType = "single_flight" | "ribbon" | "cut" | "cut_folded" | "paddles" | "";
export type PitchType = "standard" | "short_2_3D" | "half_1_2D" | "variable" | "";
export type HousingType = "u_trough" | "tubular" | "flared" | "rectangular" | "";
export type CoverType = "flanged" | "semi_flanged" | "flat" | "gasketed" | "";
export type ConstructionMaterial = "carbon_steel" | "stainless_304" | "stainless_316" | "wear_alloy" | "";

export interface ScrewWizardState {
  screwMode: ScrewMode;
  quotePurpose: "new" | "replacement" | "";
  materialName: string;
  bulkDensityKgM3: number | undefined;
  capacityUnit: "kg/h" | "t/h" | "m³/h";
  particleSizeMm: number | undefined;
  lumpSizeMm: number | undefined;
  flowability: "free" | "medium" | "sluggish" | "";
  abrasiveness: "low" | "medium" | "high" | "";
  corrosiveness: "low" | "medium" | "high" | "";
  stickyStringy: boolean;
  moisture: string;
  temperatureC: number | undefined;
  odorVapor: boolean;
  atexMaterial: boolean;
  unknownMaterial: boolean;
  requiredCapacity: number | undefined;
  turndownRatio: number;
  batchOrContinuous: "batch" | "continuous" | "";
  feedAccuracy: "low" | "medium" | "high" | "";
  surgeLoads: boolean;
  centerlineLengthMm: number | undefined;
  inclineAngleDeg: number | undefined;
  inletElevationMm: number | undefined;
  dischargeElevationMm: number | undefined;
  installationSpace: string;
  leftOrRightHand: "left" | "right" | "";
  rotationIfKnown: "cw" | "ccw" | "";
  shaftType: ShaftType;
  flightType: FlightType;
  pitchType: PitchType;
  diameterKnown: number | undefined;
  speedKnown: number | undefined;
  housingType: HousingType;
  coverType: CoverType;
  linerRequired: boolean;
  accessHatches: boolean;
  continuousWeld: boolean;
  inletCount: number;
  inletPositions: string;
  outletCount: number;
  outletPositions: string;
  slideGates: boolean;
  endBearings: boolean;
  hangerBearings: boolean;
  inspectionPorts: boolean;
  gearReducerMotor: boolean;
  driveSide: "inlet" | "discharge" | "";
  torqueArm: boolean;
  vfd: boolean;
  starterType: string;
  reverse: boolean;
  efficiencyIfKnown: number | undefined;
  constructionMaterial: ConstructionMaterial;
  shaftMaterial: string;
  finish: string;
  foodContact: boolean;
  atexZone: string;
  venting: boolean;
  guarding: string;
  manuals: boolean;
  quantity: number;
  deliveryCountry: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  deadline: string;
  openQuestions: string[];
  setField: <K extends keyof ScrewWizardState>(key: K, value: ScrewWizardState[K]) => void;
  reset: () => void;
}

const initialState: Omit<ScrewWizardState, "setField" | "reset"> = {
  screwMode: "", quotePurpose: "", materialName: "", bulkDensityKgM3: undefined, capacityUnit: "kg/h",
  particleSizeMm: undefined, lumpSizeMm: undefined, flowability: "", abrasiveness: "", corrosiveness: "",
  stickyStringy: false, moisture: "", temperatureC: undefined, odorVapor: false, atexMaterial: false, unknownMaterial: false,
  requiredCapacity: undefined, turndownRatio: 1.0, batchOrContinuous: "", feedAccuracy: "", surgeLoads: false,
  centerlineLengthMm: undefined, inclineAngleDeg: undefined, inletElevationMm: undefined, dischargeElevationMm: undefined,
  installationSpace: "", leftOrRightHand: "", rotationIfKnown: "",
  shaftType: "", flightType: "", pitchType: "", diameterKnown: undefined, speedKnown: undefined,
  housingType: "", coverType: "", linerRequired: false, accessHatches: false, continuousWeld: false,
  inletCount: 1, inletPositions: "", outletCount: 1, outletPositions: "",
  slideGates: false, endBearings: true, hangerBearings: false, inspectionPorts: false,
  gearReducerMotor: true, driveSide: "", torqueArm: false, vfd: false, starterType: "", reverse: false, efficiencyIfKnown: undefined,
  constructionMaterial: "", shaftMaterial: "C1045", finish: "", foodContact: false, atexZone: "", venting: false,
  guarding: "", manuals: true, quantity: 1, deliveryCountry: "NO",
  contactName: "", contactEmail: "", contactPhone: "", companyName: "", deadline: "", openQuestions: [],
};

export const useScrewWizardStore = create<ScrewWizardState>((set) => ({
  ...initialState,
  setField: (key, value) => set({ [key]: value } as Partial<ScrewWizardState>),
  reset: () => set(initialState),
}));
