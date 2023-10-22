import { theme } from '@/lib/themeConfig';
import { ConfigProvider, Layout, Menu, MenuTheme, theme as antdTheme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Image from 'next/image';
import { useState } from 'react';

export function AppLayout() {
  const [themeMode, setThemeMode] = useState<MenuTheme>('light');

  return (
    <ConfigProvider theme={{...theme, algorithm: themeMode === 'light' ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm}}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={true}>
          <div className="logo">
            <Image src="/logo3.jpeg" alt="LosRemes Reloaded" height={100} />
          </div>
          <Menu 
            theme={themeMode}
            mode="inline"
            items={[
              
            ]}
            />
        </Sider>
      </Layout>
    </ConfigProvider>
  );
}
