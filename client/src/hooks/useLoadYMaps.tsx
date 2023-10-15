import { Atm } from '@/types/IAtms';
import { Offices } from '@/types/IOffices';
import { getAtms, getOffices } from '@/utils/services';
import { LngLat, YMapLocationRequest } from '@yandex/ymaps3-types';
import React, { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface YMapsProps {
    children: React.ReactNode;
}
interface Props {}

export function useLoadYMaps({}: Props) {
    const [YMaps, setYMaps] = useState<React.FC<YMapsProps> | null>(null);
    const [userGeo, setUserGeo] = useState<LngLat | null>(null);

    const [offices, setOffices] = useState<Offices[]>([]);
    const [atms, setAtms] = useState<Atm[]>([]);

    const map = useRef(null);

    // изначальная позиция карты - Москва
    const [location, setLocation] = useState<YMapLocationRequest>({
        center: [37.623082, 55.75254],
        zoom: 10,
        duration: 1000,
    });

    // перемещения центра карты
    const changeCenter = useCallback(
        (newLocation: LngLat) => {
            setLocation((prev) => ({
                ...prev,
                center: newLocation,
                zoom: 15,
            }));
        },
        [setLocation]
    );

    // получение гео юзера
    const getYMapsPos = async () => {
        const pos = await ymaps3.geolocation.getPosition();

        return pos;
    };

    useEffect(() => {
        (async () => {
            try {
                // инициализация модулей
                const [ymaps3React] = await Promise.all([
                    ymaps3.import('@yandex/ymaps3-reactify'),
                    ymaps3.ready,
                ]);
                const reactify = ymaps3React.reactify.bindTo(React, ReactDOM);

                // получение компонентов
                const {
                    YMap,
                    YMapDefaultSchemeLayer,
                    YMapDefaultFeaturesLayer,
                } = reactify.module(ymaps3);

                // сохраняем координаты юзера
                if (!userGeo) {
                    const geo = (await getYMapsPos())?.coords;

                    if (geo) {
                        // setUserGeo(geo);
                        // ! захардкожено для отладки
                        setUserGeo([37.557116, 55.758706]);
                    }
                }

                // создание компонента карты
                setYMaps(() => {
                    // eslint-disable-next-line react/display-name
                    return ({ children }: YMapsProps) => {
                        return (
                            <YMap
                                location={location}
                                camera={{ tilt: 0, azimuth: 0, duration: 0 }}
                                ref={map}
                            >
                                <YMapDefaultSchemeLayer />
                                <YMapDefaultFeaturesLayer />

                                {children}
                            </YMap>
                        );
                    };
                });
            } catch (e) {
                setYMaps(null);
            }
        })();
    }, [location, userGeo]);

    // при получении координат юзера двигаем карту
    useEffect(() => {
        if (userGeo) {
            // changeCenter(userGeo);
            // ! захардкожено для отладки
            changeCenter([37.557116, 55.758706]);

            // getOffices(userGeo, (offices: IOffices[]) => setOffices(offices));
            // ! захардкожено для отладки
            // @ts-ignore
            setOffices([
                { coords: { lat: 55.76, lon: 37.64 }, load_value: 9 },
                { coords: { lat: 55.7, lon: 37.63 }, load_value: 1 },
                { coords: { lat: 55.69, lon: 37.43 }, load_value: 3 },
                { coords: { lat: 55.71, lon: 37.69 }, load_value: 2 },
                { coords: { lat: 55.76, lon: 37.64 }, load_value: 7 },
                { coords: { lat: 55.74512566, lon: 37.643123 }, load_value: 5 },
            ]);

            setAtms([
                { coords: { lat: 55.66, lon: 37.54 } },
                { coords: { lat: 55.7412512, lon: 37.4251551 } },
                { coords: { lat: 55.661515152, lon: 37.73 } },
                { coords: { lat: 55.70151515, lon: 37.66155115 } },
                { coords: { lat: 55.73, lon: 37.62151616 } },
                { coords: { lat: 55.75512566, lon: 37.643123 } },
            ]);
            // getOffices([37.557116, 55.758706], (offices: Offices[]) => setOffices(offices));
            // getAtms([37.557116, 55.758706], (atms: Atm[]) => setAtms(atms));
        }
    }, [userGeo, changeCenter]);

    return { YMaps, map, userGeo, offices, atms, changeCenter, getYMapsPos };
}
