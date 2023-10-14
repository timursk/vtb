interface IOpenHours {
    days: string;
    hours: string;
}
interface Coords {
    lat: number;
    lon: number;
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

interface Offices {
    sale_point_name: string;
    open_hours: IOpenHours[];
    open_hours_individual: IOpenHours[];
    status: string;
    rko: boolean;

    office_type: string;
    sale_point_format: string;
    raw_value: string;
    coords: Coords;
}

export type { IOffices, Offices, Coords };
