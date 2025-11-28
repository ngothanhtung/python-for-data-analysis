/* eslint-disable @typescript-eslint/no-explicit-any */
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

    // Lưu dữ liệu vào state
    setRecords(data);
  };

  // Bước 2: Hiển thị data trong bảng
  // 1. Tạo cấu trúc cột (columns)

  // Lấy danh sách unique countries để tạo filters
  const getCountryFilters = () => {
    const uniqueCountries = [...new Set(records.map((record: any) => record.country))];
    return uniqueCountries.map((country) => ({ text: country, value: country }));
  };

  // Lấy danh sách unique transport modes để tạo filters
  const getTransportModeFilters = () => {
    const uniqueModes = [...new Set(records.map((record: any) => record.transport_mode))];
    return uniqueModes.map((mode) => ({ text: mode, value: mode }));
  };

  const columns = [
    {
      title: 'No',
      key: 'no',
      dataIndex: 'no',
      render: (value, record, index) => index + 1,
    },
    {
      title: 'Country',
      key: 'country_port',
      dataIndex: 'country_port',
      children: [
        {
          title: 'Country',
          key: 'country',
          dataIndex: 'country',
          filters: getCountryFilters(),
          onFilter: (value: string, record: any) => record.country === value,
          render: (value: string) => (value === 'Vietnam' ? <span style={{ color: 'red', fontWeight: 600 }}>{value}</span> : value),
        },
        {
          title: 'Port',
          key: 'port',
          dataIndex: 'port',
          render: (value: string) => {
            if (value === 'Ho Chi Minh') return <span style={{ color: 'gold', fontWeight: 600 }}>{value}</span>;
            if (value === 'Haiphong') return <span style={{ color: 'blue', fontWeight: 600 }}>{value}</span>;
            return value;
          },
        },
      ],
    },

    {
      title: 'Product',
      key: 'product',
      dataIndex: 'product',
    },
    {
      title: 'Value (USD)',
      key: 'value_usd',
      dataIndex: 'value_usd',
      sorter: (a: any, b: any) => a.value_usd - b.value_usd,
      render: (value: number) => value?.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
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
      filters: getTransportModeFilters(),
      onFilter: (value, record: any) => record.transport_mode === value,
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

        <Table bordered={true} columns={columns} dataSource={records || []} style={{ marginTop: '16px' }} pagination={false} />
      </Card>
    </React.Fragment>
  );
}
