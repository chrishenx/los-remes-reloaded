import { SectorsPage } from "./sectores";

export default function Home() {
  return (
    <SectorsPage />
  );
}

export const getStaticProps = () => {
  return {
    props: {
      name: "Sectores"
    }
  };
};