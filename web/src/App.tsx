import './App.css';

import { Layout, Menu } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router';

const { Header, Content, Footer } = Layout;

const items = [
  {
    key: '/',
    label: 'Trang chủ',
  },
  {
    key: '/bao-cao',
    label: 'Báo cáo',
    children: [
      {
        key: '/bao-cao/giao-ban/thong-ke',
        label: 'Báo cáo giao ban',
      },
      {
        key: '/bao-cao/to-khai/thong-ke',
        label: 'Báo cáo tờ khai',
      },
      {
        key: '/bao-cao/no-thue/thong-ke',
        label: 'Báo cáo nợ thuế',
      },
    ],
  },
  {
    key: '/bieu-do',
    label: 'Biểu đồ',
    children: [
      {
        key: '/bao-cao/giao-ban/bieu-do',
        label: 'Biểu đồ giao ban',
      },

      {
        key: '/bao-cao/no-thue/bieu-do',
        label: 'Biểu đồ nợ thuế',
      },
    ],
  },
];

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Menu theme='dark' mode='horizontal' selectedKeys={[location.pathname]} items={items} onClick={handleMenuClick} style={{ flex: 1, minWidth: 0 }} />
      </Header>
      <Content style={{ padding: '0 24px' }}>
        <div style={{}}>
          <Outlet />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©{new Date().getFullYear()} Hải Quan</Footer>
    </Layout>
  );
}
