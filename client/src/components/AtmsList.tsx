import Image from 'next/image';

import iconVtb from '../assets/icons/iconVtb.svg';

import styles from '../styles/AtmsList.module.css';

interface IAtmsProps {
  atms: any;
}

const AtmsList: React.FC<IAtmsProps> = ({ atms }) => {
  const atmsBody = atms.map((item: any, idx: number) => (
    <li key={`${item.distance}-${item.latitude}`}>
      <Image src={iconVtb} alt='iconVtb' />
      <div className={styles.block}>
        <span className={styles.block__text}>{item.address}</span>
        <span
          key={`${item.distance}-${item.latitude}-${idx}`}
          className={styles.block__text_sec}
        >
          09:00-22:00
        </span>
        {/* {item.openHoursIndividual.map((hour: any, idx: number) => (

            {hour.hours === 1 ? hour.hours : ''}
          </span>
        ))} */}
      </div>
      <div className={styles.second__block}>
        <span>2.1 км</span>
      </div>
    </li>
  ));

  return <ul className={styles.list}>{atmsBody}</ul>;
};

export { AtmsList };
