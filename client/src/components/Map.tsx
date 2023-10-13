import { useEffect } from 'react';

export function Map() {
    useEffect(() => {
        initMap();

        async function initMap() {
            await ymaps3.ready;

            const {
                YMap,
                YMapMarker,
                YMapFeature,
                YMapLayer,
                YMapDefaultSchemeLayer,
                YMapDefaultFeaturesLayer,
                YMapControls,
            } = ymaps3;
            const { YMapZoomControl, YMapGeolocationControl } = await ymaps3.import(
                '@yandex/ymaps3-controls@0.0.1'
            );

            const mapContainer = document.getElementById(
                'map'
            ) as HTMLDivElement;
            mapContainer.innerHTML = '';

            // инициализация карты в контейнере
            const map = new YMap(
                mapContainer,
                {
                    location: {
                        center: [37.588144, 55.733842],
                        zoom: 10,
                    },
                },
                [
                    new YMapDefaultSchemeLayer({}),
                    new YMapControls({ position: 'right' }, [
                        new YMapZoomControl({}),
                        new YMapGeolocationControl({}),
                    ]),
                ]
            );

            // основной компонент карты
            map.addChild(new YMapDefaultSchemeLayer({}));

            debugger;
            // основной слой для геообъектов и dom эл-тов
            map.addChild(new YMapDefaultFeaturesLayer({}));

            // слой
            // map.addChild(new YMapLayer({ source: 'markerSource', type: 'markers', zIndex: 200 }));

            const markerElement = document.createElement('div');
            markerElement.className = 'marker-class';
            markerElement.innerText = "I'm marker!";

            const marker1 = new YMapMarker(
                {
                    source: 'ymaps3x0-default-feature',
                    coordinates: [37.588144, 55.733842],
                    // draggable: true,
                    // mapFollowsOnDrag: true,
                },
                markerElement
            );

            // добавление маркера
            map.addChild(marker1);

            // дефолт маркер
            const { YMapDefaultMarker } = await ymaps3.import(
                '@yandex/ymaps3-markers@0.0.1'
            );
            const { YMapClusterer, clusterByGrid } = await ymaps3.import(
                '@yandex/ymaps3-clusterer@0.0.1'
            );

            const marker = (feature) =>
                new YMapDefaultMarker({
                    coordinates: feature.geometry.coordinates,
                    title: '123',
                    subtitle: 'qwerty',
                    color: 'blue',
                });

            const cluster = (coordinates, features) =>
                new YMapDefaultMarker({
                    coordinates,
                    title: '123',
                    subtitle: 'qwerty',
                    color: 'blue',
                });

            const coordinates = [
                [37.64, 55.76],
                [37.63, 55.7],
                [37.43, 55.69],
                [37.47, 55.68],
                [38.53, 58.6],
                [37.59, 55.71],
                [37.5, 55.63],
                [37.52, 55.57],
                [37.52, 58.57],
                [40.52, 58.57],
            ];

            const points = coordinates.map((lnglat, i) => ({
                type: 'Feature',
                id: i,
                geometry: { coordinates: lnglat },
                properties: { name: 'Point of issue of orders' },
            })) as any;

            const clusterer = new YMapClusterer({
                method: clusterByGrid({ gridSize: 64 }),
                features: points,
                marker,
                cluster,
            });

            map.addChild(clusterer);

            // map.addChild(
            //     new YMapDefaultMarker({
            //         // coordinates: [34, 54],
            //         coordinates: [37.588144, 55.733842],
            //         title: 'Hello World!ыфвфыв  фыввы ф ывфвф ыфыв фв ывфы в фы фвыфвы ',
            //         subtitle:
            //             'kind and brigh 12 12 123 124124142 142 412 421412 21 4t',
            //         color: 'green',
            //     })
            // );
            // map.addChild(
            //     new YMapDefaultMarker({
            //         // coordinates: [34, 54],
            //         coordinates: [37.578144, 55.733842],
            //         title: '123',
            //         subtitle: 'qwerty',
            //         color: 'blue',
            //     })
            // );
        }
    }, []);

    return <div id='map' style={{ width: 600, height: 400 }}></div>;
}
