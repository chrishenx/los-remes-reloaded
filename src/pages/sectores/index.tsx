import { Avatar, Button, Card, Carousel, Flex, Typography, theme } from "antd";
import sectors from "@/lib/los-remes.json";
import Image from "next/image";
import { ExpandAltOutlined } from "@ant-design/icons";
import Link from "next/link";
import { GetStaticProps, InferGetServerSidePropsType } from "next";
import { PageProps } from "@/types/pageProps";
import { useEffect, useRef } from "react";
import { CarouselRef } from "antd/es/carousel";
import { useRouter } from "next/router";
import { getSectorImages } from "@/lib/climbing-utils";

const imagesSrcPrefix = "https://www.losremes.com/";

export function SectorsPage({ sectorImages }: InferGetServerSidePropsType<typeof getStaticProps>) {
  const {
    token: { colorText },
  } = theme.useToken();

  const router = useRouter();
  const carouselRef = useRef<CarouselRef>(null);


  useEffect(() => {
    if (router.query?.focus_sector_id) {
      carouselRef.current?.goTo(sectors.findIndex(sector => sector.id === router.query.focus_sector_id));
    }
  }, [router.query?.focus_sector_id]);

  return (
    <>
      <Carousel dotPosition="bottom"
        ref={carouselRef} >
        {
          sectors.map((sector, idx) => (
            <Card
              key={sector.id} 
              bodyStyle={{ padding: 0 }}
              bordered={false}
            >
              <Card.Meta 
                avatar={<Avatar style={{marginTop: 8}}
                  size="large">{idx + 1}</Avatar>}
                title={
                  <Flex justify="space-between">
                    <Typography.Text style={{color: colorText}}>{sector.name}</Typography.Text>
                    <Link href={`/rutas/${sector.id}`}
                      key={`${sector.id}_routes`}>
                      <Button key={`${sector.id}_enter`}
                        color={colorText}
                        type="primary"
                        icon={<ExpandAltOutlined />}>
                        Entrar
                      </Button>
                    </Link>
                  </Flex>
                }
                description={
                  <Typography.Text>{sector.routes.length} rutas: {sector.gradeRange.raw}</Typography.Text>
                }
                style={{ padding: 8, minWidth: 320 }}
              />
              <Image 
                alt={sector.name} 
                src={`${imagesSrcPrefix}${sectorImages?.[sector.id]}`} 
                width={300} 
                height={600} 
                style={{ minWidth: 320, width: "100%", height: "auto" }}
                priority
              />
            </Card>
          ))
        }
      </Carousel>
    </>
  );
}

export const getStaticProps = (() => {
  const sectorImages = getSectorImages();

  return {
    props: {
      name: "Sectores",
      sectorImages: sectorImages,
    },
  };
}) satisfies GetStaticProps<{
  focusedSectorId?: string | undefined;
} & PageProps>;

export default SectorsPage;

