import { MarkerImage } from './MarkerImage';

interface Props {
    isActive: boolean;
    loadPercent?: number;
}

export function Marker({ isActive, loadPercent }: Props) {
    loadPercent = loadPercent || 0;
    
    return (
        <div>
            <MarkerImage isActive={isActive} loadPercent={loadPercent} />
        </div>
    );
}
