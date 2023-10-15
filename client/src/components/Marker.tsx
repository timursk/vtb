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
    loadPercent = loadPercent || 0;

    return (
        <div className={styles.container}>
            <MarkerImage isActive={isActive} loadPercent={loadPercent} count={count} />
            
            {timeComplexity ? <MarkerTime time={'~ 15 минут'} /> : null}
        </div>
    );
}
