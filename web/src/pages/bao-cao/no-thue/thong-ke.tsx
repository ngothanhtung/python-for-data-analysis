import { Breadcrumb, Card } from 'antd';
import React from 'react';

export default function NoThue() {
  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Trang chủ' }, { title: 'Báo cáo' }, { title: 'Báo cáo nợ thuế' }]} />
      <Card title='Báo cáo nợ thuế'>NoThue</Card>
    </React.Fragment>
  );
}
