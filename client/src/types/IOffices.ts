interface IOpenHours {
  days: string;
  hours: string;
}

interface IOffices {
  salePointName: string;
  address: string;
  status: string;
  openHours: any; //this
  rko: string;
  openHoursIndividual: any; //this
  officeType: string;
  salePointFormat: string;
  suoAvailability: symbol;
  hasRamp: string;
  latitude: number;
  longitude: number;
  metroStation: string | null;
  distance: number;
  kep: boolean;
  myBranch: boolean;
}

export type { IOffices };
