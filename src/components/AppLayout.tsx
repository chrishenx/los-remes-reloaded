import { Button, Flex, Layout, Menu, MenuTheme, Typography, theme } from 'antd';
import { AppProps } from 'next/app';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { PageProps } from '@/types/pageProps';
import Link from 'next/link';

type AppLayoutProps = {
  themeMode: MenuTheme;
  setThemeMode: Dispatch<SetStateAction<MenuTheme>>
} & AppProps<PageProps>;

export function AppLayout({ Component, pageProps, themeMode, setThemeMode }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, colorPrimaryBg, colorText },
  } = theme.useToken();

  return (
    <Layout style={{height: "100vh"}}>
      <Layout.Sider trigger={null} collapsedWidth={0} collapsible collapsed={collapsed} style={{background: colorPrimaryBg}} width={320}>
        <Flex justify="space-between" align="center" style={{paddingRight: 8}}>
          <Link href="/">
            <Image src="/logo3.jpeg" alt="LosRemes Reloaded" height={80} width={80} />
          </Link>
          <Typography.Title level={4} style={{margin: 0}}>
            Los Remes Reloaded
          </Typography.Title>
        </Flex>
        <Menu theme={themeMode} mode="inline" items={
          [
            {
              key: "1",
              title: themeMode === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro",
              label: themeMode === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro",
              onClick: () => setThemeMode(themeMode === "light" ? "dark" : "light"),
              icon: themeMode === "light" ? <BsFillMoonStarsFill /> : <BsFillSunFill />,
            },
          ]
        }>
        </Menu>
      </Layout.Sider>
      <Layout>
        <Layout.Header style={{ background: colorPrimaryBg, padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <Typography.Title level={3} style={{ display: "inline", color: colorText, margin: 0, marginLeft: 4 }}>
            {pageProps.name}
          </Typography.Title>
          </Layout.Header> 
        <Layout.Content style={{ background: colorBgContainer }}>
          <Component {...pageProps} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}