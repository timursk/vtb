import { LngLat } from '@yandex/ymaps3-types';

const API_URL = `http://localhost:4000/`;
const API_PATHS = {
    bank_office: 'bank_office',
    bank_offices: 'bank_offices',
    atm: 'atm',
    atms: 'atms',
    autocomplete: 'autocomplete',
};

export const getOffices = async (geo: LngLat, callback: any) => {
    const offices = await fetchApi(
        API_PATHS.bank_offices + `?longitude=${geo[0]}&latitude=${geo[1]}`
    );

    callback(offices);
};

export const getAtms = async (geo: LngLat, callback: any) => {
    const atms = await fetchApi(
        API_PATHS.atms + `?longitude=${geo[0]}&latitude=${geo[1]}`
    );

    callback(atms);
};

export const getNearestOffice = async (geo: LngLat, callback: any) => {
    const office = await fetchApi(
        API_PATHS.bank_office + `?longitude=${geo[0]}&latitude=${geo[1]}`
    );

    callback(office);
};

export const getNearestAtm = async (geo: LngLat, callback: any) => {
    const atm = await fetchApi(
        API_PATHS.atm + `?longitude=${geo[0]}&latitude=${geo[1]}`
    );

    callback(atm);
};

export const fetchApi = async (path: string) => {
    const response = await fetch(API_URL + path);
    const result = await response.json();

    return result;
};
