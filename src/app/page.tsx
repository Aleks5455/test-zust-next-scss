"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/store";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/home.module.scss";
import "../styles/global.scss";

export default function Home() {
  const [localName, setLocalName] = useState("");
  const { name: globalName, setName: setGlobalName } = useStore();

  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setLocalName(savedName);
      setGlobalName(savedName);
    }
  }, [setGlobalName]);

  const handleSaveName = () => {
    const regex = /^[a-zA-Zа-яА-Я0-9_-ё]+$/;
    if (regex.test(localName)) {
      localStorage.setItem("userName", localName);
      setGlobalName(localName);
    } else {
      alert("Имя должно содержать только буквы русского и английского алфавитов, цифры, _ и -");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose}>
          <Image src="/cross.svg" width={10} height={10} alt="cross" />
        </button>
        <h2 className={styles.modalTitle}>Начать</h2>
        <p className={styles.modalText}>Напишите ваше имя</p>
        <input
          type="text"
          value={localName}
          onChange={(e) => setLocalName(e.target.value)}
          placeholder="Ваше имя"
          className={styles.modalInput}
        />
        {globalName && <p className={styles.savedName}>Сохраненное имя: {globalName}</p>}
        <div className={styles.modalButtons}>
          <button className={styles.modalButton} onClick={handleSaveName}>
            Сохранить имя
          </button>
          <Link href="/calculator" className={styles.modalButton}>
            Открыть калькулятор
          </Link>
          <Link href="/generator" className={styles.modalButton}>Открыть генератор</Link>
        </div>
      </div>
    </div>
  );
}
