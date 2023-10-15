import { MarkerImage } from './MarkerImage';
import { MarkerTime } from './MarkerTime';
import styles from './Marker.module.css';

interface Props {
    isActive: boolean;
    loadPercent?: number;
    timeComplexity: boolean;
    count?: number;
}

export function Marker({
    isActive,
    loadPercent,
    timeComplexity,
    count,
}: Props) {
    loadPercent = loadPercent ? (loadPercent * 10) : 0;
    const step = 100 / 15;
    const stepsCount = Math.floor(loadPercent / step);
    const minutes = (15 - stepsCount);
    let time = loadPercent ? `~ ${minutes} минут` : null;

    if (time && minutes) {
        if (minutes === 1) {
            time += 'a';
        }
        else if (minutes >= 2 && minutes <= 4) {
            time += 'ы';
        }
    }

    return (
        <div className={styles.container}>
            <MarkerImage isActive={isActive} loadPercent={loadPercent} count={count} />
            
            {(timeComplexity && time && isActive) ? <MarkerTime time={time} /> : null}
        </div>
    );
}
