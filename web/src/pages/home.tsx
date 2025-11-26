import { Button, Card, DatePicker, Form, Select, Table } from 'antd';

import type { FormProps } from 'antd';
type DataType = {
  id: number;
  name: string;
  age: number;
  address: string;
  gender: string;
  phone: string;
  email: string;
  hobby: string;
};

const data: DataType[] = [
  {
    id: 1,
    name: 'Nguyễn Văn A',
    age: 32,
    address: '10 Downing Street',
    gender: 'Nam',
    phone: '0901234567',
    email: 'nguyenvana@email.com',
    hobby: 'Đọc sách',
  },
  {
    id: 2,
    name: 'Nguyễn Văn C',
    age: 23,
    address: '10 Downing Street',
    gender: 'Nam',
    phone: '0902345678',
    email: 'nguyenvanc@email.com',
    hobby: 'Chơi game',
  },
  {
    id: 3,
    name: 'Nguyễn Văn X',
    age: 45,
    address: '10 Downing Street',
    gender: 'Nam',
    phone: '0903456789',
    email: 'nguyenvanx@email.com',
    hobby: 'Câu cá',
  },
  {
    id: 4,
    name: 'Nguyễn Văn Y',
    age: 43,
    address: '10 Downing Street',
    gender: 'Nam',
    phone: '0904567890',
    email: 'nguyenvany@email.com',
    hobby: 'Du lịch',
  },
  {
    id: 5,
    name: 'Trần Thị B',
    age: 28,
    address: '123 Lê Lợi',
    gender: 'Nữ',
    phone: '0905678901',
    email: 'tranthib@email.com',
    hobby: 'Nấu ăn',
  },
  {
    id: 6,
    name: 'Lê Văn D',
    age: 35,
    address: '456 Trần Hưng Đạo',
    gender: 'Nam',
    phone: '0906789012',
    email: 'levand@email.com',
    hobby: 'Thể thao',
  },
  {
    id: 7,
    name: 'Phạm Thị E',
    age: 29,
    address: '789 Nguyễn Huệ',
    gender: 'Nữ',
    phone: '0907890123',
    email: 'phamthie@email.com',
    hobby: 'Nghe nhạc',
  },
  {
    id: 8,
    name: 'Hoàng Văn F',
    age: 41,
    address: '234 Hai Bà Trưng',
    gender: 'Nam',
    phone: '0908901234',
    email: 'hoangvanf@email.com',
    hobby: 'Nhiếp ảnh',
  },
  {
    id: 9,
    name: 'Đặng Thị G',
    age: 26,
    address: '567 Lý Thường Kiệt',
    gender: 'Nữ',
    phone: '0909012345',
    email: 'dangthig@email.com',
    hobby: 'Vẽ tranh',
  },
  {
    id: 10,
    name: 'Vũ Văn H',
    age: 38,
    address: '890 Điện Biên Phủ',
    gender: 'Nam',
    phone: '0910123456',
    email: 'vuvanh@email.com',
    hobby: 'Chơi cờ',
  },
  {
    id: 11,
    name: 'Bùi Thị I',
    age: 31,
    address: '345 Phan Đình Phùng',
    gender: 'Nữ',
    phone: '0911234567',
    email: 'buithii@email.com',
    hobby: 'Làm vườn',
  },
  {
    id: 12,
    name: 'Đỗ Văn K',
    age: 44,
    address: '678 Quang Trung',
    gender: 'Nam',
    phone: '0912345678',
    email: 'dovank@email.com',
    hobby: 'Đọc báo',
  },
  {
    id: 13,
    name: 'Ngô Thị L',
    age: 27,
    address: '901 Lê Duẩn',
    gender: 'Nữ',
    phone: '0913456789',
    email: 'ngothil@email.com',
    hobby: 'Yoga',
  },
  {
    id: 14,
    name: 'Mai Văn M',
    age: 36,
    address: '234 Trường Chinh',
    gender: 'Nam',
    phone: '0914567890',
    email: 'maivanm@email.com',
    hobby: 'Bơi lội',
  },
  {
    id: 15,
    name: 'Trương Thị N',
    age: 30,
    address: '567 Hoàng Diệu',
    gender: 'Nữ',
    phone: '0915678901',
    email: 'truongthin@email.com',
    hobby: 'Khiêu vũ',
  },
  {
    id: 16,
    name: 'Lý Văn O',
    age: 42,
    address: '890 Võ Văn Tần',
    gender: 'Nam',
    phone: '0916789012',
    email: 'lyvano@email.com',
    hobby: 'Chơi golf',
  },
  {
    id: 17,
    name: 'Dương Thị P',
    age: 25,
    address: '123 Pasteur',
    gender: 'Nữ',
    phone: '0917890123',
    email: 'duongthip@email.com',
    hobby: 'Mua sắm',
  },
  {
    id: 18,
    name: 'Đinh Văn Q',
    age: 39,
    address: '456 Cách Mạng Tháng 8',
    gender: 'Nam',
    phone: '0918901234',
    email: 'dinhvanq@email.com',
    hobby: 'Xem phim',
  },
  {
    id: 19,
    name: 'Phan Thị R',
    age: 33,
    address: '789 Lê Hồng Phong',
    gender: 'Nữ',
    phone: '0919012345',
    email: 'phanthir@email.com',
    hobby: 'Thêu thùa',
  },
  {
    id: 20,
    name: 'Cao Văn S',
    age: 37,
    address: '234 Nguyễn Thái Học',
    gender: 'Nam',
    phone: '0920123456',
    email: 'caovans@email.com',
    hobby: 'Câu lạc bộ',
  },
  {
    id: 21,
    name: 'Nguyễn Thị T',
    age: 34,
    address: '567 Võ Thị Sáu',
    gender: 'Nữ',
    phone: '0921234567',
    email: 'nguyenthit@email.com',
    hobby: 'Đan len',
  },
  {
    id: 22,
    name: 'Trần Văn U',
    age: 40,
    address: '890 Bà Huyện Thanh Quan',
    gender: 'Nam',
    phone: '0922345678',
    email: 'tranvanu@email.com',
    hobby: 'Đá bóng',
  },
  {
    id: 23,
    name: 'Lê Thị V',
    age: 24,
    address: '123 Nguyễn Đình Chiểu',
    gender: 'Nữ',
    phone: '0923456789',
    email: 'lethiv@email.com',
    hobby: 'Hát karaoke',
  },
  {
    id: 24,
    name: 'Phạm Văn W',
    age: 46,
    address: '456 Phan Chu Trinh',
    gender: 'Nam',
    phone: '0924567890',
    email: 'phamvanw@email.com',
    hobby: 'Chơi bida',
  },
  {
    id: 25,
    name: 'Hoàng Thị X',
    age: 29,
    address: '789 Đinh Tiên Hoàng',
    gender: 'Nữ',
    phone: '0925678901',
    email: 'hoangthix@email.com',
    hobby: 'Làm bánh',
  },
  {
    id: 26,
    name: 'Đặng Văn Y',
    age: 35,
    address: '234 Lý Tự Trọng',
    gender: 'Nam',
    phone: '0926789012',
    email: 'dangvany@email.com',
    hobby: 'Leo núi',
  },
  {
    id: 27,
    name: 'Vũ Thị Z',
    age: 28,
    address: '567 Tôn Đức Thắng',
    gender: 'Nữ',
    phone: '0927890123',
    email: 'vuthiz@email.com',
    hobby: 'Chạy bộ',
  },
  {
    id: 28,
    name: 'Bùi Văn AA',
    age: 41,
    address: '890 Nguyễn Trãi',
    gender: 'Nam',
    phone: '0928901234',
    email: 'buivanaa@email.com',
    hobby: 'Sưu tầm tem',
  },
  {
    id: 29,
    name: 'Đỗ Thị BB',
    age: 26,
    address: '123 Trần Phú',
    gender: 'Nữ',
    phone: '0929012345',
    email: 'dothibb@email.com',
    hobby: 'Thiền định',
  },
  {
    id: 30,
    name: 'Ngô Văn CC',
    age: 38,
    address: '456 Lê Lai',
    gender: 'Nam',
    phone: '0930123456',
    email: 'ngovancc@email.com',
    hobby: 'Cắm trại',
  },
  {
    id: 31,
    name: 'Mai Thị DD',
    age: 32,
    address: '789 Nguyễn Thị Minh Khai',
    gender: 'Nữ',
    phone: '0931234567',
    email: 'maithidd@email.com',
    hobby: 'Làm đồ handmade',
  },
  {
    id: 32,
    name: 'Trương Văn EE',
    age: 43,
    address: '234 Hoàng Văn Thụ',
    gender: 'Nam',
    phone: '0932345678',
    email: 'truongvanee@email.com',
    hobby: 'Chơi nhạc cụ',
  },
  {
    id: 33,
    name: 'Lý Thị FF',
    age: 27,
    address: '567 Nguyễn Công Trứ',
    gender: 'Nữ',
    phone: '0933456789',
    email: 'lythiff@email.com',
    hobby: 'Viết blog',
  },
  {
    id: 34,
    name: 'Dương Văn GG',
    age: 36,
    address: '890 Cống Quỳnh',
    gender: 'Nam',
    phone: '0934567890',
    email: 'duongvangg@email.com',
    hobby: 'Lặn biển',
  },
  {
    id: 35,
    name: 'Đinh Thị HH',
    age: 30,
    address: '123 Nam Kỳ Khởi Nghĩa',
    gender: 'Nữ',
    phone: '0935678901',
    email: 'dinhthihh@email.com',
    hobby: 'Học ngoại ngữ',
  },
  {
    id: 36,
    name: 'Phan Văn II',
    age: 44,
    address: '456 Võ Văn Kiệt',
    gender: 'Nam',
    phone: '0936789012',
    email: 'phanvanii@email.com',
    hobby: 'Nuôi cá cảnh',
  },
  {
    id: 37,
    name: 'Cao Thị JJ',
    age: 25,
    address: '789 Hùng Vương',
    gender: 'Nữ',
    phone: '0937890123',
    email: 'caothijj@email.com',
    hobby: 'Điêu khắc',
  },
  {
    id: 38,
    name: 'Nguyễn Văn KK',
    age: 39,
    address: '234 Trần Quốc Toản',
    gender: 'Nam',
    phone: '0938901234',
    email: 'nguyenvankk@email.com',
    hobby: 'Chơi cầu lông',
  },
  {
    id: 39,
    name: 'Trần Thị LL',
    age: 31,
    address: '567 Lý Chính Thắng',
    gender: 'Nữ',
    phone: '0939012345',
    email: 'tranthill@email.com',
    hobby: 'Thiết kế nội thất',
  },
  {
    id: 40,
    name: 'Lê Văn MM',
    age: 42,
    address: '890 Nguyễn Bỉnh Khiêm',
    gender: 'Nam',
    phone: '0940123456',
    email: 'levanmm@email.com',
    hobby: 'Sửa xe',
  },
  {
    id: 41,
    name: 'Phạm Thị NN',
    age: 28,
    address: '123 Trần Khánh Dư',
    gender: 'Nữ',
    phone: '0941234567',
    email: 'phamthinn@email.com',
    hobby: 'Làm spa',
  },
  {
    id: 42,
    name: 'Hoàng Văn OO',
    age: 37,
    address: '456 Phạm Ngũ Lão',
    gender: 'Nam',
    phone: '0942345678',
    email: 'hoangvanoo@email.com',
    hobby: 'Sưu tầm đồ cổ',
  },
  {
    id: 43,
    name: 'Đặng Thị PP',
    age: 29,
    address: '789 Bùi Viện',
    gender: 'Nữ',
    phone: '0943456789',
    email: 'dangthipp@email.com',
    hobby: 'Trang điểm',
  },
  {
    id: 44,
    name: 'Vũ Văn QQ',
    age: 45,
    address: '234 Đề Thám',
    gender: 'Nam',
    phone: '0944567890',
    email: 'vuvanqq@email.com',
    hobby: 'Chơi bi-a',
  },
  {
    id: 45,
    name: 'Bùi Thị RR',
    age: 33,
    address: '567 Cô Giang',
    gender: 'Nữ',
    phone: '0945678901',
    email: 'buithirr@email.com',
    hobby: 'Pilates',
  },
  {
    id: 46,
    name: 'Đỗ Văn SS',
    age: 40,
    address: '890 Yersin',
    gender: 'Nam',
    phone: '0946789012',
    email: 'dovanss@email.com',
    hobby: 'Chơi tennis',
  },
  {
    id: 47,
    name: 'Ngô Thị TT',
    age: 26,
    address: '123 Alexandre de Rhodes',
    gender: 'Nữ',
    phone: '0947890123',
    email: 'ngothitt@email.com',
    hobby: 'Làm móng',
  },
  {
    id: 48,
    name: 'Mai Văn UU',
    age: 38,
    address: '456 Mạc Đĩnh Chi',
    gender: 'Nam',
    phone: '0948901234',
    email: 'maivanuu@email.com',
    hobby: 'Lái xe đạp',
  },
  {
    id: 49,
    name: 'Trương Thị VV',
    age: 32,
    address: '789 Trần Huy Liệu',
    gender: 'Nữ',
    phone: '0949012345',
    email: 'truongthivv@email.com',
    hobby: 'Làm gốm',
  },
  {
    id: 50,
    name: 'Lý Văn WW',
    age: 41,
    address: '234 Nguyễn Du',
    gender: 'Nam',
    phone: '0950123456',
    email: 'lyvanww@email.com',
    hobby: 'Chơi võ thuật',
  },
];

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Họ tên',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => <strong>{text}</strong>,
  },
  {
    title: 'Tuổi',
    dataIndex: 'age',
    key: 'age',
    sorter: (a: DataType, b: DataType) => a.age - b.age,
    render: (age: number) => (
      <span>
        {age} {age > 40 && '👴'}
      </span>
    ),
  },
  {
    title: 'Địa chỉ',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender',
    render: (text: string) => <span style={{ color: text === 'Nam' ? 'blue' : 'pink' }}>{text}</span>,
  },
  {
    title: 'Điện thoại',
    dataIndex: 'phone',
    key: 'phone',
    render: (text: string) => <span style={{ color: 'red' }}>{text}</span>,
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Sở thích',
    dataIndex: 'hobby',
    key: 'hobby',
  },
];

