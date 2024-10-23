"use client";

import Link from 'next/link'
import styles from '../styles/header.module.scss';
import { useStore } from '@/store';
import { useEffect } from 'react';

export default function Header() {
    const { name } = useStore();
    
    useEffect(() => {
      useStore.persist.rehydrate();
    }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.leftSection}>
            <Link href="/" className={styles.logo}>
              Название
            </Link>
            <nav className={styles.navigation}>
              <ul>
                <li>
                  <Link href="/"><h4>Главная</h4></Link>
                </li>
                <li>
                  <Link href="/calculator"><h4>Калькулятор</h4></Link>
                </li>
                <li>
                  <Link href="/generator"><h4>Генератор</h4></Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className={styles.userSection}>
            <span className={styles.userName}>{name}</span>
            <div className={styles.userAvatar}>{name && name[0]} </div>
          </div>
        </div>
      </div>
    </header>
  )
}