import { PageProps } from "@/types/pageProps";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { Button, Card, Divider, Flex, Typography, theme } from "antd";
import { RoutesFinderForm } from "@/components/AppLayout/RoutesFinderForm";
import Link from "next/link";
import Image from "next/image";
import { GiBleedingEye } from "react-icons/gi";
import losRemesLogo from "../../public/final-logo-reduced.png";

export default function Home(_props: InferGetStaticPropsType<typeof getStaticProps>) {
  const {
    token: { colorPrimary, colorPrimaryText },
  } = theme.useToken();

  return (
    <Flex 
      vertical 
      style={{ padding: 10 }}
      gap={8}
    >
      <Typography.Paragraph style={{ display: "flex", alignItems: "center" }}>
        <Image 
          src={losRemesLogo}
          style={{ margin: "0px 8px 0px 0px", width: 150, height: 150 }}
          alt="LosRemesReloaded Logo - A R letter depicting a climbing crag, being climbed by a climber elf"
        />
        Los Remes Reloaded es tu guía de escalada en Los Remes, un área de escalada en roca ubicada en El Cerro del Mazapán, Naucalpan, Estado de México.
      </Typography.Paragraph>
      <Typography.Paragraph>
        Comienza buscando una ruta, seleccionando tus sectores de interés y un rango de grados de dificultad.
        O navega los sectores para conocerlos uno por uno.
        <Link href="/about"
          style={{ marginLeft: 4, color: colorPrimaryText }}>
          Recomendaciones.
        </Link>
      </Typography.Paragraph>
      <Card title="Encuentra tus rutas"
        headStyle={{ padding: 10 }}
        bodyStyle={{ padding: 4 }}>
        <RoutesFinderForm />
      </Card>
      <Link href="/sectores"
        style={{ textAlign: "center", marginTop: 16 }} >
        <Button 
          size="large" 
          type="default"
          style={{ borderWidth: 2, borderColor: colorPrimary, display: "inline-flex", alignItems: "center", justifyContent: "space-between" }}
        >
          <span style={{ color: colorPrimaryText }}>Navegar todos los sectores</span>
          <GiBleedingEye style={{ marginTop: 4, marginLeft: 16 }} />
        </Button>
      </Link>
      <Divider orientationMargin={30} />
      <Typography.Text style={{textAlign: "right"}}>
        Hecho con amor por
        <a
          style={{ marginLeft: 4, color: colorPrimaryText}}
          href="https://duendevelopments.mydurable.com/" 
          target="_blank" 
          rel="noreferrer">
            Duende Developments
        </a>
      </Typography.Text>
      <div style={{textAlign: "right"}}>
        <Button type="default">
          <Link href="/about">
            Más información
          </Link>
        </Button>
      </div>
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