import { Card, Col, Row, Spin, Tabs, type TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

import apiClient from '@/libraries/api-client';

interface ChartData {
  bar_grouped: string;
  bar_to_khai: string;
  pie_luong: string;
  scatter: string;
}

export default function BieuDoGiaoBan() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // TODO: Thay đổi endpoint này theo API thực tế
        const response = await apiClient.get<ChartData>('/api/bao-cao/giao-ban/bieu-do');
        setChartData(response.data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size='large' />
      </div>
    );
  }

  if (!chartData) {
    return <div>Không có dữ liệu</div>;
  }

  // Parse JSON strings thành objects
  const barGroupedData = JSON.parse(chartData.bar_grouped);
  const barToKhaiData = JSON.parse(chartData.bar_to_khai);
  const pieLuongData = JSON.parse(chartData.pie_luong);
  const scatterData = JSON.parse(chartData.scatter);

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tab 1',
      children: (
        <Card title='Tổng Trị giá theo Luồng và Loại Tờ khai'>
          <Plot data={barGroupedData.data} layout={barGroupedData.layout} config={{ responsive: true }} style={{ width: '100%', height: '400px' }} />
        </Card>
      ),
    },
    {
      key: '2',
      label: 'Tab 2',
      children: (
        <Card title='Số lượng theo Loại Tờ khai'>
          <Plot data={barToKhaiData.data} layout={barToKhaiData.layout} config={{ responsive: true }} style={{ width: '100%', height: '400px' }} />
        </Card>
      ),
    },
    {
      key: '3',
      label: 'Tab 3',
      children: (
        <Card title='Phân bố theo Luồng'>
          <Plot data={pieLuongData.data} layout={pieLuongData.layout} config={{ responsive: true }} style={{ width: '100%', height: '400px' }} />
        </Card>
      ),
    },
    {
      key: '4',
      label: 'Tab 4',
      children: (
        <Card title='Trị giá vs Thuế suất'>
          <Plot data={scatterData.data} layout={scatterData.layout} config={{ responsive: true }} style={{ width: '100%', height: '400px' }} />
        </Card>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <h1>Biểu Đồ Giao Ban</h1>

      <Tabs defaultActiveKey='1' items={items} />
    </div>
  );
}
