import { Avatar, Card, Carousel, Flex, Typography } from 'antd';
import { sectors } from '@/lib/los-remes.json';
import Image from 'next/image';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';

const imagesSrcPrefix = "https://www.losremes.com/";

function findSector(sectorId: string) {
  return sectors.find(sector => sector.id === sectorId);
}

export function RoutesPage({ sector }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Carousel dotPosition="top">
        {
          sector?.routes.map((route, idx) => (
            <Card key={route.id}
              cover={
                <Image src={`${imagesSrcPrefix}${route.imageSrc}`} alt={route.name} width={300} height={600} />
              }
            >
              <Card.Meta 
                avatar={<Avatar style={{marginTop: 8}} size="large">{idx + 1}</Avatar>}
                title={`${route.name}`} 
                description={
                  <Flex justify="space-between">
                    <Typography.Text>{route.grade.raw}</Typography.Text>
                    <Typography.Text>{route.numberOfQuickDraws} anillas</Typography.Text>
                    <Typography.Text>{route.height} metros</Typography.Text>
                  </Flex>
                }
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
}>;

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

