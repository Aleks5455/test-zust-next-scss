"use client";

import { useState } from "react";
import styles from "../styles/generator.module.scss";
import "../styles/global.scss";
import usePasswordStore from "@/store/password-store";
import { PasswordOptions } from "@/app/types";
import Header from "@/components/Header";

export default function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [options, setOptions] = useState<PasswordOptions>({
    useUppercase: true,
    useLowercase: true,
    useNumbers: false,
    useSymbols: false,
    avoidRepetition: false,
  });

  const { passwords, generatePasswords } = usePasswordStore();

  const handleOptionChange = (option: keyof PasswordOptions) => {
    setOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePasswords(length, options);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.generator_wrapper}>
          <h1 className={styles.title}>Генератор паролей</h1>
          <div className={styles.content}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <h3>Длина пароля:</h3>
              <input
                className={styles.lengthInput}
                type="number"
                id="length"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                min="4"
                max="32"
              />
              <div className={styles.options}>
                <label>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={options.useUppercase}
                    onChange={() => handleOptionChange("useUppercase")}
                  />
                  Использовать прописные буквы
                </label>
                <label>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={options.useLowercase}
                    onChange={() => handleOptionChange("useLowercase")}
                  />
                  Использовать строчные буквы
                </label>
                <label>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={options.useNumbers}
                    onChange={() => handleOptionChange("useNumbers")}
                  />
                  Использовать цифры
                </label>
                <label>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={options.useSymbols}
                    onChange={() => handleOptionChange("useSymbols")}
                  />
                  Использовать символы: %, *, ), ?, @, #, $, ~
                </label>
                <label>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={options.avoidRepetition}
                    onChange={() => handleOptionChange("avoidRepetition")}
                  />
                  Избегать повторения символов
                </label>
              </div>
              <button type="submit" className={styles.generateButton}>
                Сгенерировать пароль
              </button>
            </form>
          </div>
        </div>

        <div className={styles.passwordList}>
          {passwords.map((password, index) => (
            <div key={index} className={styles.passwordItem}>
              <span>{password}</span>
              <button className={styles.copyButton} onClick={() => navigator.clipboard.writeText(password)}>
                <img src="/png/copy-icon.png" alt="copy" width={16} height={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
