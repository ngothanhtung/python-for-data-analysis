import { Breadcrumb, Card, Table, Row, Col, Statistic } from 'antd';
import React, { useEffect, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';

interface TongHopKetHop {
  loai_to_khai: string;
  luong: string;
  so_luong: number;
  thue_suat_tb: number;
  tong_tri_gia: number;
  tri_gia_tb: number;
}

interface TongHopTheoLoaiToKhai {
  loai_to_khai: string;
  so_luong: number;
  thue_suat_tb: number;
  tong_tri_gia: number;
  tri_gia_tb: number;
}

interface TongHopTheoLuong {
  luong: string;
  so_luong: number;
  thue_suat_tb: number;
  tong_tri_gia: number;
  tri_gia_tb: number;
}

interface BaoCaoData {
  tong_hop_ket_hop: TongHopKetHop[];
  tong_hop_theo_loai_to_khai: TongHopTheoLoaiToKhai[];
  tong_hop_theo_luong: TongHopTheoLuong[];
}

export default function ToKhai() {
  const [data, setData] = useState<BaoCaoData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Giả lập data từ API
    const mockData: BaoCaoData = {
      tong_hop_ket_hop: [
        {
          loai_to_khai: 'Nhập khẩu',
          luong: 'Vàng',
          so_luong: 3,
          thue_suat_tb: 13.67,
          tong_tri_gia: 13200000,
          tri_gia_tb: 4400000.0,
        },
        {
          loai_to_khai: 'Xuất khẩu',
          luong: 'Vàng',
          so_luong: 3,
          thue_suat_tb: 11.33,
          tong_tri_gia: 12300000,
          tri_gia_tb: 4100000.0,
        },
        {
          loai_to_khai: 'Nhập khẩu',
          luong: 'Xanh',
          so_luong: 3,
          thue_suat_tb: 13.0,
          tong_tri_gia: 10700000,
          tri_gia_tb: 3566666.67,
        },
        {
          loai_to_khai: 'Xuất khẩu',
          luong: 'Xanh',
          so_luong: 3,
          thue_suat_tb: 11.33,
          tong_tri_gia: 9700000,
          tri_gia_tb: 3233333.33,
        },
        {
          loai_to_khai: 'Nhập khẩu',
          luong: 'Đỏ',
          so_luong: 5,
          thue_suat_tb: 10.8,
          tong_tri_gia: 11200000,
          tri_gia_tb: 2240000.0,
        },
        {
          loai_to_khai: 'Xuất khẩu',
          luong: 'Đỏ',
          so_luong: 3,
          thue_suat_tb: 10.0,
          tong_tri_gia: 6300000,
          tri_gia_tb: 2100000.0,
        },
      ],
      tong_hop_theo_loai_to_khai: [
        {
          loai_to_khai: 'Nhập khẩu',
          so_luong: 11,
          thue_suat_tb: 12.18,
          tong_tri_gia: 35100000,
          tri_gia_tb: 3190909.09,
        },
        {
          loai_to_khai: 'Xuất khẩu',
          so_luong: 9,
          thue_suat_tb: 10.89,
          tong_tri_gia: 28300000,
          tri_gia_tb: 3144444.44,
        },
      ],
      tong_hop_theo_luong: [
        {
          luong: 'Vàng',
          so_luong: 6,
          thue_suat_tb: 12.5,
          tong_tri_gia: 25500000,
          tri_gia_tb: 4250000.0,
        },
        {
          luong: 'Xanh',
          so_luong: 6,
          thue_suat_tb: 12.17,
          tong_tri_gia: 20400000,
          tri_gia_tb: 3400000.0,
        },
        {
          luong: 'Đỏ',
          so_luong: 8,
          thue_suat_tb: 10.5,
          tong_tri_gia: 17500000,
          tri_gia_tb: 2187500.0,
        },
      ],
    };

    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 500);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(value);
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('vi-VN').format(value);
  };

  const columnsKetHop: ColumnsType<TongHopKetHop> = [
    {
      title: 'Loại tờ khai',
      dataIndex: 'loai_to_khai',
      key: 'loai_to_khai',
    },
    {
      title: 'Luồng',
      dataIndex: 'luong',
      key: 'luong',
    },
    {
      title: 'Số lượng',
      dataIndex: 'so_luong',
      key: 'so_luong',
      align: 'right',
      render: (value) => formatNumber(value),
    },
    {
      title: 'Thuế suất TB (%)',
      dataIndex: 'thue_suat_tb',
      key: 'thue_suat_tb',
      align: 'right',
      render: (value) => value.toFixed(2),
    },
    {
      title: 'Tổng trị giá',
      dataIndex: 'tong_tri_gia',
      key: 'tong_tri_gia',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
    {
      title: 'Trị giá TB',
      dataIndex: 'tri_gia_tb',
      key: 'tri_gia_tb',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
  ];

  const columnsLoaiToKhai: ColumnsType<TongHopTheoLoaiToKhai> = [
    {
      title: 'Loại tờ khai',
      dataIndex: 'loai_to_khai',
      key: 'loai_to_khai',
    },
    {
      title: 'Số lượng',
      dataIndex: 'so_luong',
      key: 'so_luong',
      align: 'right',
      render: (value) => formatNumber(value),
    },
    {
      title: 'Thuế suất TB (%)',
      dataIndex: 'thue_suat_tb',
      key: 'thue_suat_tb',
      align: 'right',
      render: (value) => value.toFixed(2),
    },
    {
      title: 'Tổng trị giá',
      dataIndex: 'tong_tri_gia',
      key: 'tong_tri_gia',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
    {
      title: 'Trị giá TB',
      dataIndex: 'tri_gia_tb',
      key: 'tri_gia_tb',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
  ];

  const columnsLuong: ColumnsType<TongHopTheoLuong> = [
    {
      title: 'Luồng',
      dataIndex: 'luong',
      key: 'luong',
    },
    {
      title: 'Số lượng',
      dataIndex: 'so_luong',
      key: 'so_luong',
      align: 'right',
      render: (value) => formatNumber(value),
    },
    {
      title: 'Thuế suất TB (%)',
      dataIndex: 'thue_suat_tb',
      key: 'thue_suat_tb',
      align: 'right',
      render: (value) => value.toFixed(2),
    },
    {
      title: 'Tổng trị giá',
      dataIndex: 'tong_tri_gia',
      key: 'tong_tri_gia',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
    {
      title: 'Trị giá TB',
      dataIndex: 'tri_gia_tb',
      key: 'tri_gia_tb',
      align: 'right',
      render: (value) => formatCurrency(value),
    },
  ];

  // Tính tổng hợp
  const tongSoLuong = data?.tong_hop_theo_loai_to_khai.reduce((sum, item) => sum + item.so_luong, 0) || 0;
  const tongTriGia = data?.tong_hop_theo_loai_to_khai.reduce((sum, item) => sum + item.tong_tri_gia, 0) || 0;

  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Trang chủ' }, { title: 'Báo cáo' }, { title: 'Báo cáo tờ khai' }]} />

      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Card>
            <Statistic title='Tổng số lượng tờ khai' value={tongSoLuong} formatter={(value) => formatNumber(Number(value))} />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Statistic title='Tổng trị giá' value={tongTriGia} formatter={(value) => formatCurrency(Number(value))} />
          </Card>
        </Col>
      </Row>

      <Card title='Tổng hợp theo loại tờ khai' style={{ marginBottom: 16 }}>
        <Table columns={columnsLoaiToKhai} dataSource={data?.tong_hop_theo_loai_to_khai} loading={loading} rowKey={(record) => record.loai_to_khai} pagination={false} />
      </Card>

      <Card title='Tổng hợp theo luồng' style={{ marginBottom: 16 }}>
        <Table columns={columnsLuong} dataSource={data?.tong_hop_theo_luong} loading={loading} rowKey={(record) => record.luong} pagination={false} />
      </Card>

      <Card title='Tổng hợp kết hợp (Loại tờ khai & Luồng)'>
        <Table columns={columnsKetHop} dataSource={data?.tong_hop_ket_hop} loading={loading} rowKey={(record) => `${record.loai_to_khai}-${record.luong}`} pagination={false} />
      </Card>
    </React.Fragment>
  );
}
