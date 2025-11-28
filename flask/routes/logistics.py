from flask import Blueprint, jsonify
import pandas as pd

import pymssql
from config import MSSQL_CONFIG


def get_db_connection():
    """Tạo kết nối đến MSSQL"""
    conn = pymssql.connect(
        server=MSSQL_CONFIG['server'],
        user=MSSQL_CONFIG['user'],
        password=MSSQL_CONFIG['password'],
        database=MSSQL_CONFIG['database']
    )
    return conn


logistics_bp = Blueprint('logistics', __name__)


@logistics_bp.route('/api/logistics/danh-sach')
def danh_sach():
    df = pd.read_csv('notebook/logistics.csv')
    # Làm sạch dữ liệu: loại bỏ các dòng có NaN trong value_usd hoặc quantity_kg
    df = df.dropna(subset=['value_usd', 'quantity_kg'])
    return jsonify(df.to_dict('records'))


@logistics_bp.route('/api/bao-cao/logistics/thong-ke-chuyen-hang-theo-quoc-gia')
def báo_cao_1():
    # Đọc dữ liệu từ file CSV
    df = pd.read_csv('notebook/logistics.csv')
    # Làm sạch dữ liệu: loại bỏ các dòng có NaN trong value_usd hoặc quantity_kg
    df = df.dropna(subset=['value_usd', 'quantity_kg'])

    country_stats = df.groupby('country').agg({
        'shipment_id': 'count',
        'value_usd': ['sum', 'mean', 'min', 'max'],
        'quantity_kg': 'sum'
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
    # Làm sạch dữ liệu: loại bỏ các dòng có NaN trong value_usd hoặc quantity_kg
    df = df.dropna(subset=['value_usd', 'quantity_kg'])
    # Thống kê tổng hợp theo cảng
    port_stats = df.groupby('port').agg({
        'shipment_id': 'count',
        'value_usd': ['sum', 'mean', 'min', 'max'],
        'quantity_kg': 'sum',
        'clearance_time_days': 'mean'
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


@logistics_bp.route('/api/bao-cao/logistics/thong-ke-hang-hoa-theo-danh-muc')
def bao_cao_3():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)
        cursor.execute('EXEC sp_ProductsWithCategoryAndSupplier')
        products = cursor.fetchall()
        conn.close()

        # Dùng pandas để phân tích dữ liệu
        df = pd.DataFrame(products)

        # Phân tích theo danh mục (CategoryName)
        category_stats = df.groupby('CategoryName').agg({
            'Id': 'count',
            'Price': ['mean', 'min', 'max'],
            'Stock': 'sum'

        }).round(2)

        category_stats.columns = [
            'Số lượng sản phẩm',
            'Giá TB',
            'Giá min',
            'Giá max',
            'Tồn kho'

        ]
        category_stats = category_stats.sort_values(
            'Số lượng sản phẩm', ascending=False)

        return jsonify(category_stats.reset_index().to_dict('records'))
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@logistics_bp.route('/api/bao-cao/logistics/thong-ke-hang-hoa-theo-nha-cung-cap')
def bao_cao_4():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)
        cursor.execute('EXEC sp_ProductsWithCategoryAndSupplier')
        products = cursor.fetchall()
        conn.close()

        # Dùng pandas để phân tích dữ liệu
        df = pd.DataFrame(products)

        # Phân tích theo nhà cung cấp (SupplierName)
        supplier_stats = df.groupby('SupplierName').agg({
            'Id': 'count',
            'Price': ['mean', 'min', 'max'],
            'Stock': 'sum'

        }).round(2)

        supplier_stats.columns = [
            'Số lượng sản phẩm',
            'Giá TB',
            'Giá min',
            'Giá max',
            'Tồn kho'
        ]
        supplier_stats = supplier_stats.sort_values(
            'Số lượng sản phẩm', ascending=False)

        return jsonify(supplier_stats.reset_index().to_dict('records'))
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
