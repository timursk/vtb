'use client';

import Image from 'next/image';

import styles from '../styles/TimeButton.module.css';

import timeActiveIcon from '@/assets/icons/workloadActive.svg';
import timeIcon from '../assets/icons/timeIcon.svg';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createQueryString } from '@/utils/helpers';
import { useState } from 'react';
import classNames from 'classnames';

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
            className={classNames(
                styles.time__button,
                isActive ? styles.active : ''
            )}
            onClick={() => {
                const currentIsActive = !isActive;
                setIsActive(currentIsActive);

                const value = currentIsActive ? String(true) : '';
                changeFilter('timeComplexity', value);
            }}
        >
            <Image
                src={isActive ? timeActiveIcon : timeIcon}
                width={20}
                height={20}
                alt='map-icon'
            />
            <span>Время ожидания</span>
        </button>
    );
};

export { TimeButton };
