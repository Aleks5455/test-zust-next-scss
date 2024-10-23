export type PasswordState = {
  passwords: string[];
  generatePasswords: (length: number, options: PasswordOptions) => void;
};

export type PasswordOptions = {
  useUppercase: boolean;
  useLowercase: boolean;
  useNumbers: boolean;
  useSymbols: boolean;
  avoidRepetition: boolean;
};
