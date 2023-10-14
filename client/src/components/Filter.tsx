'use client';

import { useState } from 'react';
import Image from 'next/image';
import * as Tabs from '@radix-ui/react-tabs';

import { OfficesList } from './OfficesList';
import { AtmsList } from './AtmsList';

import styles from '../styles/Filter.module.css';

import navigationPointer from '../assets/icons/navigationPointer.svg';
import settings from '../assets/icons/settings.svg';
import microphone from '../assets/icons/microphone.svg';
import vtbLogo from '../assets/vtb.svg';

import offices from '../store/offices.json';
import atms from '../store/atms.json';
import { OfficesFilter } from './OfficesFilter';

const Filter = () => {
  const [activeClass, setActiveClass] = useState(true);
  const [activeTab, setActiveTab] = useState(false);
  const [query, setQuery] = useState('');

  const handleChange = (e: any) => {
    setQuery(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className={styles.filter}>
      <div className={styles.logo}>
        <Image priority src={vtbLogo} height={32} width={87} alt='logo' />
      </div>
      <div className={styles.search}>
        <label className={styles.label} htmlFor=''>
          <input
            className={styles.input}
            type='text'
            placeholder='Город, улица, метро'
            value={query}
            onChange={handleChange}
          />
          <Image
            src={microphone}
            alt='microphone'
            style={{ cursor: 'pointer' }}
          />
        </label>
        <div className={styles.settings} onClick={() => setActiveTab(true)}>
          <Image src={settings} alt='settings' />
        </div>
      </div>
      <button className={styles.smart__button}>
        <span>Умная навигация</span>
        <Image src={navigationPointer} alt='navigation' />
      </button>
      <div>
        <Tabs.Root style={{ height: '200px' }} defaultValue='offices'>
          <Tabs.List className={styles.filters_button}>
            <Tabs.Trigger
              className={`${styles.offices} ${
                activeClass
                  ? `${styles.active_button}`
                  : `${styles.inactive_button}`
              }`}
              value='offices'
              onClick={() => setActiveClass(true)}
            >
              Отделения
            </Tabs.Trigger>
            <Tabs.Trigger
              className={`${styles.atms} ${
                activeClass
                  ? `${styles.inactive_button}`
                  : `${styles.active_button}`
              }`}
              value='atms'
              onClick={() => setActiveClass(false)}
            >
              Банкоматы
            </Tabs.Trigger>
          </Tabs.List>
          <div className={styles.range}>
            <span>В радиусе 1 км</span>
          </div>
          <Tabs.Content value='offices'>
            <OfficesList offices={offices} />
          </Tabs.Content>
          <Tabs.Content value='atms'>
            <AtmsList atms={...atms} />
          </Tabs.Content>
        </Tabs.Root>
      </div>

      {activeTab && <OfficesFilter />}
    </div>
  );
};

export { Filter };
