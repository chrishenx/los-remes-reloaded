import { Button, Layout, Typography, theme } from 'antd';
import { AppProps } from 'next/app';
import { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { PageProps } from '@/types/pageProps';
import { AppDrawer } from './Drawer';

const { Header, Content } = Layout;

type AppLayoutProps = AppProps<PageProps>;

export function AppLayout({ Component, pageProps }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, colorPrimaryBg, colorText },
  } = theme.useToken();

  return (
    <Layout style={{height: "100vh"}}>
      <AppDrawer collapsed={collapsed} onCollapse={() => setCollapsed(true)} />
      <Layout>
        <Header style={{ background: colorPrimaryBg, padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: '58px',
            }}
          />
          <Typography.Title level={3} style={{ display: "inline", color: colorText, margin: 0, marginLeft: 4 }}>
            {pageProps.name}
          </Typography.Title>
        </Header> 
        <Content style={{ background: colorBgContainer }}>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </Layout>
  );
}