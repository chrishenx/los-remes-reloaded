import { Button, Flex, Layout, Typography, theme } from 'antd';
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
    <Layout style={{ height: "100vh" }}>
      <AppDrawer collapsed={collapsed} onCollapse={() => setCollapsed(true)} />
      <Layout>
        <Header style={{ display: "flex", alignItems: "center", background: colorPrimaryBg, padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: '58px',
            }}
          />
          <Flex style={{ color: colorText, marginLeft: 4, display: "inline-flex" }} vertical>
            <Typography.Title level={3} style={{ margin: 0, marginTop: 0 }} >
              {pageProps.name}
            </Typography.Title>
            {
              pageProps.subtitle && (
                <Typography.Title level={5} style={{ margin: 0 }} >
                  {pageProps.subtitle}
                </Typography.Title>
              )
            }
          </Flex>
        </Header> 
        <Content style={{ background: colorBgContainer }}>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </Layout>
  );
}