import { Marker } from '@/components/Marker';
import { UserMarker } from '@/components/UserMarker';
import { Atm } from '@/types/IAtms';
import { Offices } from '@/types/IOffices';
import { createQueryString } from '@/utils/helpers';
import { LngLat } from '@yandex/ymaps3-types';
import { Feature } from '@yandex/ymaps3-types/packages/clusterer';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
    coordinates: LngLat[];
    geo: LngLat | null;
    offices: Offices[];
    atms: Atm[];
    changeCenter: (val: LngLat) => void;
}

export function useGetYMapContent({
    coordinates,
    geo,
    offices,
    atms,
    changeCenter,
}: Props) {
    const [YMapContent, setYMapContent] = useState(<div />);

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const timeComplexity = searchParams.get('timeComplexity');

    const handleMarkerClick = (coordinates: LngLat, properties: any) => {
        changeCenter(coordinates);

        const queryString = createQueryString('idx', properties.idx, searchParams);
        router.push(pathname + '?' + queryString);
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
                const { YMapMarker, YMapControls } = reactify.module(ymaps3);

                // инициализация модулей
                const { YMapZoomControl, YMapGeolocationControl } =
                    reactify.module(
                        await ymaps3.import('@yandex/ymaps3-controls@0.0.1')
                    );

                const { YMapClusterer, clusterByGrid } = reactify.module(
                    await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1')
                );

                // создание маркера
                const marker = ({ geometry, properties }: Feature) => {
                    const { coordinates } = geometry;
                    const { isActive, loadPercent } = properties as any;

                    return (
                        <YMapMarker
                            coordinates={coordinates}
                            onClick={() => {
                                handleMarkerClick(coordinates, properties);
                            }}
                        >
                            <Marker
                                isActive={isActive}
                                loadPercent={loadPercent}
                                timeComplexity={!!timeComplexity}
                            />
                        </YMapMarker>
                    );
                };

                // создание кластера
                const cluster = (coordinates: LngLat, features: Feature[]) => {
                    return (
                        <YMapMarker coordinates={coordinates}>
                            <Marker
                                isActive={true}
                                loadPercent={0}
                                timeComplexity={false}
                                count={features.length}
                            />
                        </YMapMarker>
                    );
                };

                // фильтруем координаты
                const filteredCoordinates = type === 'offices' ? offices : atms;

                // проходим по данным и создаём объекты на основе координат
                const points = filteredCoordinates?.map((item, i) => {
                    const coordinates = [item.coords.lon, item.coords.lat];

                    return {
                        type: 'Feature',
                        id: i,
                        geometry: { coordinates },
                        properties: {
                            isActive: Math.random() > 0.3,
                            loadPercent: Math.floor(Math.random() * 100) + 1,
                            idx: i
                        },
                    };
                }) as any;

                // создание компонента карты
                setYMapContent(() => (
                    <>
                        <YMapControls position='right'>
                            <YMapZoomControl />
                            <YMapGeolocationControl />
                        </YMapControls>

                        {offices ? (
                            <YMapClusterer
                                features={points}
                                method={clusterByGrid({ gridSize: 64 })}
                                marker={marker}
                                cluster={cluster}
                            />
                        ) : null}

                        {geo ? (
                            <YMapMarker coordinates={geo}>
                                <UserMarker></UserMarker>
                            </YMapMarker>
                        ) : null}
                    </>
                ));
            } catch (e) {
                setYMapContent(<div />);
            }
        })();
    }, [coordinates, geo, type, timeComplexity, offices, atms]);

    return { YMapContent };
}
