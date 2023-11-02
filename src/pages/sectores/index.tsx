import { Avatar, Button, Card, Carousel, Flex, Typography, theme } from 'antd';
import sectors from '@/lib/los-remes.json';
import Image from 'next/image';
import { ExpandAltOutlined } from '@ant-design/icons';
import Link from 'next/link';

const imagesSrcPrefix = "https://www.losremes.com/";

function getRandomArrayElement<T>(arr: Array<T>): T  {
  const el = arr[Math.floor(Math.random() * arr.length)];
  return el;
}

export function SectorsPage() {
  const {
    token: { colorText },
  } = theme.useToken();

  return (
    <>
      <Carousel dotPosition="bottom">
        {
          sectors.map((sector, idx) => (
            <Card
              key={sector.id} 
              bodyStyle={{ padding: 0 }}
              bordered={false}
            >
              <Card.Meta 
                avatar={<Avatar style={{marginTop: 8}} size="large">{idx + 1}</Avatar>}
                title={
                  <Flex justify="space-between">
                    <Typography.Text style={{color: colorText}}>{sector.name}</Typography.Text>
                    <Link href={`/rutas/${sector.id}`} key={`${sector.id}_routes`}>
                      <Button key={`${sector.id}_enter`} color={colorText} type="primary" icon={<ExpandAltOutlined />}>
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
                  src={`${imagesSrcPrefix}${getRandomArrayElement(sector.routes).imageSrc}`} 
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

export const getStaticProps = () => {
  return {
    props: {
      name: "Sectores"
    }
  };
};

export default SectorsPage;

