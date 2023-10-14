import { LngLat } from '@yandex/ymaps3-types';

const API_URL = `http://localhost:4000/`;
const API_PATHS = {
    bank_offices: 'bank_offices',
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

export const fetchApi = async (path: string) => {
    const response = await fetch(API_URL + path);
    const result = await response.json();

    return result;
};
