import { Avatar, Button, Card, Carousel, Typography, theme } from 'antd';
import { sectors } from '@/lib/los-remes.json';
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
      <Carousel dotPosition="top">
        {
          sectors.map((sector, idx) => (
            <Card key={sector.id} 
              actions={[
                <Link href={`/rutas/${sector.id}`} key={`${sector.id}_routes`}>
                  <Button key={`${sector.id}_enter`} color={colorText} type="link" icon={<ExpandAltOutlined />} styles={{icon: {marginTop: 5}}}>
                    Entrar
                  </Button>
                </Link>
              ]}
              cover={
                <Image src={`${imagesSrcPrefix}${getRandomArrayElement(sector.routes).imageSrc}`} alt={sector.name} width={300} height={600} />
              }
            >
              <Card.Meta 
                avatar={<Avatar style={{marginTop: 8}} size="large">{idx + 1}</Avatar>}
                title={`${sector.name}`} 
                description={
                  <Typography.Text>{sector.routes.length} rutas: {sector.gradeRange.raw}</Typography.Text>
                }
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

