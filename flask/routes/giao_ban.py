from flask import Blueprint, jsonify
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px

giao_ban_bp = Blueprint('giao_ban', __name__)

# Dữ liệu mẫu báo cáo giao ban
GIAO_BAN_DATA = [
    {
        "id": 1,
        "doanh_nghiep": "Công ty TNHH ABC",
        "loai_to_khai": "Nhập khẩu",
        "luong": "Đỏ",
        "tri_gia": 1500000,
        "thue_suat": 10
    },
    {
        "id": 2,
        "doanh_nghiep": "Công ty CP XYZ",
        "loai_to_khai": "Xuất khẩu",
        "luong": "Xanh",
        "tri_gia": 2300000,
        "thue_suat": 8
    },
    {
        "id": 3,
        "doanh_nghiep": "Công ty TNHH Việt Nam",
        "loai_to_khai": "Nhập khẩu",
        "luong": "Vàng",
        "tri_gia": 3200000,
        "thue_suat": 12
    },
    {
        "id": 4,
        "doanh_nghiep": "Công ty CP Thương Mại",
        "loai_to_khai": "Xuất khẩu",
        "luong": "Đỏ",
        "tri_gia": 1800000,
        "thue_suat": 10
    },
    {
        "id": 5,
        "doanh_nghiep": "Công ty TNHH Đông Á",
        "loai_to_khai": "Nhập khẩu",
        "luong": "Xanh",
        "tri_gia": 4500000,
        "thue_suat": 15
    },
    {
        "id": 6,
        "doanh_nghiep": "Công ty CP Hải Phòng",
        "loai_to_khai": "Xuất khẩu",
        "luong": "Vàng",
        "tri_gia": 2700000,
        "thue_suat": 9
    },
    {
        "id": 7,
        "doanh_nghiep": "Công ty TNHH Thái Bình",
        "loai_to_khai": "Nhập khẩu",
        "luong": "Đỏ",
        "tri_gia": 1900000,
        "thue_suat": 11
    },
    {
        "id": 8,
        "doanh_nghiep": "Công ty CP Nam Định",
        "loai_to_khai": "Xuất khẩu",
        "luong": "Xanh",
        "tri_gia": 3600000,
        "thue_suat": 13
    },
    {
        "id": 9,
        "doanh_nghiep": "Công ty TNHH Hà Nội",
        "loai_to_khai": "Nhập khẩu",
        "luong": "Vàng",
        "tri_gia": 5200000,
        "thue_suat": 14
    },
    {
        "id": 10,
        "doanh_nghiep": "Công ty CP Sài Gòn",
        "loai_to_khai": "Xuất khẩu",
        "luong": "Đỏ",
        "tri_gia": 2100000,
        "thue_suat": 10
    },
    {
        "id": 11,
        "doanh_nghiep": "Công ty TNHH Đà Nẵng",
        "loai_to_khai": "Nhập khẩu",
        "luong": "Xanh",
        "tri_gia": 2900000,
        "thue_suat": 12
    },
    {
        "id": 12,
        "doanh_nghiep": "Công ty CP Cần Thơ",
        "loai_to_khai": "Xuất khẩu",
        "luong": "Vàng",
        "tri_gia": 4100000,
        "thue_suat": 11
    },
    {
        "id": 13,
        "doanh_nghiep": "Công ty TNHH Huế",
        "loai_to_khai": "Nhập khẩu",
        "luong": "Đỏ",
        "tri_gia": 1600000,
        "thue_suat": 9
    },
    {
        "id": 14,
        "doanh_nghiep": "Công ty CP Nghệ An",
        "loai_to_khai": "Xuất khẩu",
        "luong": "Xanh",
        "tri_gia": 3800000,
        "thue_suat": 13
    },
    {
        "id": 15,
        "doanh_nghiep": "Công ty TNHH Quảng Ninh",
        "loai_to_khai": "Nhập khẩu",
        "luong": "Vàng",
        "tri_gia": 4800000,
        "thue_suat": 15
    },
    {
        "id": 16,
        "doanh_nghiep": "Công ty CP Bình Dương",
        "loai_to_khai": "Xuất khẩu",
        "luong": "Đỏ",
        "tri_gia": 2400000,
        "thue_suat": 10
    },
    {
        "id": 17,
        "doanh_nghiep": "Công ty TNHH Đồng Nai",
        "loai_to_khai": "Nhập khẩu",
        "luong": "Xanh",
        "tri_gia": 3300000,
        "thue_suat": 12
    },
    {
        "id": 18,
        "doanh_nghiep": "Công ty CP Long An",
        "loai_to_khai": "Xuất khẩu",
        "luong": "Vàng",
        "tri_gia": 5500000,
        "thue_suat": 14
    },
    {
        "id": 19,
        "doanh_nghiep": "Công ty TNHH Vũng Tàu",
        "loai_to_khai": "Nhập khẩu",
        "luong": "Đỏ",
        "tri_gia": 2000000,
        "thue_suat": 11
    },
    {
        "id": 20,
        "doanh_nghiep": "Công ty CP Kiên Giang",
        "loai_to_khai": "Nhập khẩu",
        "luong": "Đỏ",
        "tri_gia": 4200000,
        "thue_suat": 13
    }
]


