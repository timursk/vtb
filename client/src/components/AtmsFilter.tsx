import Image from 'next/image';

import styles from '../styles/AtmsFilter.module.css';

import crossIcon from '../assets/icons/crossIcon.svg';
import hourglassIcon from '../assets/icons/Hourglass.svg';
import usersIcon from '../assets/icons/Users.svg';
import matterIcon from '../assets/icons/matter (1).svg';
import disabledPersonIcon from '../assets/icons/matter (2).svg';

const AtmsFilter = () => {
    return (
        <div className={styles.filter}>
            <div className={styles.header}>
                <span className={styles.title}>Банкомат «ГУМ»</span>
                <span className={styles.cross}>
                    <Image src={crossIcon} alt='crossIcon' />
                </span>
            </div>
            <span className={styles.address}>
                г. Москва, Красная площадь д.3
            </span>
            <button className={styles.road}>Проложить маршрут</button>
            <button className={styles.goto}>Записаться в отделение</button>
            <span className={styles.load}>Загруженность</span>
            <div className={styles.load__block}>
                <div className={styles.load__block__one}>
                    <Image
                        src={hourglassIcon}
                        height={24}
                        width={24}
                        alt='hourglassIcon'
                    />
                </div>
                <div className={styles.load__block__two}>
                    <span className={styles.load_time}>~ 15-20 минут</span>
                    <span className={styles.about_load_time}>
                        Время в очереди сейчас
                    </span>
                </div>
            </div>
            <span className={styles.support}>Обслуживание</span>
            <div className={styles.load__block}>
                <div className={styles.load__block__one}>
                    <Image
                        src={usersIcon}
                        height={24}
                        width={24}
                        alt='hourglassIcon'
                    />
                </div>
                <div className={styles.load__block__two}>
                    <span className={styles.load_time}>Физические лица</span>
                    <span className={styles.about_load_time}>
                        Все клиенты банка
                    </span>
                </div>
            </div>
            <div className={styles.load__block}>
                <div className={styles.load__block__one}>
                    <Image
                        src={matterIcon}
                        height={52}
                        width={52}
                        alt='hourglassIcon'
                    />
                </div>
                <div className={styles.load__block__two}>
                    <span className={styles.load_time}>
                        Зона премиального обслуживания
                    </span>
                    <span className={styles.about_load_time}>
                        Клиенты с пакетом «Привелегия»
                    </span>
                </div>
            </div>
            <span className={styles.access}>Доступная среда</span>
            <div className={styles.load__block}>
                <div className={styles.load__block__one}>
                    <Image
                        src={disabledPersonIcon}
                        height={52}
                        width={52}
                        alt='hourglassIcon'
                    />
                </div>
                <div className={styles.load__block__two}>
                    <span className={styles.load_time}>
                        Доступно для маломобилных граждан
                    </span>
                </div>
            </div>
            <span className={styles.worktime__text}>Время работы</span>
            <span className={styles.face}>Для физических лиц</span>
            <span className={styles.worktime}>пн-вс: 10:00-22:00</span>
            <span className={styles.near__metro}>Ближайшая станция метро</span>
            <span className={styles.metro}>м. Площадь Революции </span>
            <span className={styles.metro__info}>
                Арабатско-Покровская линия • 245 м
            </span>
        </div>
    );
};

export { AtmsFilter };
