import { Marker } from '@/components/Marker';
import { LngLat, YMapLocationRequest } from '@yandex/ymaps3-types';
import { Feature } from '@yandex/ymaps3-types/packages/clusterer';
import React, { useCallback } from 'react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface Props {
    coordinates: LngLat[];
}

export function useLoadYMaps({ coordinates }: Props) {
    const [YMaps, setYMaps] = useState(<div />);
    const map = useRef(null);

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
            }));
        },
        [setLocation]
    );

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
                    YMapMarker,
                    YMapControls,
                } = reactify.module(ymaps3);

                // инициализация модулей
                const { YMapZoomControl, YMapGeolocationControl } =
                    reactify.module(
                        await ymaps3.import('@yandex/ymaps3-controls@0.0.1')
                    );

                const { YMapClusterer, clusterByGrid } = reactify.module(
                    await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1')
                );

                // создание маркера
                const marker = ({ geometry, properties}: Feature) => {
                    const { coordinates } = geometry;
                    const { isActive, loadPercent } = properties as any;

                    return (
                        <YMapMarker coordinates={coordinates}>
                            <Marker isActive={isActive} loadPercent={loadPercent} />
                        </YMapMarker>
                    );
                };

                // создание кластера
                const cluster = (coordinates: LngLat, features: Feature[]) => (
                    <YMapMarker coordinates={coordinates}>
                        <Marker isActive={false} loadPercent={0} />
                    </YMapMarker>
                );

                const points = coordinates.map((lnglat, i) => ({
                    type: 'Feature',
                    id: i,
                    geometry: { coordinates: lnglat },
                    properties: { isActive: (Math.random() > 0.3), loadPercent: (Math.floor(Math.random() * 100) + 1) },
                })) as any;

                // создание компонента карты
                setYMaps(() => (
                    <YMap
                        location={location}
                        camera={{ tilt: 0, azimuth: 0, duration: 0 }}
                        ref={map}
                    >
                        <YMapDefaultSchemeLayer />
                        <YMapDefaultFeaturesLayer />

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
                    </YMap>
                ));
            } catch (e) {
                setYMaps(<div />);
            }
        })();
    }, [location, coordinates]);

    return { YMaps, map, changeCenter, getYMapsPos };
}

// useEffect(() => {
//     initMap();

//     async function initMap() {
//         await ymaps3.ready;

//         const {
//             YMap,
//             YMapMarker,
//             YMapFeature,
//             YMapLayer,
//             YMapDefaultSchemeLayer,
//             YMapDefaultFeaturesLayer,
//             YMapControls,
//         } = ymaps3;
//         const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import(
//             '@yandex/ymaps3-controls@0.0.1'
//         );

//         const mapContainer = document.getElementById('map') as HTMLDivElement;
//         mapContainer.innerHTML = '';

//         // инициализация карты в контейнере
//         const map = new YMap(
//             mapContainer,
//             {
//                 location: {
//                     center: [37.588144, 55.733842],
//                     zoom: 10,
//                 },
//             },
//             [
//                 new YMapDefaultSchemeLayer({}),
//                 new YMapControls({ position: 'right' }, [
//                     new YMapZoomControl({}),
//                     new YMapGeolocationControl({}),
//                 ]),
//             ]
//         );

//         // основной компонент карты
//         map.addChild(new YMapDefaultSchemeLayer({}));

//         debugger;
//         // основной слой для геообъектов и dom эл-тов
//         map.addChild(new YMapDefaultFeaturesLayer({}));

//         // слой
//         // map.addChild(new YMapLayer({ source: 'markerSource', type: 'markers', zIndex: 200 }));

//         const marker1 = new YMapMarker(
//             {
//                 source: 'ymaps3x0-default-feature',
//                 coordinates: [37.588144, 55.733842],
//                 // draggable: true,
//                 // mapFollowsOnDrag: true,
//             },
//             markerElement
//         );

//         // добавление маркера
//         map.addChild(marker1);

//         // дефолт маркер
//         const { YMapDefaultMarker } = await ymaps3.import(
//             '@yandex/ymaps3-markers@0.0.1'
//         );
// const { YMapClusterer, clusterByGrid } = await ymaps3.import(
//     '@yandex/ymaps3-clusterer@0.0.1'
// );

// const marker = (feature) =>
//     new YMapDefaultMarker({
//         coordinates: feature.geometry.coordinates,
//         title: '123',
//         subtitle: 'qwerty',
//         color: 'blue',
//     });

// const cluster = (coordinates, features) =>
//     new YMapDefaultMarker({
//         coordinates,
//         title: '123',
//         subtitle: 'qwerty',
//         color: 'blue',
//     });

// const points = coordinates.map((lnglat, i) => ({
//     type: 'Feature',
//     id: i,
//     geometry: { coordinates: lnglat },
//     properties: { name: 'Point of issue of orders' },
// })) as any;

// const clusterer = new YMapClusterer({
//     method: clusterByGrid({ gridSize: 64 }),
//     features: points,
//     marker,
//     cluster,
// });

// map.addChild(clusterer);

//         // map.addChild(
//         //     new YMapDefaultMarker({
//         //         // coordinates: [34, 54],
//         //         coordinates: [37.588144, 55.733842],
//         //         title: 'Hello World!ыфвфыв  фыввы ф ывфвф ыфыв фв ывфы в фы фвыфвы ',
//         //         subtitle:
//         //             'kind and brigh 12 12 123 124124142 142 412 421412 21 4t',
//         //         color: 'green',
//         //     })
//         // );
//         // map.addChild(
//         //     new YMapDefaultMarker({
//         //         // coordinates: [34, 54],
//         //         coordinates: [37.578144, 55.733842],
//         //         title: '123',
//         //         subtitle: 'qwerty',
//         //         color: 'blue',
//         //     })
//         // );
//     }
// }, []);