@giao_ban_bp.route('/api/bao-cao/giao-ban/thong-ke', methods=['GET'])
def bao_cao_giao_ban():
    """Thống kê dữ liệu báo cáo giao ban theo luồng và loại tờ khai"""
    # Chuyển đổi dữ liệu sang DataFrame
    df = pd.DataFrame(GIAO_BAN_DATA)

    # Thống kê theo luồng
    thong_ke_luong = df['luong'].value_counts().to_dict()

    # Thống kê theo loại tờ khai
    thong_ke_loai_to_khai = df['loai_to_khai'].value_counts().to_dict()

    # Thống kê kết hợp luồng và loại tờ khai
    thong_ke_ket_hop = df.groupby(
        ['luong', 'loai_to_khai']).size().reset_index(name='so_luong')

    # Tính tổng trị giá theo luồng
    tong_tri_gia_luong = df.groupby('luong')['tri_gia'].sum().to_dict()

    # Tính tổng trị giá theo loại tờ khai
    tong_tri_gia_to_khai = df.groupby('loai_to_khai')[
        'tri_gia'].sum().to_dict()

    return jsonify({
        "thong_ke_luong": thong_ke_luong,
        "thong_ke_loai_to_khai": thong_ke_loai_to_khai,
        "thong_ke_ket_hop": thong_ke_ket_hop.to_dict('records'),
        "tong_tri_gia_theo_luong": tong_tri_gia_luong,
        "tong_tri_gia_theo_loai_to_khai": tong_tri_gia_to_khai,
        "tong_so_ban_ghi": len(df)
    })


@giao_ban_bp.route('/api/bao-cao/giao-ban/bieu-do', methods=['GET'])
def bieu_do_giao_ban():
    """Tạo biểu đồ Plotly cho ReactJS"""
    # Chuyển đổi dữ liệu sang DataFrame
    df = pd.DataFrame(GIAO_BAN_DATA)

    # Định nghĩa màu sắc cho luồng
    color_map = {
        'Đỏ': 'red',
        'Xanh': 'green',
        'Vàng': 'gold'
    }

    # Định nghĩa màu sắc cho loại tờ khai
    to_khai_color_map = {
        'Nhập khẩu': 'green',
        'Xuất khẩu': 'red'
    }

    # 1. Biểu đồ Pie - Phân bố theo luồng
    luong_counts = df['luong'].value_counts()
    # Sắp xếp theo thứ tự Đỏ, Xanh, Vàng
    luong_order = ['Đỏ', 'Xanh', 'Vàng']
    luong_counts = luong_counts.reindex(luong_order, fill_value=0)

    pie_luong = go.Figure(data=[go.Pie(
        labels=luong_counts.index,
        values=luong_counts.values,
        marker=dict(colors=[color_map[l] for l in luong_counts.index])
    )])
    pie_luong.update_layout(title='Phân bố theo Luồng')

    # 2. Biểu đồ Bar - Số lượng theo loại tờ khai
    to_khai_counts = df['loai_to_khai'].value_counts()
    bar_to_khai = go.Figure(data=[go.Bar(
        x=to_khai_counts.index,
        y=to_khai_counts.values,
        marker_color=[to_khai_color_map[tk] for tk in to_khai_counts.index]
    )])
    bar_to_khai.update_layout(
        title='Số lượng theo Loại Tờ khai',
        xaxis_title='Loại Tờ khai',
        yaxis_title='Số lượng'
    )

    # 3. Biểu đồ Bar nhóm - Tổng trị giá theo luồng và loại tờ khai
    tri_gia_grouped = df.groupby(['loai_to_khai', 'luong'])[
        'tri_gia'].sum().reset_index()
    bar_grouped = px.bar(
        tri_gia_grouped,
        x='luong',
        y='tri_gia',
        color='loai_to_khai',
        barmode='group',
        title='Tổng Trị giá theo Luồng và Loại Tờ khai',
        labels={'tri_gia': 'Trị giá', 'luong': 'Luồng',
                'loai_to_khai': 'Loại Tờ khai'},
        category_orders={'luong': luong_order},
        color_discrete_map=to_khai_color_map
    )

    # 4. Biểu đồ Scatter - Trị giá vs Thuế suất
    scatter = px.scatter(
        df,
        x='tri_gia',
        y='thue_suat',
        color='luong',
        size='tri_gia',
        hover_data=['doanh_nghiep'],
        title='Trị giá vs Thuế suất',
        labels={'tri_gia': 'Trị giá',
                'thue_suat': 'Thuế suất (%)', 'luong': 'Luồng'},
        color_discrete_map=color_map,
        category_orders={'luong': luong_order}
    )

    # Trả về JSON cho ReactJS Plotly
    return jsonify({
        'pie_luong': pie_luong.to_json(),
        'bar_to_khai': bar_to_khai.to_json(),
        'bar_grouped': bar_grouped.to_json(),
        'scatter': scatter.to_json()
    })
