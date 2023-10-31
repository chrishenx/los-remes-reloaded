import { Button, Flex, Layout, Menu, MenuTheme, Typography, theme } from 'antd';
import { AppProps } from 'next/app';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { PageProps } from '@/pages/pageProps';

type AppLayoutProps = {
  themeMode: MenuTheme;
  setThemeMode: Dispatch<SetStateAction<MenuTheme>>
} & AppProps<PageProps>;

export function AppLayout({ Component, pageProps, themeMode, setThemeMode }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, colorPrimaryBg, colorText, fontSizeHeading5 },
  } = theme.useToken();

  return (
    <Layout style={{height: "100vh"}}>
      <Layout.Sider trigger={null} collapsedWidth={0} collapsible collapsed={collapsed} style={{background: colorPrimaryBg}} width={320}>
        <Flex justify="space-around" align="center">
          <Image src="/logo3.jpeg" alt="LosRemes Reloaded" height={80} width={80} />
          <Typography.Title level={4}>
            Los Remes Reloaded
          </Typography.Title>
        </Flex>
        <Menu theme={themeMode} mode="inline" >
          <Menu.Item key="1" onClick={() => setThemeMode(themeMode === "light" ? "dark" : "light")}>
            <Flex justify="space-between" align="center">
              <Typography.Text style={{ color: colorText, fontSize: fontSizeHeading5 }}>
                {
                  themeMode === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"
                }
              </Typography.Text>
              {
                themeMode === "light" ? <BsFillSunFill /> : <BsFillMoonStarsFill />
              }
            </Flex>
          </Menu.Item>
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
          <Typography.Title level={3} style={{ display: "inline", color: colorText, margin: 16 }}>
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