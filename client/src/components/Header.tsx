import Image from 'next/image';
import Link from 'next/link';

import styles from './Header.module.css';

import vtbLogo from '../../public/vtb.svg';
import greenCircle from '../../public/greenCircle.svg';
import grayCircle from '../../public/grayCircle.svg';
import yellowCircle from '../../public/yellowCircle.svg';
import redCircle from '../../public/redCircle.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__logo}>
        <Link href={'/'}>
          <Image priority src={vtbLogo} height={32} width={87} alt='logo' />
        </Link>
      </div>
      <nav className={styles.header__nav}>
        <ul className={styles.header__ul}>
          <li>
            <Image
              priority
              src={greenCircle}
              height={16}
              width={16}
              alt='circle'
            />
            <span>Низкая загруженность</span>
          </li>
          <li>
            <Image
              priority
              src={yellowCircle}
              height={16}
              width={16}
              alt='circle'
            />
            <span>Средняя загруженность</span>
          </li>
          <li>
            <Image
              priority
              src={redCircle}
              height={16}
              width={16}
              alt='circle'
            />
            <span>Высокая загруженность</span>
          </li>
          <li>
            <Image
              priority
              src={grayCircle}
              height={16}
              width={16}
              alt='circle'
            />
            <span>Офис закрыт</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };
