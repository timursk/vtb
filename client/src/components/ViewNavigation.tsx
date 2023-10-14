import Image from 'next/image';

import styles from '../styles/ViewNavigation.module.css';

import minusIcon from '../assets/icons/minusIcon.svg';
import plusIcon from '../assets/icons/plusIcon.svg';
import navigationPointer from '../assets/icons/navigationPointer.svg';

const ViewNavigation = () => {
  const circles = [plusIcon, minusIcon, navigationPointer].map(
    (item: string, idx: number) => (
      <div key={idx} className={styles.circle}>
        <Image src={item} alt='circle' />
      </div>
    )
  );

  return <div className={styles.block}>{circles}</div>;
};

export { ViewNavigation };
