import { PageProps } from "@/types/pageProps";
import { SectorsPage } from "./sectores";
import { GetStaticProps } from 'next';

export default function Home() {
  return (
    <SectorsPage />
  );
}

export const getStaticProps = (() => {
  return {
    props: {
      name: "Los Remes Reloaded"
    }
  };
}) satisfies GetStaticProps<PageProps>;