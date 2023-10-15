import Image from 'next/image';

import styles from '../styles/ViewNavigation.module.css';
import * as Dialog from '@radix-ui/react-dialog';

import minusIcon from '../assets/icons/minusIcon.svg';
import plusIcon from '../assets/icons/plusIcon.svg';
import navigationPointer from '../assets/icons/navigationPointer.svg';
import crossIcon from '../assets/icons/crossIcon.svg';

const ViewNavigation = () => {
    const circles = [plusIcon, minusIcon].map((item: string, idx: number) => (
        <div key={idx} className={styles.circle}>
            <Image src={item} alt='circle' />
        </div>
    ));

    return (
        <div className={styles.block}>
            {circles}
            <Dialog.Root>
                <Dialog.Trigger asChild>
                    <div className={styles.circle}>
                        <Image src={navigationPointer} alt='circle' />
                    </div>
                </Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay className={styles.DialogOverlay} />
                    <Dialog.Content className={styles.DialogContent}>
                        <div className={styles.block__modal}>
                            <Dialog.Title className={styles.DialogTitle}>
                                Ваше местоположение недоступно
                            </Dialog.Title>
                            <Dialog.Description
                                className={styles.DialogDescription}
                            >
                                Мы не смогли определить Вашу геопозицию.
                                Включите геолокацию или введите в строку поиска
                                ближайший ориентир.
                            </Dialog.Description>
                            <Dialog.Close asChild>
                                <button className={styles.Button}>
                                    <span>Включить геопозицию</span>
                                </button>
                            </Dialog.Close>
                            <Dialog.Close asChild>
                                <div className={styles.cross}>
                                    <Image
                                        src={crossIcon}
                                        width={32}
                                        height={32}
                                        alt='cross'
                                    />
                                </div>
                            </Dialog.Close>
                        </div>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
};

export { ViewNavigation };
