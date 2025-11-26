import { Breadcrumb, Card } from 'antd';
import React from 'react';

export default function BieuDo() {
  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Trang chủ' }, { title: 'Báo cáo' }, { title: 'Báo cáo nợ thuế' }]} />
      <Card title='Biểu đồ nợ thuế'>BieuDo</Card>
    </React.Fragment>
  );
}
