'use client';

import { useCallback, useState } from 'react';
import Image from 'next/image';
import * as Tabs from '@radix-ui/react-tabs';

import { OfficesList } from './OfficesList';
import { AtmsList } from './AtmsList';

import styles from '../styles/Filter.module.css';

import navigationPointer from '../assets/icons/navigationPointer.svg';
import settings from '../assets/icons/settings.svg';
import microphone from '../assets/icons/microphone.svg';
import vtbLogo from '../assets/vtb.svg';

import offices from '../store/offices.json';
import atms from '../store/atms.json';
import { OfficesFilter } from './OfficesFilter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createQueryString, debounce } from '@/utils/helpers';
import { LngLat } from '@yandex/ymaps3-types';
import { getNearestAtm, getNearestOffice } from '@/utils/services';
import { Offices } from '@/types/IOffices';
import { Atm } from '@/types/IAtms';

interface Props {
    geo: LngLat | null;
}

const Filter = ({ geo }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const type = searchParams.get('type');

    const [activeClass, setActiveClass] = useState(true);

    const [activeTab, setActiveTab] = useState(false);

    const [query, setQuery] = useState('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const changeInputQuery = useCallback(
        debounce((val: string) => {
            changeFilter('search', val);
        }, 1000),
        []
    );

    const handleChange = (e: any) => {
        setQuery(e.target.value);
        changeInputQuery(e.target.value);
    };

    const changeFilter = (name: string, value: string) => {
        const queryString = createQueryString(name, value, searchParams);

        router.push(pathname + '?' + queryString);
    };

    return (
        <div className={styles.filter}>
            <div className={styles.logo}>
                <Image
                    priority
                    src={vtbLogo}
                    height={32}
                    width={87}
                    alt='logo'
                />
            </div>

            <div className={styles.search}>
                <label className={styles.label} htmlFor=''>
                    <input
                        className={styles.input}
                        type='text'
                        placeholder='Город, улица, метро'
                        value={query}
                        onChange={handleChange}
                    />
                    <Image
                        src={microphone}
                        alt='microphone'
                        style={{ cursor: 'pointer' }}
                    />
                </label>
                <div
                    className={styles.settings}
                    onClick={() => setActiveTab(true)}
                >
                    <Image src={settings} alt='settings' />
                </div>
            </div>

            <button
                className={styles.smart__button}
                onClick={() => {
                    if (geo) {
                        // получаем ближайший офис/банкомат и открываем карту с маршрутом
                        if (type === 'offices') {
                            getNearestOffice(geo, (officeGeo: Offices) => {
                                window.open(
                                    `https://yandex.ru/maps/?mode=routes&rtext=${geo[1]},${geo[0]}~${officeGeo.coords.lat},${officeGeo.coords.lon}`,
                                    '_blank'
                                );
                            });
                        } else {
                            getNearestAtm(geo, (atm: Atm) => {
                                window.open(
                                    `https://yandex.ru/maps/?mode=routes&rtext=${geo[1]},${geo[0]}~${atm.coords.lat},${atm.coords.lon}`,
                                    '_blank'
                                );
                            });
                        }
                    }
                }}
            >
                <span>Умная навигация</span>
                <Image src={navigationPointer} alt='navigation' />
            </button>

            <div>
                <Tabs.Root style={{ height: '200px' }} defaultValue='offices'>
                    <Tabs.List className={styles.filters_button}>
                        <Tabs.Trigger
                            className={`${styles.offices} ${
                                activeClass
                                    ? `${styles.active_button}`
                                    : `${styles.inactive_button}`
                            }`}
                            value='offices'
                            onClick={() => {
                                setActiveClass(true);

                                changeFilter('type', 'offices');
                            }}
                        >
                            Отделения
                        </Tabs.Trigger>

                        <Tabs.Trigger
                            className={`${styles.atms} ${
                                activeClass
                                    ? `${styles.inactive_button}`
                                    : `${styles.active_button}`
                            }`}
                            value='atms'
                            onClick={() => {
                                setActiveClass(false);

                                changeFilter('type', 'atms');
                            }}
                        >
                            Банкоматы
                        </Tabs.Trigger>
                    </Tabs.List>

                    <div className={styles.range}>
                        <span>В радиусе 1 км</span>
                    </div>

                    <Tabs.Content value='offices'>
                        <OfficesList offices={offices} />
                    </Tabs.Content>

                    <Tabs.Content value='atms'>
                        <AtmsList atms={...atms} />
                    </Tabs.Content>
                </Tabs.Root>
            </div>

            {activeTab && <OfficesFilter />}
        </div>
    );
};

export { Filter };
