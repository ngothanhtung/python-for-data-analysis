import { Breadcrumb, Card, Table, message } from 'antd';
import type { ColumnType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { api } from '../../../libraries/api-client';

interface ThongKeNhaCungCap {
  SupplierName: string;
  'Số lượng sản phẩm': number;
  'Giá TB': number;
  'Giá min': string;
  'Giá max': string;
  'Tồn kho': string;
}

export default function BaoCaoHangHoaTheoNhaCungCap() {
  const [data, setData] = useState<ThongKeNhaCungCap[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.get<ThongKeNhaCungCap[]>('/api/bao-cao/logistics/thong-ke-hang-hoa-theo-nha-cung-cap');
      setData(response.data);
    } catch (error) {
      message.error('Lỗi khi tải dữ liệu');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnType<ThongKeNhaCungCap>[] = [
    {
      title: 'Nhà cung cấp',
      dataIndex: 'SupplierName',
      key: 'SupplierName',
      fixed: 'left',
      width: 200,
      sorter: (a, b) => a.SupplierName.localeCompare(b.SupplierName),
      defaultSortOrder: 'ascend',
      render: (value: string) => <span style={{ fontWeight: 600 }}>{value}</span>,
    },
    {
      title: 'Số lượng sản phẩm',
      dataIndex: 'Số lượng sản phẩm',
      key: 'soLuongSanPham',
      align: 'right',
      width: 150,
      render: (value: number) => value.toLocaleString('vi-VN'),
    },
    {
      title: 'Giá trung bình',
      dataIndex: 'Giá TB',
      key: 'giaTB',
      align: 'right',
      width: 180,
      render: (value: number) => <span style={{ color: 'green', fontWeight: 600 }}>{value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>,
    },
    {
      title: 'Giá thấp nhất',
      dataIndex: 'Giá min',
      key: 'giaMin',
      align: 'right',
      width: 180,
      render: (value: string) => <span style={{ color: 'red', fontWeight: 600 }}>{parseFloat(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>,
    },
    {
      title: 'Giá cao nhất',
      dataIndex: 'Giá max',
      key: 'giaMax',
      align: 'right',
      width: 180,
      render: (value: string) => <span style={{ color: 'violet', fontWeight: 600 }}>{parseFloat(value).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'Tồn kho',
      key: 'tonKho',
      align: 'right',
      width: 180,
      render: (value: string) => parseFloat(value).toLocaleString('vi-VN'),
    },
  ];

  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Trang chủ' }, { title: 'Báo cáo' }, { title: 'Báo cáo hàng hóa theo nhà cung cấp' }]} />
      <Card title='Báo cáo hàng hóa theo nhà cung cấp'>
        <Table columns={columns} dataSource={data} loading={loading} rowKey='SupplierName' scroll={{ x: 1000 }} pagination={false} />
      </Card>
    </React.Fragment>
  );
}
