import Image from 'next/image';
import * as RadioGroup from '@radix-ui/react-radio-group';

import styles from '../styles/OfficesFilter.module.css';

import crossIcon from '../assets/icons/crossIcon.svg';
import grayNavigationLogo from '../assets/icons/grayNavigatorIcon.svg';

const OfficesFilter = () => {
    //trash perepisat'

    return (
        <div className={styles.filter}>
            <div className={styles.header}>
                <Image src={grayNavigationLogo} alt='grayNavLogo' />
                <span className={styles.header__text}>Санкт-Петербург</span>
                <Image src={crossIcon} alt='cross' />
            </div>
            <span className={styles.smart}>Умная навигация</span>
            <button className={styles.every}>Круглосуточно</button>
            <span className={styles.text__map}>Карты</span>
            <div className={styles.block}>
                <button className={styles.credit}>Кредитные</button>
                <button className={styles.debet}>Дебетовые </button>
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
                        id='1'
                    >
                        <RadioGroup.Indicator
                            className={styles.RadioGroupIndicator}
                        />
                    </RadioGroup.Item>
                    <label className={styles.Label} htmlFor='r1'>
                        Default
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
                        Comfortable
                    </label>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                        Compact
                    </label>
                </div>
            </RadioGroup.Root>
            <span className={styles.faces}>Физические лица</span>
            <span className={styles.faces}>Юридические лица</span>
            <span className={styles.cowork}>Корпоративные клиенты</span>

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
