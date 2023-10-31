import { Theme as AntdTheme, MenuTheme } from 'antd';

declare module 'antd' {
  export interface Theme extends AntdTheme {
    themeMode: MenuTheme
  }
}