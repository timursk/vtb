import { MarkerImage } from './MarkerImage';

interface Props {}

export function Marker() {
    return (
        <div>
            <MarkerImage isActive={true} loadPercent={70} />
        </div>
    );
}
