'use client';

import { Atm } from '@/types/IAtms';
import { Offices } from '@/types/IOffices';
import { getNearestAtm, getNearestOffice } from '@/utils/services';
import { LngLat } from '@yandex/ymaps3-types';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface Props {
    geo: LngLat | null;
}

export const SpeechRecognition = ({ geo }: Props) => {
    // const searchParams = useSearchParams();
    // const type = searchParams.get('type');

    // const recognizer = new webkitSpeechRecognition();
    useEffect(() => {
        // @ts-ignore
        var recognizer = new webkitSpeechRecognition();
        recognizer.interimResults = true;
        recognizer.lang = 'ru-Ru';

        recognizer.onresult = function (event: any) {
            const result = event.results[event.resultIndex];

            if (result.isFinal) {
                const phrase = result[0].transcript.toLowerCase();
                console.log('Итог: ', phrase);
                const isSearch = phrase.includes('найти') || phrase.includes('найди');
                const isAtm = phrase.includes('банкомат');
                const isOffice = phrase.includes('офис');

                if (isSearch && geo) {
                    // получаем ближайший офис/банкомат и открываем карту с маршрутом
                    if (isOffice) {
                        getNearestOffice(geo, (officeGeo: Offices) => {
                            window.open(
                                `https://yandex.ru/maps/?mode=routes&rtext=${geo[1]},${geo[0]}~${officeGeo.coords.lat},${officeGeo.coords.lon}`,
                                '_blank'
                            );
                        });
                    } else if (isAtm) {
                        getNearestAtm(geo, (atm: Atm) => {
                            window.open(
                                `https://yandex.ru/maps/?mode=routes&rtext=${geo[1]},${geo[0]}~${atm.coords.lat},${atm.coords.lon}`,
                                '_blank'
                            );
                        });
                    }
                }
            } else {
                console.log('Промежуточный результат: ', result[0].transcript);
            }
        };

        recognizer.start();
        window.TEST = recognizer;
    }, []);

    return <button onClick={() => {
        window.TEST?.start();
    }}>start speech</button>;
};
