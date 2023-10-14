import { getLoadColor } from '@/utils/helpers';
import styles from './MarkerImage.module.css';
import classNames from 'classnames';

interface Props {
    isActive: boolean;
    loadPercent: number;
}

const Logo = (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
    >
        <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M20.88 9.182H5.358L6.478 6H22L20.88 9.182ZM20.32 10.773H4.7965L3.6765 13.9545H19.2L20.32 10.773ZM18.6425 15.5455H3.12L2 18.7275H17.5225L18.6425 15.5455Z'
            fill='white'
        />
    </svg>
);

const getLoader = ({
    percent,
    color,
    maxWidth = 20,
}: {
    percent: number;
    color: string;
    maxWidth?: number;
}) => {
    const width = (maxWidth / 100) * percent;

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width={maxWidth}
            height='4'
            viewBox='0 0 20 4'
            fill='none'
        >
            <path
                d='M0.00390625 2C0.00390625 1.17157 0.675479 0.5 1.50391 0.5H18.4961C19.3245 0.5 19.9961 1.17157 19.9961 2C19.9961 2.82843 19.3245 3.5 18.4961 3.5H1.50391C0.675479 3.5 0.00390625 2.82843 0.00390625 2Z'
                fill='white'
            />
            <rect y='0.5' width={width} height='3' rx='1.5' fill={color} />
        </svg>
    );
};

export function MarkerImage({ isActive, loadPercent }: Props) {
    const loadColor = getLoadColor(loadPercent);
    const activeStyle = isActive ? styles.enabled : styles.disabled;

    return (
        <div className={classNames(styles.marker, activeStyle)}>
            {Logo}
            {getLoader({ percent: loadPercent, color: loadColor })}
        </div>
    );
}