function Home() {
  const onFinish: FormProps['onFinish'] = (values) => {
    console.log('Success:', values);
    // TODO:
    // Gọi API (Python Flask) để nhập dữ liệu
  };

  return (
    <>
      <Card title='Báo cáo tổng hợp'>
        <Form name='basic' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={{ maxWidth: 600 }} initialValues={{ remember: true }} onFinish={onFinish} onFinishFailed={() => {}} autoComplete='off'>
          <Form.Item label='Từ ngày' name='tu_ngay' rules={[{ required: true, message: 'Vui lòng chọn từ ngày!' }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item label='Đến ngày' name='den_ngay' rules={[{ required: true, message: 'Vui lòng chọn đến ngày!' }]}>
            <DatePicker />
          </Form.Item>

          <Form.Item name='ma_don_vi' label='Đơn vị' rules={[{ required: true }]}>
            <Select
              allowClear
              placeholder='Select a option and change input text above'
              options={[
                { label: 'Phòng CNTT', value: '1' },
                { label: 'Phòng Tổ chức cán bộ', value: '2' },
                { label: 'Hải quan Sân bay quốc tế Đà Nẵng', value: '3' },
                { label: 'other', value: 'other' },
              ]}
            />
          </Form.Item>

          <Form.Item label={null}>
            <Button type='primary' htmlType='submit'>
              Xử lý dữ liệu
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title='Danh sách dữ liệu'>
        <Table dataSource={data} columns={columns} />
      </Card>
    </>
  );
}

export default Home;
