import apiClient from '@/libraries/api-client';
import { Breadcrumb, Card, Table } from 'antd';
import React, { useEffect, useState } from 'react';

interface TongHopTheoCangData {
  port: string;
  'Số lượng chuyến hàng': number;
  'Tổng giá trị (USD)': number;
  'Tổng khối lượng (kg)': number;
  'Giá trị TB (USD)': number;
  'Giá trị max (USD)': number;
  'Giá trị min (USD)': number;
  'Thời gian thông quan TB (ngày)': number;
}

export default function TongHopTheoCang() {
  const [data, setData] = useState<TongHopTheoCangData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await apiClient.get('/api/bao-cao/logistics/thong-ke-tong-hop-theo-cang');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: 'Cảng',
      dataIndex: 'port',
      key: 'port',
      fixed: 'left' as const,
      width: 120,
    },
    {
      title: 'Số lượng chuyến hàng',
      dataIndex: 'Số lượng chuyến hàng',
      key: 'soLuongChuyenHang',
      width: 150,
      render: (value: number) => value?.toLocaleString(),
    },
    {
      title: 'Tổng giá trị (USD)',
      dataIndex: 'Tổng giá trị (USD)',
      key: 'tongGiaTri',
      width: 180,
      render: (value: number) => value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      title: 'Tổng khối lượng (kg)',
      dataIndex: 'Tổng khối lượng (kg)',
      key: 'tongKhoiLuong',
      width: 180,
      render: (value: number) => value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      title: 'Giá trị TB (USD)',
      dataIndex: 'Giá trị TB (USD)',
      key: 'giaTriTB',
      width: 160,
      render: (value: number) => value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      title: 'Giá trị max (USD)',
      dataIndex: 'Giá trị max (USD)',
      key: 'giaTriMax',
      width: 180,
      render: (value: number) => value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      title: 'Giá trị min (USD)',
      dataIndex: 'Giá trị min (USD)',
      key: 'giaTriMin',
      width: 180,
      render: (value: number) => value?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
    },
    {
      title: 'Thời gian thông quan TB (ngày)',
      dataIndex: 'Thời gian thông quan TB (ngày)',
      key: 'thoiGianThongQuan',
      width: 220,
      render: (value: number) => value?.toFixed(2),
    },
  ];

  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Trang chủ' }, { title: 'Báo cáo' }, { title: 'Tổng hợp theo cảng' }]} />
      <Card title='Tổng hợp theo cảng'>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey='Port'
          scroll={{ x: 1400 }}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showTotal: (total) => `Tổng số: ${total} cảng`,
          }}
        />
      </Card>
    </React.Fragment>
  );
}
