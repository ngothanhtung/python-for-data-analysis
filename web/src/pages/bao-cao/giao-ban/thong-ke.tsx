/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumb, Card, Col, Row, Statistic, Table } from 'antd';
import { useEffect, useState } from 'react';

import apiClient from '@/libraries/api-client';
import { DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import './thong-ke.css';

export default function GiaoBan() {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<any>('/api/bao-cao/giao-ban/thong-ke');
        setData(response.data);
        console.log('Fetched data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: 'Loại Tờ khai',
      dataIndex: 'loai_to_khai',
      key: 'loai_to_khai',
      width: 150,
    },
    {
      title: 'Luồng',
      dataIndex: 'luong',
      key: 'luong',
      width: 120,
      render: (text: string) => {
        const colors: Record<string, string> = {
          Vàng: '#faad14',
          Xanh: '#52c41a',
          Đỏ: '#f5222d',
        };
        return (
          <span
            style={{
              color: colors[text] || '#000',
              fontWeight: 'bold',
            }}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'so_luong',
      key: 'so_luong',
      width: 120,
      align: 'right' as const,
    },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Trang chủ' }, { title: 'Báo cáo' }, { title: 'Báo cáo giao ban' }]} />

      {/* Tổng quan */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Tổng số bản ghi' value={data?.tong_so_ban_ghi || 0} prefix={<FileTextOutlined />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Nhập khẩu' value={data?.thong_ke_loai_to_khai['Nhập khẩu'] || 0} className='statistic-success' />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Xuất khẩu' value={data?.thong_ke_loai_to_khai['Xuất khẩu'] || 0} className='statistic-danger' />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic title='Tổng trị giá' value={(data?.tong_tri_gia_theo_loai_to_khai['Nhập khẩu'] || 0) + (data?.tong_tri_gia_theo_loai_to_khai['Xuất khẩu'] || 0)} prefix={<DollarOutlined />} formatter={(value) => formatCurrency(Number(value))} />
          </Card>
        </Col>
      </Row>

      {/* Thống kê theo luồng */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title='Luồng Vàng' value={data?.thong_ke_luong['Vàng'] || 0} className='statistic-warning' suffix={`/ ${formatCurrency(data?.tong_tri_gia_theo_luong['Vàng'] || 0)}`} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title='Luồng Xanh' value={data?.thong_ke_luong['Xanh'] || 0} className='statistic-success-light' suffix={`/ ${formatCurrency(data?.tong_tri_gia_theo_luong['Xanh'] || 0)}`} />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card>
            <Statistic title='Luồng Đỏ' value={data?.thong_ke_luong['Đỏ'] || 0} className='statistic-danger-light' suffix={`/ ${formatCurrency(data?.tong_tri_gia_theo_luong['Đỏ'] || 0)}`} />
          </Card>
        </Col>
      </Row>

      {/* Trị giá theo loại tờ khai */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic title='Trị giá Nhập khẩu' value={data?.tong_tri_gia_theo_loai_to_khai['Nhập khẩu'] || 0} formatter={(value) => formatCurrency(Number(value))} className='statistic-success' />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card>
            <Statistic title='Trị giá Xuất khẩu' value={data?.tong_tri_gia_theo_loai_to_khai['Xuất khẩu'] || 0} formatter={(value) => formatCurrency(Number(value))} className='statistic-danger' />
          </Card>
        </Col>
      </Row>

      {/* Bảng chi tiết */}
      <Card title='Thống kê kết hợp theo Loại tờ khai và Luồng'>
        <Table dataSource={data?.thong_ke_ket_hop ?? []} columns={columns} rowKey={(record: any) => `${record.loai_to_khai}-${record.luong}`} loading={loading} pagination={false} />
      </Card>
    </>
  );
}
