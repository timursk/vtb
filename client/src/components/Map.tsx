import { useGetYMapContent } from '@/hooks/useGetYMapContent';
import { useLoadYMaps } from '@/hooks/useLoadYMaps';
import { LngLat } from '@yandex/ymaps3-types';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { ViewButton } from './ViewButton';
import { TimeButton } from './TimeButton';
import { Filter } from './Filter';
import { SpeechRecognition } from './SpeechRecognition';
import { AtmsFilter } from './AtmsFilter';

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
    // const searchParams = useSearchParams();
    // const type = searchParams.get('type');

    const { YMaps, map, userGeo, offices, atms, changeCenter, getYMapsPos } =
        useLoadYMaps({});

    const { YMapContent } = useGetYMapContent({
        // coordinates: [],
        coordinates,
        geo: userGeo,
        offices,
        atms,
        changeCenter: changeCenter,
    });

    if (!YMaps) {
        return;
    }

    return (
        <>
            <Filter geo={userGeo} />
            <AtmsFilter atms={atms} />

            <div style={{ width: '100%', height: '100vh' }}>
                <YMaps>{YMapContent}</YMaps>
            </div>
            
            <ViewButton />
            <TimeButton />
        </>
    );
}
