from flask import Blueprint, jsonify
import pandas as pd

to_khai_bp = Blueprint('to_khai', __name__)

# Dữ liệu tờ khai
GIAO_BAN_DATA = [
    {"id": 1, "doanh_nghiep": "Công ty TNHH ABC", "loai_to_khai": "Nhập khẩu",
        "luong": "Đỏ", "tri_gia": 1500000, "thue_suat": 10},
    {"id": 2, "doanh_nghiep": "Công ty CP XYZ", "loai_to_khai": "Xuất khẩu",
        "luong": "Xanh", "tri_gia": 2300000, "thue_suat": 8},
    {"id": 3, "doanh_nghiep": "Công ty TNHH Việt Nam", "loai_to_khai": "Nhập khẩu",
        "luong": "Vàng", "tri_gia": 3200000, "thue_suat": 12},
    {"id": 4, "doanh_nghiep": "Công ty CP Thương Mại", "loai_to_khai": "Xuất khẩu",
        "luong": "Đỏ", "tri_gia": 1800000, "thue_suat": 10},
    {"id": 5, "doanh_nghiep": "Công ty TNHH Đông Á", "loai_to_khai": "Nhập khẩu",
        "luong": "Xanh", "tri_gia": 4500000, "thue_suat": 15},
    {"id": 6, "doanh_nghiep": "Công ty CP Hải Phòng", "loai_to_khai": "Xuất khẩu",
        "luong": "Vàng", "tri_gia": 2700000, "thue_suat": 9},
    {"id": 7, "doanh_nghiep": "Công ty TNHH Thái Bình", "loai_to_khai": "Nhập khẩu",
        "luong": "Đỏ", "tri_gia": 1900000, "thue_suat": 11},
    {"id": 8, "doanh_nghiep": "Công ty CP Nam Định", "loai_to_khai": "Xuất khẩu",
        "luong": "Xanh", "tri_gia": 3600000, "thue_suat": 13},
    {"id": 9, "doanh_nghiep": "Công ty TNHH Hà Nội", "loai_to_khai": "Nhập khẩu",
        "luong": "Vàng", "tri_gia": 5200000, "thue_suat": 14},
    {"id": 10, "doanh_nghiep": "Công ty CP Sài Gòn", "loai_to_khai": "Xuất khẩu",
        "luong": "Đỏ", "tri_gia": 2100000, "thue_suat": 10},
    {"id": 11, "doanh_nghiep": "Công ty TNHH Đà Nẵng", "loai_to_khai": "Nhập khẩu",
        "luong": "Xanh", "tri_gia": 2900000, "thue_suat": 12},
    {"id": 12, "doanh_nghiep": "Công ty CP Cần Thơ", "loai_to_khai": "Xuất khẩu",
        "luong": "Vàng", "tri_gia": 4100000, "thue_suat": 11},
    {"id": 13, "doanh_nghiep": "Công ty TNHH Huế", "loai_to_khai": "Nhập khẩu",
        "luong": "Đỏ", "tri_gia": 1600000, "thue_suat": 9},
    {"id": 14, "doanh_nghiep": "Công ty CP Nghệ An", "loai_to_khai": "Xuất khẩu",
        "luong": "Xanh", "tri_gia": 3800000, "thue_suat": 13},
    {"id": 15, "doanh_nghiep": "Công ty TNHH Quảng Ninh", "loai_to_khai": "Nhập khẩu",
        "luong": "Vàng", "tri_gia": 4800000, "thue_suat": 15},
    {"id": 16, "doanh_nghiep": "Công ty CP Bình Dương", "loai_to_khai": "Xuất khẩu",
        "luong": "Đỏ", "tri_gia": 2400000, "thue_suat": 10},
    {"id": 17, "doanh_nghiep": "Công ty TNHH Đồng Nai", "loai_to_khai": "Nhập khẩu",
        "luong": "Xanh", "tri_gia": 3300000, "thue_suat": 12},
    {"id": 18, "doanh_nghiep": "Công ty CP Long An", "loai_to_khai": "Xuất khẩu",
        "luong": "Vàng", "tri_gia": 5500000, "thue_suat": 14},
    {"id": 19, "doanh_nghiep": "Công ty TNHH Vũng Tàu", "loai_to_khai": "Nhập khẩu",
        "luong": "Đỏ", "tri_gia": 2000000, "thue_suat": 11},
    {"id": 20, "doanh_nghiep": "Công ty CP Kiên Giang", "loai_to_khai": "Nhập khẩu",
        "luong": "Đỏ", "tri_gia": 4200000, "thue_suat": 13}
]


@to_khai_bp.route('/api/bao-cao/to-khai/thong-ke')
def bao_cao_to_khai():
    # Chuyển dữ liệu thành DataFrame
    df = pd.DataFrame(GIAO_BAN_DATA)

    # Tổng hợp theo luồng
    tong_hop_luong = df.groupby('luong').agg({
        'tri_gia': ['sum', 'mean', 'count'],
        'thue_suat': 'mean'
    }).round(2)
    tong_hop_luong.columns = ['tong_tri_gia',
                              'tri_gia_tb', 'so_luong', 'thue_suat_tb']

    # Tổng hợp theo loại tờ khai
    tong_hop_to_khai = df.groupby('loai_to_khai').agg({
        'tri_gia': ['sum', 'mean', 'count'],
        'thue_suat': 'mean'
    }).round(2)
    tong_hop_to_khai.columns = ['tong_tri_gia',
                                'tri_gia_tb', 'so_luong', 'thue_suat_tb']

    # Tổng hợp theo cả luồng và loại tờ khai
    tong_hop_ket_hop = df.groupby(['luong', 'loai_to_khai']).agg({
        'tri_gia': ['sum', 'mean', 'count'],
        'thue_suat': 'mean'
    }).round(2)
    tong_hop_ket_hop.columns = ['tong_tri_gia',
                                'tri_gia_tb', 'so_luong', 'thue_suat_tb']

    # Chuyển DataFrame thành dictionary để trả về JSON
    return jsonify({
        "tong_hop_theo_luong": tong_hop_luong.reset_index().to_dict('records'),
        "tong_hop_theo_loai_to_khai": tong_hop_to_khai.reset_index().to_dict('records'),
        "tong_hop_ket_hop": tong_hop_ket_hop.reset_index().to_dict('records'),
    })
