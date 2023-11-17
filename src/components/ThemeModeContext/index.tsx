import { MenuTheme } from "antd";
import { createContext } from "react";

type ThemeModeProps = {
  themeMode: MenuTheme;
  toggleThemeMode: () => void;
};

export type ThemeModeProviderProps = {
  children: React.ReactNode
} & ThemeModeProps;


export const defaultThemeMode: MenuTheme = "light";

export const ThemeModeContext = createContext<ThemeModeProps>({
  themeMode: defaultThemeMode,
  toggleThemeMode: () => {},
});

export function ThemeModeProvider({ themeMode, toggleThemeMode, children }: ThemeModeProviderProps) {
  return (
    <ThemeModeContext.Provider value={{ themeMode, toggleThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}