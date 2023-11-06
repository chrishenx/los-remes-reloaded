import { PageProps } from "@/types/pageProps";
import { SectorsPage } from "./sectores";
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getSectorImages } from "./sectores/helpers";

export default function Home({ name, sectorImages }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <SectorsPage name={name} sectorImages={sectorImages} />
  );
}

export const getStaticProps = (() => {
  const sectorImages = getSectorImages();
  return {
    props: {
      name: "Los Remes Reloaded",
      sectorImages,
    }
  };
}) satisfies GetStaticProps<PageProps>;