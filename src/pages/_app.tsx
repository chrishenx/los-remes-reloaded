import { AppLayout } from '@/components/AppLayout';
import { theme } from '@/lib/themeConfig';
import { ConfigProvider, MenuTheme, theme as antdTheme } from 'antd';
import { AppProps } from 'next/app';
import { useState } from 'react';

export function App(props: AppProps) {
  const [themeMode, setThemeMode] = useState<MenuTheme>('light');

  return (
    <ConfigProvider theme={{...theme, algorithm: themeMode === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm}}>
      <AppLayout {...props} themeMode={themeMode} setThemeMode={setThemeMode} />
    </ConfigProvider>
  );
}

export default App;