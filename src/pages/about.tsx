import { About } from "@/components/About";
import { PageProps } from "@/types/pageProps";
import { GetStaticProps } from "next";

export function AboutPage() {
  return <About containerStyles={{ padding: 16 }} />;
}

export const getStaticProps = (() => {
  return {
    props: {
      name: "Acerca de",
      subtitle: "Los Remes Reloaded",
      drawerDisabled: true,
    },
  };
}) satisfies GetStaticProps<PageProps>;

export default AboutPage;