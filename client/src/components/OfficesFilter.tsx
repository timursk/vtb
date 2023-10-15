import Image from 'next/image';
import React, { useState } from 'react';

import styles from '../styles/OfficesFilter.module.css';
import * as RadioGroup from '@radix-ui/react-radio-group';

import crossIcon from '../assets/icons/crossIcon.svg';
import grayNavigationLogo from '../assets/icons/grayNavigatorIcon.svg';

interface IOfficesFilterProps {
    active: boolean;
}

const OfficesFilter: React.FC<IOfficesFilterProps> = ({ active }) => {
    const [activeClass, setActiveClass] = useState(true);
    const [isActive, setIsActive] = useState(active);

    return (
        <div
            className={styles.filter}
            style={{ display: isActive ? 'flex' : 'none' }}
        >
            <div className={styles.header}>
                <Image src={grayNavigationLogo} alt='grayNavLogo' />
                <span className={styles.header__text}>Санкт-Петербург</span>
                <span
                    className={styles.cross}
                    onClick={() => {
                        setIsActive(false);
                        console.log(active, ' = active');
                        console.log(isActive, ' = isActive');
                    }}
                >
                    <Image src={crossIcon} alt='cross' />
                </span>
            </div>
            <button className={styles.every}>Круглосуточно</button>
            <span className={styles.text__map}>Карты</span>
            <div className={styles.block}>
                <button
                    className={`${styles.credit} ${
                        activeClass
                            ? `${styles.active_button}`
                            : `${styles.inactive_button}`
                    }`}
                    onClick={() => setActiveClass(!active)}
                >
                    Кредитные
                </button>
                <button
                    className={`${styles.debet} ${
                        activeClass
                            ? `${styles.inactive_button}`
                            : `${styles.active_button}`
                    }`}
                    onClick={() => setActiveClass(false)}
                >
                    Дебетовые
                </button>
            </div>
            <span className={styles.filter__office}>Фильтры отделений</span>
            <RadioGroup.Root
                className={styles.RadioGroupRoot}
                defaultValue='default'
                aria-label='View density'
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RadioGroup.Item
                        className={styles.RadioGroupItem}
                        value='default'
                        id='r1'
                    >
                        <RadioGroup.Indicator
                            className={styles.RadioGroupIndicator}
                        />
                    </RadioGroup.Item>
                    <label className={styles.Label} htmlFor='r1'>
                        <span className={styles.faces}>Физические лица</span>
                    </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <RadioGroup.Item
                        className={styles.RadioGroupItem}
                        value='comfortable'
                        id='r2'
                    >
                        <RadioGroup.Indicator
                            className={styles.RadioGroupIndicator}
                        />
                    </RadioGroup.Item>
                    <label className={styles.Label} htmlFor='r2'>
                        <span className={styles.faces}>Юридические лица</span>
                    </label>
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '16px',
                    }}
                >
                    <RadioGroup.Item
                        className={styles.RadioGroupItem}
                        value='compact'
                        id='r3'
                    >
                        <RadioGroup.Indicator
                            className={styles.RadioGroupIndicator}
                        />
                    </RadioGroup.Item>
                    <label className={styles.Label} htmlFor='r3'>
                        <span className={styles.cowork}>
                            Корпоративные клиенты
                        </span>
                    </label>
                </div>
            </RadioGroup.Root>
            <span className={styles.text__user}>Задачи пользователя</span>
            <button className={styles.care}>Услуги страхования</button>
            <button className={styles.transfer}>
                Перевод денежных средств
            </button>
            <button className={styles.check}>Бронирование ячейки</button>
            <button className={styles.clear}>Сбросить фильтры</button>
        </div>
    );
};

export { OfficesFilter };
