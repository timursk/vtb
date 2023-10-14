import Image from 'next/image';

import styles from '../styles/ListItems.module.css';

import redCircleIcon from '../assets/icons/miniRedCircleIcon.svg';
import blueCircleIcon from '../assets/icons/miniBlueCircleIcon.svg.svg';
import vtbDarkIcon from '../assets/icons/vtbDarkIcon.svg';

interface IListItemsProps {
    offices: any;
}

const ListItems: React.FC<IListItemsProps> = ({ offices }) => {
    const itemsBody = offices.map((item: any, idx: number) => (
        <div key={`${item.hours}-${idx}`} className={styles.list}>
            <div className={styles.image}>
                <Image src={vtbDarkIcon} alt='vtbDarkIcon' />
            </div>
            <div className={styles.block}>
                <span className={styles.title}>Банкомат «ГУМ»</span>
                <span className={styles.address}>
                    г. Москва, Красная площадь д.3
                </span>
                <span className={styles.faces}>Физические лица</span>
                <span className={styles.faces}>Юридические лица</span>
                <span className={styles.hours}>Открыт до 19:00</span>
                <span className={styles.queue}>Время в очереди 15 минут</span>
                <span className={styles.metro}>
                    <Image src={blueCircleIcon} alt='blueMetroIcon' /> м.
                    Площадь Революции
                </span>
                <span className={styles.metro}>
                    <Image src={redCircleIcon} alt='redMetroIcon' /> м. Охотный
                    ряд
                </span>
            </div>
        </div>
    ));

    return <div className={styles.main}>{itemsBody}</div>;
};

export { ListItems };
