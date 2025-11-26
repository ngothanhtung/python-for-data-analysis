/* eslint-disable @typescript-eslint/no-explicit-any */
import { Breadcrumb, Button, Card, Form, Input, InputNumber, message, Modal, Table, Space, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

type FieldType = {
  name?: string;
  price?: number;
  discount?: number;
  stock?: number;
};

type HangHoa = {
  id: number;
  name: string;
  price: string;
  discount: string;
  stock: number;
};

export default function HangHoaThemMoi() {
  const [form] = Form.useForm<FieldType>();
  const [editForm] = Form.useForm<FieldType>();
  const [data, setData] = useState<HangHoa[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<HangHoa | null>(null);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/api/hang_hoa/danh_sach');
      setData(response.data);
    } catch (error) {
      message.error('Không thể tải danh sách hàng hóa');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onFinish = (values: FieldType) => {
    console.log('Success:', values);

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:8000/api/hang_hoa/them_moi',
      headers: {
        'Content-Type': 'application/json',
      },
      data: values,
    };

    axios
      .request(config)
      .then((response) => {
        // Sau khi thêm mới thành công
        message.success('Thêm mới hàng hóa thành công!');
        form.resetFields();
        getData(); // Tải lại danh sách
        console.log(JSON.stringify(response.data));
      })
      .catch((error) => {
        // Xử lý lỗi
        message.error('Có lỗi xảy ra khi thêm mới hàng hóa.');
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleEdit = (record: HangHoa) => {
    setEditingRecord(record);
    editForm.setFieldsValue({
      name: record.name,
      price: parseFloat(record.price),
      discount: parseFloat(record.discount),
      stock: record.stock,
    });
    setIsModalOpen(true);
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setEditingRecord(null);
    editForm.resetFields();
  };

  const handleModalOk = async () => {
    try {
      const values = await editForm.validateFields();

      // Gọi API cập nhật
      await axios.put(`http://localhost:8000/api/hang_hoa/cap_nhat/${editingRecord?.id}`, values);

      message.success('Cập nhật hàng hóa thành công!');
      setIsModalOpen(false);
      setEditingRecord(null);
      editForm.resetFields();
      getData(); // Tải lại danh sách
    } catch (error) {
      message.error('Có lỗi xảy ra khi cập nhật hàng hóa.');
      console.error(error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/api/hang_hoa/xoa/${id}`);
      message.success('Xóa hàng hóa thành công!');
      getData(); // Tải lại danh sách
    } catch (error) {
      message.error('Có lỗi xảy ra khi xóa hàng hóa.');
      console.error(error);
    }
  };

  const columns: ColumnsType<HangHoa> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: 'Tên hàng hóa',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      key: 'price',
      align: 'right',
      render: (value) => parseFloat(value)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
    },
    {
      title: 'Giảm giá (%)',
      dataIndex: 'discount',
      key: 'discount',
      align: 'right',
      render: (value) => `${parseFloat(value)?.toFixed(2)}%`,
    },
    {
      title: 'Tồn kho',
      dataIndex: 'stock',
      key: 'stock',
      align: 'right',
      render: (value) => value?.toLocaleString('vi-VN'),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 150,
      align: 'center',
      render: (_, record) => (
        <Space>
          <Button type='link' icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Sửa
          </Button>
          <Popconfirm title='Xóa hàng hóa' description='Bạn có chắc chắn muốn xóa hàng hóa này?' onConfirm={() => handleDelete(record.id)} okText='Xóa' cancelText='Hủy' okButtonProps={{ danger: true }}>
            <Button type='link' danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <React.Fragment>
      <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Trang chủ' }, { title: 'Hàng hóa' }, { title: 'Thêm mới' }]} />
      <Card title='Hàng hóa'>
        <Form form={form} name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete='off'>
          <Form.Item<FieldType> label='Name' name='name' rules={[{ required: true, message: 'Please input the name!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label='Price' name='price' rules={[{ required: true, message: 'Please input the price!' }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item<FieldType> label='Discount' name='discount' rules={[{ required: true, message: 'Please input the discount!' }]}>
            <InputNumber />
          </Form.Item>

          <Form.Item<FieldType> label='Stock' name='stock' rules={[{ required: true, message: 'Please input the stock!' }]}>
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' htmlType='submit'>
              Thêm mới
            </Button>
          </Form.Item>
        </Form>
      </Card>

      <Card title='Danh sách hàng hóa' style={{ marginTop: 16 }}>
        <Table columns={columns} dataSource={data} loading={loading} rowKey='id' pagination={{ pageSize: 10 }} />
      </Card>

      <Modal title='Sửa thông tin hàng hóa' open={isModalOpen} onOk={handleModalOk} onCancel={handleModalCancel} okText='Cập nhật' cancelText='Hủy' width={600}>
        <Form form={editForm} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} style={{ marginTop: 20 }}>
          <Form.Item<FieldType> label='Tên hàng hóa' name='name' rules={[{ required: true, message: 'Vui lòng nhập tên hàng hóa!' }]}>
            <Input />
          </Form.Item>

          <Form.Item<FieldType> label='Giá' name='price' rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>

          <Form.Item<FieldType> label='Giảm giá (%)' name='discount' rules={[{ required: true, message: 'Vui lòng nhập giảm giá!' }]}>
            <InputNumber style={{ width: '100%' }} min={0} max={100} />
          </Form.Item>

          <Form.Item<FieldType> label='Tồn kho' name='stock' rules={[{ required: true, message: 'Vui lòng nhập số lượng tồn kho!' }]}>
            <InputNumber style={{ width: '100%' }} min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
