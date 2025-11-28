import { Breadcrumb, Button, Card, Table } from 'antd';
import axios from 'axios';
import React from 'react';

export default function DanhSachLogistics() {
  // State để lưu trữ dữ liệu từ API
  const [records, setRecords] = React.useState([]);

  //  Bước 1: Lấy data từ API của Python về

  // 1 Viết hàm gọi API sử dụng fetch hoặc axios
  const getData = async () => {
    const response = await axios.get('http://localhost:8000/api/logistics/danh-sach');
    // Dữ liệu đã có trong data
    const data = response.data;
    setRecords(data);
    console.log(data);
  };

  // Bước 2: Hiển thị data trong bảng
  // 1. Tạo cấu trúc cột (columns)

  const columns = [
    {
      title: 'Country',
      key: 'country',
      dataIndex: 'country',
    },
    {
      title: 'Port',
      key: 'port',
      dataIndex: 'port',
    },
    {
      title: 'Value (USD)',
      key: 'value_usd',
      dataIndex: 'value_usd',
    },
    {
      title: 'Quantity (kg)',
      key: 'quantity_kg',
      dataIndex: 'quantity_kg',
    },
    {
      title: 'Transport Mode',
      key: 'transport_mode',
      dataIndex: 'transport_mode',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
  ];
  // 2. Sử dụng component Table của antd để hiển thị dữ liệu

  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Trang chủ' }, { title: 'Báo cáo' }, { title: 'Danh sách' }]} />
      <Card title='Danh sách'>
        <Button type='primary' onClick={getData}>
          Lấy dữ liệu từ API
        </Button>

        <Table columns={columns} dataSource={records || []} style={{ marginTop: '16px' }} />
      </Card>
    </React.Fragment>
  );
}
