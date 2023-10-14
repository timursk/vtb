'use client'

import Image from 'next/image';

import styles from '../styles/TimeButton.module.css';

import timeIcon from '../assets/icons/timeIcon.svg';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createQueryString } from '@/utils/helpers';
import { useState } from 'react';

const TimeButton = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const queryValue = searchParams.get('timeComplexity');

    const [isActive, setIsActive] = useState(queryValue ? true : false);

    const changeFilter = (name: string, value: string) => {
        const queryString = createQueryString(name, value, searchParams);

        router.push(pathname + '?' + queryString);
    };

    return (
        <button
            className={styles.time__button}
            onClick={() => {
                const currentIsActive = !isActive;
                setIsActive(currentIsActive);

                const value = currentIsActive ? String(true) : ''
                changeFilter('timeComplexity', value);
            }}
        >
            <Image src={timeIcon} width={20} height={20} alt='map-icon' />
            <span>Время ожидания</span>
        </button>
    );
};

export { TimeButton };
