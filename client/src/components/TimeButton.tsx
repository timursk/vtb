import Image from 'next/image';

import styles from '../styles/TimeButton.module.css';

import timeIcon from '../assets/icons/timeIcon.svg';

const TimeButton = () => {
  return (
    <button className={styles.time__button}>
      <Image src={timeIcon} width={20} height={20} alt='map-icon' />
      <span>Время ожидания</span>
    </button>
  );
};

export { TimeButton };
