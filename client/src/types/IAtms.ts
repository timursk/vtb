import { Coords } from "./IOffices";

interface IAtms {}

interface Atm {
    allday: boolean;
    services: Services;
    raw_value: string;
    coords: Coords;
}

interface Services {
    wheelchair: Service;
    blind: Service;
    nfc_for_bank_cards: CurrService;
    qr_read: CurrService;
    supports_usd: CurrService;
    supports_charge_rub: CurrService;
    supports_eur: CurrService;
    supports_rub: CurrService;
    supportsChargeRub: Service;
    nfcForBankCards: Service;
    supportsUsd: Service;
    supportsRub: Service;
    supportsEur: Service;
    qrRead: Service;
}

type CurrService = 'UNKNOWN' | 'AVAILABLE' | 'SUPPORTED' | null;
interface Service {
    service_activity?: CurrService;
    service_capability?: CurrService;
    serviceCapability?: CurrService;
    serviceActivity?: CurrService;
}

export type { IAtms, Atm };

