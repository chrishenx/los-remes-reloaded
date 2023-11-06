import { LosRemesSector } from "@/types/los-remes-sectors";
import { RollbackOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Flex, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";

const imagesSrcPrefix = "https://www.losremes.com/";

export function getSectorRoutesCards(sector: LosRemesSector) {
  return (
    sector.routes.map((route, idx) => (
      <Card
        key={route.id}
        bodyStyle={{ padding: 0 }}
        bordered={false}
      >
        <Card.Meta 
          avatar={<Avatar style={{marginTop: 8}} size="large">{sector.name.charAt(0)}.{idx + 1}</Avatar>}
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
          priority
        />
      </Card>
    ))
  );
}