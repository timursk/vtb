import Image from 'next/image';

import { officesTextFormatter } from '@/utils/officeHelpers';

import styles from '../styles/OfficesList.module.css';

import iconVtb from '../assets/icons/iconVtb.svg';

interface IOfficesProps {
    offices: any;
}

const OfficesList: React.FC<IOfficesProps> = ({ offices }) => {
    // const officesTimeFormatter = (time: string) => {
    //   let kek = time.split(' ')[0];
    //   console.log(kek);
    //   return kek;
    // };

    const officeBody = offices.map((item: any, idx: number) => (
        <li key={`${item.distance}-${item.latitude}`}>
            <Image src={iconVtb} alt='iconVtb' />
            <div className={styles.block}>
                <span className={styles.block__text}>
                    {officesTextFormatter(item.address)}
                </span>
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

    return <ul className={styles.list}>{officeBody}</ul>;
};

export { OfficesList };
