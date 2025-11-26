export interface GroundingSource {
  title?: string;
  uri?: string;
}

export interface PairingResponse {
  suggestion: string;
  sources: GroundingSource[];
}

export enum FlavorProfile {
  NUTTY = 'Nutty',
  FLORAL = 'Floral',
  EARTHY = 'Earthy',
  FRUITY = 'Fruity',
  SPICY = 'Spicy',
  SWEET = 'Sweet'
}

export interface ChartDataPoint {
  subject: string;
  A: number;
  fullMark: number;
}
