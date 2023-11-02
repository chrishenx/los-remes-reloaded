import { Button, Drawer, Flex, Layout, Menu, MenuTheme, Typography, theme } from 'antd';
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

const { Header, Content } = Layout;

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
      <Drawer
        title={
          <Flex justify="space-between" align="center" gap="small" style={{paddingRight: 8}}>
            <Link href="/">
              <Image src="/logos-dall-e-2.png" alt="LosRemes Reloaded" height={70} width={70} />
            </Link>
            <Typography.Title level={4} style={{margin: 0}}>
              Los Remes Reloaded
            </Typography.Title>
            <Button 
              type="text"
              icon={<MenuFoldOutlined />}
              onClick={() => setCollapsed(true)}
            />
          </Flex>
        }
        closeIcon={null}
        onClose={() => setCollapsed(true)}
        width={320}
        open={!collapsed}
        placement="left"
        styles={{ header: { padding: 0 } }}
        style={{ background: colorPrimaryBg, padding: 0 }}
      >
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
      </Drawer>
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