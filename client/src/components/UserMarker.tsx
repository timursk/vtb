import Image from 'next/image';
import userMarkerImg from '@/assets/icons/userGeoMarker.svg';
import styles from './UserMarker.module.css';

interface Props {}

export function UserMarker({}: Props) {
    return (
        <div className={styles.marker}>
            <Image src={userMarkerImg} alt={'Маркер геолокации'} />
        </div>
    );
}
