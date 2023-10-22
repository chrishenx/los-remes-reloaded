import { theme } from '@/lib/themeConfig';
import { ConfigProvider, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Image from 'next/image';

export default function Home() {
  return (
    <ConfigProvider theme={theme}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={true}>
          <div className="logo">
            <Image src="/logo3.jpeg" alt="LosRemes Reloaded" height={100} />
          </div>
          <Menu 
            theme="dark" 
            mode="inline"
            items={[
              {

              }


        </Sider>
      </Layout>
    </ConfigProvider>
  );
}
