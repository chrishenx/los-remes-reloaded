import { PageProps } from "@/types/pageProps";
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Button, Card, Flex, Typography } from "antd";
import { RoutesFinderForm } from "@/components/AppLayout/RoutesFinderForm";
import Link from "next/link";
import Image from "next/image";

export default function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Flex 
      vertical style={{
          padding: 10
      }}
    >
      <Image 
        src="/final-logo.png" 
        width={180} 
        height={180}
        style={{ margin: "0 auto" }}
        alt="LosRemesReloaded Logo - A R letter depicting a climbing crag, being climbed by a climber elf"
      />
      <Card title="Encuentra tus rutas" headStyle={{ padding: 10 }} bodyStyle={{ padding: 4 }}>
        <RoutesFinderForm />
      </Card>
      <Flex justify="space-around" style={{ marginTop: 16 }}>
        <Typography.Title level={3} style={{ marginTop: 0 }}>
          O
        </Typography.Title>
        <Link href="/sectores" >
          <Button 
            size="large" 
            type="default"
            style={{ borderWidth: 2 }}
          >
            Visita los sectores en Los Remes
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}

export const getStaticProps = (() => {
  return {
    props: {
      name: "Los Remes Reloaded",
      drawerDisabled: true,
    }
  };
}) satisfies GetStaticProps<PageProps>;