'use client';

import Image from 'next/image';
import { useState } from 'react';

import { ViewNavigation } from './ViewNavigation';
import { ListItems } from './ListItems';

import styles from '../styles/ViewButton.module.css';

import mapIcon from '../assets/icons/mapIcon.svg';
import listIcon from '../assets/icons/listIcon.svg';

import offices from '../store/offices.json';

const ViewButton = () => {
    const [view, setView] = useState(true);

    return (
        <>
            <button
                className={styles.view__button}
                onClick={() => setView(!view)}
            >
                <Image
                    src={view ? listIcon : mapIcon}
                    width={20}
                    height={20}
                    alt='map-icon'
                />
                <span>{view ? 'Списком' : 'На карте'}</span>
            </button>

            {view ? <ViewNavigation /> : <ListItems offices={offices} />}
        </>
    );
};

export { ViewButton };
