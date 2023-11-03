import { AppLayout } from '@/components/AppLayout';
import { theme } from '@/lib/themeConfig';
import { ConfigProvider, MenuTheme, theme as antdTheme } from 'antd';
import { AppProps } from 'next/app';
import { useState } from 'react';

import "./global.css";
import { ThemeModeProvider, defaultThemeMode } from '@/components/ThemeModeContext';

export function App(props: AppProps) {
  // TODO add to Context
  const [themeMode, setThemeMode] = useState<MenuTheme>(defaultThemeMode);
  const toggleThemeMode = () => setThemeMode(themeMode === 'light' ? 'dark' : 'light');

  return (
    <ConfigProvider theme={{...theme, algorithm: themeMode === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm}}>
      <ThemeModeProvider themeMode={themeMode} toggleThemeMode={toggleThemeMode}>
        <AppLayout {...props} />
      </ThemeModeProvider>
    </ConfigProvider>
  );
}

export default App;