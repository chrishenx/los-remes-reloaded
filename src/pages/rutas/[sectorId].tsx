import { Avatar, Button, Card, Carousel, Flex, Typography } from 'antd';
import sectors from '@/lib/los-remes.json';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { PageProps } from '@/types/pageProps';
import { RollbackOutlined } from '@ant-design/icons';
import Link from 'next/link';

const imagesSrcPrefix = "https://www.losremes.com/";

function findSector(sectorId: string) {
  return sectors.find(sector => sector.id === sectorId);
}

export function RoutesPage({ sector }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Carousel dotPosition="bottom">
        {
          sector?.routes.map((route, idx) => (
            <Card
              key={route.id}
              bodyStyle={{ padding: 0 }}
              bordered={false}
            >
              <Card.Meta 
                avatar={<Avatar style={{marginTop: 8}} size="large">{idx + 1}</Avatar>}
                title={
                  <Flex justify="space-between">
                    <Typography.Text>{route.name}</Typography.Text>
                    <Link href={`/sectores?focus_sector_id=${sector.id}`} key={`${sector.id}_routes`}>
                      <Button 
                        key={`${route.id}_gobackto_${sector.id}`} 
                        type="default" 
                        icon={<RollbackOutlined />}
                        style={{fontSize: '0.8em'}}
                      >
                        {sector.name}
                      </Button>
                    </Link>
                  </Flex>
                }
                description={
                  <Flex justify="space-between">
                    <Typography.Text>{route.grade.raw}</Typography.Text>
                    <Typography.Text>{route.numberOfQuickDraws} anillas</Typography.Text>
                    <Typography.Text>{route.height} metros</Typography.Text>
                  </Flex>
                }
                style={{ padding: 8, minWidth: 320 }}
              />
              <Image 
                alt={route.name} 
                src={`${imagesSrcPrefix}${route.imageSrc}`}
                width={300}
                height={600}
                style={{ minWidth: 320, width: "100%", height: "auto" }}
              />
            </Card>
          ))
        }
      </Carousel>
    </>
  );
}

export const getStaticProps = ((context) => {
  const { sectorId } = context.params ?? {};
  const sector = findSector(sectorId as string);
  return {
    props: {
      name: `Sector ${sector?.name}`,
      sector,
    },
  };
}) satisfies GetStaticProps<{
  sector: LosRemesSector | undefined;
} & PageProps>;

export const getStaticPaths = (() => {
  return {
    paths: sectors.map(sector => ({
      params: {
        sectorId: sector.id,
      },
    })),
    fallback: false,
  };
}) satisfies GetStaticPaths;


export default RoutesPage;

