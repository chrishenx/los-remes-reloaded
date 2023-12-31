import { AppLayout } from "@/components/AppLayout";
import { theme } from "@/lib/themeConfig";
import { ConfigProvider, MenuTheme, theme as antdTheme } from "antd";
import { AppProps } from "next/app";
import { useState } from "react";

import "./global.css";
import { ThemeModeProvider, defaultThemeMode } from "@/components/ThemeModeContext";
import Head from "next/head";
import { PageProps } from "@/types/pageProps";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleAdsense } from "@/components/GoogleAdsense";

export function App(props: AppProps<PageProps>) {
  const [themeMode, setThemeMode] = useState<MenuTheme>(defaultThemeMode);
  const toggleThemeMode = () => setThemeMode(themeMode === "light" ? "dark" : "light");
  return (
    <ConfigProvider theme={{...theme, algorithm: themeMode === "light" ? antdTheme.defaultAlgorithm : antdTheme.darkAlgorithm}}>
      <GoogleAnalytics />
      <GoogleAdsense />
      <Head>
        <title>
          {props.pageProps.name}
        </title>
        <meta name="viewport"
          content="width=device-width, initial-scale=1.0" />
        <meta name="google-adsense-account"
          content={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ACCOUNT} />
      </Head>
      <ThemeModeProvider themeMode={themeMode}
        toggleThemeMode={toggleThemeMode}>
        <AppLayout {...props} />
      </ThemeModeProvider>
    </ConfigProvider>
  );
}

export default App;