import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import Document, { Head, Html, Main, NextScript } from "next/document";
import type { DocumentContext } from "next/document";

const AppDocument = () => (
  <Html lang="es">
    <Head>
      <link rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png" />
      <link rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png" />
      <link rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png" />
      <link rel="manifest"
        href="/site.webmanifest" />
      <link rel="mask-icon"
        href="/safari-pinned-tab.svg"
        color="#5bbad5" />
      <meta name="msapplication-TileColor"
        content="#da532c" />
      <meta name="theme-color"
        content="#ffffff" />
    </Head>
    <body style={{ margin: 0, width: "100vw" }}>
      <Main />
      <NextScript />
    </body>
  </Html>
);

AppDocument.getInitialProps = async (ctx: DocumentContext) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => (
        <StyleProvider cache={cache}>
          <App {...props} />
        </StyleProvider>
      ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};

export default AppDocument;