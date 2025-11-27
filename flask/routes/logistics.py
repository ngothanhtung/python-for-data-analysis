from flask import Blueprint, jsonify
import pandas as pd

logistics_bp = Blueprint('logistics', __name__)


@logistics_bp.route('/api/bao-cao/logistics/thong-ke-chuyen-hang-theo-quoc-gia')
def báo_cao_1():
    # Đọc dữ liệu từ file CSV
    df = pd.read_csv('notebook/logistics.csv')

    country_stats = df.groupby('Country').agg({
        'ShipmentID': 'count',
        'Value(USD)': ['sum', 'mean', 'min', 'max'],
        'Quantity(kg)': 'sum'
    }).round(2)

    # Đổi tên cột
    country_stats.columns = ['Số lượng chuyến hàng',
                             'Tổng giá trị (USD)', 'Giá trị TB (USD)', 'Giá trị min (USD)', 'Giá trị max (USD)', 'Tổng khối lượng (kg)']

    # Sắp xếp theo tổng giá trị giảm dần
    country_stats = country_stats.sort_values(
        'Tổng giá trị (USD)', ascending=False)

    # Chuyển DataFrame thành dictionary để trả về JSON
    return jsonify(country_stats.reset_index().to_dict('records'))


@logistics_bp.route('/api/bao-cao/logistics/thong-ke-tong-hop-theo-cang')
def báo_cao_2():
    # Đọc dữ liệu từ file CSV
    df = pd.read_csv('notebook/logistics.csv')
    # Thống kê tổng hợp theo cảng
    port_stats = df.groupby('Port').agg({
        'ShipmentID': 'count',
        'Value(USD)': ['sum', 'mean', 'min', 'max'],
        'Quantity(kg)': 'sum',
        'ClearanceTime(days)': 'mean'
    }).round(2)

    # Đổi tên cột
    port_stats.columns = [
        'Số lượng chuyến hàng',
        'Tổng giá trị (USD)',
        'Giá trị TB (USD)',
        'Giá trị min (USD)',
        'Giá trị max (USD)',
        'Tổng khối lượng (kg)',
        'Thời gian thông quan TB (ngày)'
    ]

    # Sắp xếp theo tổng giá trị giảm dần
    port_stats = port_stats.sort_values('Tổng giá trị (USD)', ascending=False)

    # Chuyển DataFrame thành dictionary để trả về JSON
    return jsonify(port_stats.reset_index().to_dict('records'))
