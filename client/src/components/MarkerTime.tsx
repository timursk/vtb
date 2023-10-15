import Image from 'next/image';
import styles from './MarkerTime.module.css';
import hourglassImg from '@/assets/icons/hourglass.svg';
import arrowTopImg from '@/assets/icons/arrowTop.svg';

interface Props {
    time: string;
}

export function MarkerTime({ time }: Props) {
    return (
        <div className={styles.container}>
            <Image src={hourglassImg} alt={'hourglass icon'} />
            <Image className={styles.arrow} src={arrowTopImg} alt={'arrow icon'} />
            <div>{time}</div>
        </div>
    );
}
