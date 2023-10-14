import { Marker } from '@/components/Marker';
import { UserMarker } from '@/components/UserMarker';
import { LngLat } from '@yandex/ymaps3-types';
import { Feature } from '@yandex/ymaps3-types/packages/clusterer';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
    coordinates: LngLat[];
    geo: LngLat | null;
    changeCenter: (val: LngLat) => void;
}

// const searchParams = useSearchParams();
//     useEffect(() => {
//         setType(searchParams.get('type'));
//     }, [searchParams]);

export function useGetYMapContent({ coordinates, geo, changeCenter }: Props) {
    const [YMapContent, setYMapContent] = useState(<div />);

    const searchParams = useSearchParams();
    const type = searchParams.get('type');
    const timeComplexity = searchParams.get('timeComplexity');

    const handleMarkerClick = (coordinates: LngLat) => {
        changeCenter(coordinates);
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
                                handleMarkerClick(coordinates);
                            }}
                        >
                            <Marker
                                isActive={isActive}
                                loadPercent={loadPercent}
                                timeComplexity={!!timeComplexity}
                                // onClick={() => {url.push('id=5')}} vtbmap.ru?id=5
                            />
                        </YMapMarker>
                    );
                };

                // создание кластера
                const cluster = (coordinates: LngLat, features: Feature[]) => {
                    return (
                        <YMapMarker coordinates={coordinates}>
                            <Marker isActive={true} loadPercent={0} timeComplexity={false} count={features.length} />
                        </YMapMarker>
                    );
                };

                // фильтруем координаты
                const filteredCoordinates =
                    type === 'offices' ? coordinates.slice(0, 2) : coordinates;

                const points = filteredCoordinates.map((lnglat, i) => ({
                    type: 'Feature',
                    id: i,
                    geometry: { coordinates: lnglat },
                    properties: {
                        isActive: Math.random() > 0.3,
                        loadPercent: Math.floor(Math.random() * 100) + 1,
                    },
                })) as any;

                // создание компонента карты
                setYMapContent(() => (
                    <>
                        <YMapControls position='right'>
                            <YMapZoomControl />
                            <YMapGeolocationControl />
                        </YMapControls>

                        <YMapClusterer
                            features={points}
                            method={clusterByGrid({ gridSize: 64 })}
                            marker={marker}
                            cluster={cluster}
                        />

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
    }, [coordinates, geo, type, timeComplexity]);

    return { YMapContent };
}
