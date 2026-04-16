export interface BeltConveyorRFQ {
  id: string;
  createdAt: string;
  status: "draft" | "submitted" | "quoted" | "accepted" | "rejected";
  applicationMode: string;
  industry: string;
  quotePurpose: string;
  routeType: string;
  overallLengthMm?: number;
  beltWidthMm?: number;
  beltFamily: string;
  beltSurface: string;
  frameMaterial: string;
  drivePosition: string;
  speedControl: string;
  quantity: number;
  contactName: string;
  contactEmail: string;
  companyName: string;
}

export interface ScrewConveyorRFQ {
  id: string;
  createdAt: string;
  status: "draft" | "submitted" | "quoted" | "accepted" | "rejected";
  screwMode: string;
  materialName: string;
  requiredCapacity?: number;
  capacityUnit: string;
  centerlineLengthMm?: number;
  shaftType: string;
  flightType: string;
  housingType: string;
  constructionMaterial: string;
  quantity: number;
  contactName: string;
  contactEmail: string;
  companyName: string;
}
