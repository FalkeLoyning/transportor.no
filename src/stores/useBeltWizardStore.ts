import { create } from "zustand";

export type ApplicationMode = "unit_handling" | "bulk" | "food_hygiene" | "precision_indexing" | "unknown" | "";
export type Industry = "logistics" | "food" | "pharma" | "workshop" | "waste" | "other" | "";
export type QuotePurpose = "new_line" | "replacement" | "rebuild" | "unknown" | "";
export type RouteType = "straight" | "incline_under_20" | "incline_above_20" | "curve" | "combination" | "unknown" | "";
export type BeltFamily = "pvc" | "tpu" | "monolithic_tpu" | "modular_plastic" | "timing_belt" | "bulk_rubber" | "unknown" | "";
export type BeltSurface = "smooth" | "grip" | "structured" | "fda_hygiene" | "antistatic" | "flame_retardant" | "unknown" | "";
export type FrameMaterial = "aluminium" | "stainless_steel" | "painted_steel" | "unknown" | "";
export type SupportType = "slide_bed" | "carrying_idlers" | "roller_support" | "unknown" | "";
export type DrivePosition = "head_discharge" | "head_infeed" | "center_drive" | "drum_motor" | "unknown" | "";
export type SpeedControl = "fixed" | "vfd" | "servo" | "unknown" | "";
export type DutyType = "continuous" | "batch" | "shift_24_7" | "unknown" | "";
export type ThroughputUnit = "stk/min" | "kg/h" | "t/h" | "m³/h";

export interface BeltWizardState {
  applicationMode: ApplicationMode;
  industry: Industry;
  quotePurpose: QuotePurpose;
  productName: string;
  productLengthMm: number | undefined;
  productWidthMm: number | undefined;
  productHeightMm: number | undefined;
  productWeightKg: number | undefined;
  orientationCritical: boolean;
  accumulationAllowed: boolean;
  maxProductWidthMm: number | undefined;
  materialName: string;
  bulkDensityKgM3: number | undefined;
  particleSizeMm: number | undefined;
  lumpSizeMm: number | undefined;
  materialSticky: boolean;
  materialDusty: boolean;
  materialAbrasive: boolean;
  materialCorrosive: boolean;
  materialTemperatureC: number | undefined;
  materialMoisture: string;
  unknownMaterial: boolean;
  throughputUnit: ThroughputUnit;
  throughputValue: number | undefined;
  targetSpeedMPerMin: number | undefined;
  duty: DutyType;
  accumulationMode: "no" | "conditional" | "yes";
  reverseOperation: boolean;
  routeType: RouteType;
  overallLengthMm: number | undefined;
  beltWidthMm: number | undefined;
  usableWidthMm: number | undefined;
  infeedHeightMm: number | undefined;
  outfeedHeightMm: number | undefined;
  inclineAngleDeg: number | undefined;
  curveAngleDeg: number | undefined;
  smallProductTransfer: boolean;
  beltFamily: BeltFamily;
  beltSurface: BeltSurface;
  cleats: boolean;
  sidewalls: boolean;
  guideProfiles: boolean;
  antistaticRequired: boolean;
  frameMaterial: FrameMaterial;
  supportType: SupportType;
  stands: boolean;
  sideRails: boolean;
  covers: boolean;
  washdown: boolean;
  openFrame: boolean;
  drivePosition: DrivePosition;
  motorSide: "left" | "right" | "";
  aboveBelow: "above" | "below" | "";
  voltage: string;
  speedControl: SpeedControl;
  ipClass: string;
  ceRequired: boolean;
  ukcaRequired: boolean;
  atexApplicable: boolean;
  atexZone: string;
  emergencyStop: boolean;
  guardingScope: string;
  lockoutNeeds: boolean;
  riskAssessmentRequired: boolean;
  documentationLang: string;
  quantity: number;
  deliveryCountry: string;
  siteConditions: string;
  requestedDocs: string[];
  attachments: string[];
  deadline: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  companyName: string;
  openQuestions: string[];
  capacityUnknown: boolean;
  dimensionsUnknown: boolean;
  additionalInfo: string;
  attachmentNames: string[];
  setField: <K extends keyof BeltWizardState>(key: K, value: BeltWizardState[K]) => void;
  reset: () => void;
}

const initialState: Omit<BeltWizardState, "setField" | "reset"> = {
  applicationMode: "", industry: "", quotePurpose: "",
  productName: "", productLengthMm: undefined, productWidthMm: undefined, productHeightMm: undefined, productWeightKg: undefined,
  orientationCritical: false, accumulationAllowed: false, maxProductWidthMm: undefined,
  materialName: "", bulkDensityKgM3: undefined, particleSizeMm: undefined, lumpSizeMm: undefined,
  materialSticky: false, materialDusty: false, materialAbrasive: false, materialCorrosive: false,
  materialTemperatureC: undefined, materialMoisture: "", unknownMaterial: false,
  throughputUnit: "stk/min", throughputValue: undefined, targetSpeedMPerMin: undefined, duty: "",
  accumulationMode: "no", reverseOperation: false,
  routeType: "", overallLengthMm: undefined, beltWidthMm: undefined, usableWidthMm: undefined,
  infeedHeightMm: undefined, outfeedHeightMm: undefined, inclineAngleDeg: undefined, curveAngleDeg: undefined, smallProductTransfer: false,
  beltFamily: "", beltSurface: "", cleats: false, sidewalls: false, guideProfiles: false, antistaticRequired: false,
  frameMaterial: "", supportType: "", stands: false, sideRails: false, covers: false, washdown: false, openFrame: false,
  drivePosition: "", motorSide: "", aboveBelow: "", voltage: "400V_3ph_50Hz", speedControl: "", ipClass: "IP55",
  ceRequired: true, ukcaRequired: false, atexApplicable: false, atexZone: "", emergencyStop: true, guardingScope: "",
  lockoutNeeds: false, riskAssessmentRequired: false, documentationLang: "nb-NO",
  quantity: 1, deliveryCountry: "NO", siteConditions: "", requestedDocs: ["GA_drawing"], attachments: [],
  deadline: "", contactName: "", contactEmail: "", contactPhone: "", companyName: "", openQuestions: [],
  capacityUnknown: false, dimensionsUnknown: false, additionalInfo: "", attachmentNames: [],
};

export const useBeltWizardStore = create<BeltWizardState>((set) => ({
  ...initialState,
  setField: (key, value) => set({ [key]: value } as Partial<BeltWizardState>),
  reset: () => set(initialState),
}));
