import { Button, Divider, Drawer, Flex, Image, Typography, theme } from "antd";
import Link from "next/link";
import {
  MenuFoldOutlined,
} from '@ant-design/icons';
import { BsFillMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { useContext } from "react";
import { RoutesFinder } from "./RoutesFinder";
import { ThemeModeContext } from "../ThemeModeContext";

export type AppDrawerProps = {
  collapsed: boolean;
  onCollapse: () => void;
}

export function AppDrawer({collapsed, onCollapse}: AppDrawerProps) {
  const {
    token: { colorPrimaryBg, colorBgElevated },
  } = theme.useToken();

  const {themeMode, toggleThemeMode} = useContext(ThemeModeContext);

  return (
    <Drawer
      title={
        <Flex justify="space-between" align="center" gap="small" style={{ paddingRight: 8 }}>
          <Link href="/">
            <Image src="/logos-dall-e-2.png" alt="LosRemes Reloaded" height={70} width={70} />
          </Link>
          <Typography.Title level={4} style={{margin: 0}}>
            Los Remes Reloaded
          </Typography.Title>
          <Button 
            type="text"
            icon={<MenuFoldOutlined />}
            onClick={onCollapse}
          />
        </Flex>
      }
      closeIcon={null}
      onClose={onCollapse}
      width={320}
      open={!collapsed}
      placement="left"
      styles={{ header: { padding: 0 }, body: { padding: 8 } }}
      style={{ background: colorPrimaryBg, padding: 0 }}
    >
      <RoutesFinder />
      <Divider />
      <Flex vertical align="center" style={{ background: colorBgElevated, padding: 8 }}>
        <Button
          type="default"
          icon={themeMode === "light" ? <BsFillMoonStarsFill /> : <BsFillSunFill />}
          onClick={toggleThemeMode}
        >
          {themeMode === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
        </Button>
      </Flex>
    </Drawer>
  );
}