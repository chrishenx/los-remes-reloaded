import { AppLayout } from '@/components/AppLayout';
import { theme } from '@/lib/themeConfig';
import { ConfigProvider, MenuTheme, theme as antdTheme } from 'antd';
import { AppProps } from 'next/app';
import { useState } from 'react';

import "./global.css";
import { ThemeModeProvider, defaultThemeMode } from '@/components/ThemeModeContext';
import Head from 'next/head';
import { PageProps } from '@/types/pageProps';

export function App(props: AppProps<PageProps>) {
  // TODO add to Context
  const [themeMode, setThemeMode] = useState<MenuTheme>(defaultThemeMode);
  const toggleThemeMode = () => setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  const title = `LosRemesReloaded: ${props.pageProps.name}`;
  return (
    <ConfigProvider theme={{...theme, algorithm: themeMode === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm}}>
      <Head>
        <title>
          {title}
        </title>
      </Head>
      <ThemeModeProvider themeMode={themeMode} toggleThemeMode={toggleThemeMode}>
        <AppLayout {...props} />
      </ThemeModeProvider>
    </ConfigProvider>
  );
}

export default App;