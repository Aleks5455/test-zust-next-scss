import styles from "@/styles/calculator.module.scss";
import "../styles/global.scss";
import { useStore } from "@/store";
import { useCallback, useEffect } from "react";
import Header from "@/components/Header";

const buttons = [
  "C",
  "+/-",
  "%",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  ".",
  "0",
  "backspace",
  "=",
];

const operators = ["+", "-", "*", "/", "%"];

export default function Calculator() {
  const { display, result, setDisplay, clear, calculate } = useStore();

  const formatResult = (value: string) => {
    if (!value) return "";
    const [integerPart, decimalPart] = value.split('.');
    const formattedIntegerPart = parseInt(integerPart).toLocaleString('en-US');
    return decimalPart ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
  };

  const handleButtonClick = useCallback(
    (value: string) => {
      switch (value) {
        case "C":
          clear();
          break;
        case "=":
          calculate();
          break;
        case "×":
          value = "*";
        case "÷":
          if (value === "÷") value = "/";
        case "+":
        case "-":
        case "%":
          if (display === "" || operators.includes(display.slice(-1))) {
            return;
          }
          const newDisplay = display.replace(/[+\-*/%]$/, "") + value;
          setDisplay(newDisplay);
          break;
        case "+/-":
          if (display.startsWith("-")) {
            setDisplay(display.slice(1));
          } else {
            setDisplay("-" + display);
          }
          break;
        case "backspace":
          setDisplay(display.slice(0, -1));
          break;
        default:
          if (value === "." && display.includes(".")) {
            const parts = display.split(/[+\-*/%]/);
            if (parts[parts.length - 1].includes(".")) {
              return;
            }
          }
          setDisplay(display + value);
      }
    },
    [display, clear, calculate, setDisplay]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const key = event.key;
      if (/^[0-9.+\-*/%=]$/.test(key) || key === "Enter" || key === "Backspace") {
        event.preventDefault();
        if (key === "Enter") {
          calculate();
        } else if (key === "Backspace") {
          handleButtonClick("backspace");
        } else {
          handleButtonClick(key === "*" ? "×" : key === "/" ? "÷" : key);
        }
      }
    },
    [calculate, handleButtonClick]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const getButtonContent = (btn: string) => {
    switch (btn) {
      case "backspace":
        return <img src="/backspace.svg" alt="backspace" width={24} height={16} />;
      case "+/-":
        return <img src="/plus-minus.svg" alt="plus-minus" width={24} height={21} />;
      default:
        return btn;
    }
  };

  return (
    <>
      <Header />
      <div className={styles.calculator}>
        <div className={styles.display}>
          <div className={styles.calculation}>{display || "0"}</div>
          <div className={styles.result}>{formatResult(result)}</div>
        </div>
        <div className={styles.buttons}>
          {buttons.map((btn) => (
            <button
              key={btn}
              onClick={() => handleButtonClick(btn)}
              className={`${styles.button} ${["÷", "×", "-", "+", "="].includes(btn) ? styles.operation : ""} ${
                ["C", "+/-", "%"].includes(btn) ? styles.grayOperation : ""
              }`}
            >
              {getButtonContent(btn)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
