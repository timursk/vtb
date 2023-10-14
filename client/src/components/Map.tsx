import { useLoadYMaps } from '@/hooks/useLoadYMaps';
import { LngLat } from '@yandex/ymaps3-types';
import React from 'react';
import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

const coordinates: LngLat[] = [
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

export function Map() {
    const { YMaps, map } = useLoadYMaps({ coordinates });

    return <div style={{ width: '100%', height: '100vh' }}>{YMaps}</div>;
}