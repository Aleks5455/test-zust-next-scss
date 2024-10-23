import { PasswordState } from "@/app/types";
import { create } from "zustand";

const usePasswordStore = create<PasswordState>((set) => ({
  passwords: [],
  generatePasswords: (length, options) => {
    const charset = {
      uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      lowercase: "abcdefghijklmnopqrstuvwxyz",
      numbers: "0123456789",
      symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
    };

    let characters = "";
    if (options.useUppercase) characters += charset.uppercase;
    if (options.useLowercase) characters += charset.lowercase;
    if (options.useNumbers) characters += charset.numbers;
    if (options.useSymbols) characters += charset.symbols;

    const generatePassword = () => {
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
      }
      return password;
    };

    const newPasswords = Array(5)
      .fill(null)
      .map(() => generatePassword());
    set({ passwords: newPasswords });
  },
}));

export default usePasswordStore;