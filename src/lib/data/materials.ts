export interface BulkMaterial {
  name: string;
  bulkDensity: number;
  angle: number;
  abrasive: boolean;
  corrosive: boolean;
  sticky: boolean;
}

export const BULK_MATERIALS: BulkMaterial[] = [
  { name: "Hvete", bulkDensity: 770, angle: 28, abrasive: false, corrosive: false, sticky: false },
  { name: "Mais", bulkDensity: 720, angle: 27, abrasive: false, corrosive: false, sticky: false },
  { name: "Ris", bulkDensity: 750, angle: 36, abrasive: false, corrosive: false, sticky: false },
  { name: "Sand (tørr)", bulkDensity: 1500, angle: 34, abrasive: true, corrosive: false, sticky: false },
  { name: "Sement", bulkDensity: 1510, angle: 30, abrasive: true, corrosive: false, sticky: false },
  { name: "Kull (knust)", bulkDensity: 800, angle: 38, abrasive: true, corrosive: false, sticky: false },
  { name: "Grus", bulkDensity: 1600, angle: 30, abrasive: true, corrosive: false, sticky: false },
  { name: "Treflis", bulkDensity: 350, angle: 45, abrasive: false, corrosive: false, sticky: false },
  { name: "Salt", bulkDensity: 1200, angle: 32, abrasive: false, corrosive: true, sticky: false },
  { name: "Sukker", bulkDensity: 880, angle: 35, abrasive: false, corrosive: false, sticky: true },
  { name: "Mel", bulkDensity: 590, angle: 45, abrasive: false, corrosive: false, sticky: true },
  { name: "Kalkstein (knust)", bulkDensity: 1500, angle: 34, abrasive: true, corrosive: false, sticky: false },
  { name: "Jernmalm (pels)", bulkDensity: 2200, angle: 30, abrasive: true, corrosive: false, sticky: false },
  { name: "Soyabønner", bulkDensity: 770, angle: 29, abrasive: false, corrosive: false, sticky: false },
  { name: "Plastgranulat", bulkDensity: 610, angle: 25, abrasive: false, corrosive: false, sticky: false },
];
