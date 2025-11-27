import { Breadcrumb, Card } from 'antd';
import React from 'react';

export default function DanhSachHangHoa() {
  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Trang chủ' }, { title: 'Hàng hóa' }, { title: 'Danh sách' }]} />
      <Card title='Danh sách hàng hóa'>DanhSachHangHoa</Card>
    </React.Fragment>
  );
}
