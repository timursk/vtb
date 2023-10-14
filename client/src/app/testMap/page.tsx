'use client';

import { Filter } from '@/components/Filter';
import { Map } from '@/components/Map';
import { TimeButton } from '@/components/TimeButton';
import { ViewButton } from '@/components/ViewButton';
import Script from 'next/script';
import { useState } from 'react';

// new https://yandex.ru/dev/maps/jsapi/?from=mapsapi
// token https://developer.tech.yandex.ru/services/3
// new api https://yandex.ru/dev/jsapi30/doc/ru/quickstart
// old api https://yandex.ru/dev/jsapi-v2-1/doc/ru/

export default function TestMap() {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            <Script
                src='https://api-maps.yandex.ru/v3/?apikey=9c0f6eee-2954-4fd4-be04-fef1fafef075&lang=ru_RU'
                onLoad={() => {
                    setIsLoaded(true);
                }}
            ></Script>

            {isLoaded ? (
                <>
                    <Filter />
                    
                    <Map />

                    <ViewButton />
                    <TimeButton />
                </>
            ) : (
                <span>ЗАГРУЗКА...</span>
            )}
        </>
    );
}
