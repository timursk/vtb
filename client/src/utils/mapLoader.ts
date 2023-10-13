import React from 'react';
import ReactDOM from 'react-dom';

let map: any = null;

export async function initMap() {
    if (map) {
        return map;
    }

    // загружаем асинхронную часть апи карты
    await ymaps3.ready;

    // react компоненты карты
    const ymaps3Reactify = await ymaps3.import('@yandex/ymaps3-reactify');
    const reactify = ymaps3Reactify.reactify.bindTo(React, ReactDOM);

    // основные модули
    const reactMap = reactify.module(ymaps3);
    const controlsMap = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
    const clusterMap = await ymaps3.import('@yandex/ymaps3-clusterer@0.0.1');
    const defaulMarkerMap = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

    map = {
        react: reactMap,
        controls: controlsMap,
        cluster: clusterMap,
        defaultMarker: defaulMarkerMap,
    } 

    return map;
}
