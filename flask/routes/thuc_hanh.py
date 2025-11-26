from flask import Blueprint, jsonify, request
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


thuc_hanh_bp = Blueprint('thuc_hanh', __name__)


@thuc_hanh_bp.route('/api/thuc_hanh/thuc_hanh_1')
def thuc_hanh_1():
    return jsonify({
        "message": "Hello",
        "number": 12345
    })


@thuc_hanh_bp.route('/api/thuc_hanh/thuc_hanh_2')
def thuc_hanh_2():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)
        cursor.execute('SELECT * FROM Orders')
        products = cursor.fetchall()
        conn.close()

        return jsonify(products)
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@thuc_hanh_bp.route('/api/thuc_hanh/thuc_hanh_3', methods=['POST'])
def add_product():
    """Thêm sản phẩm mới bằng stored procedure"""
    try:
        data = request.get_json()

        # Lấy dữ liệu từ request
        category_id = data.get('CategoryId')
        supplier_id = data.get('SupplierId')
        name = data.get('Name')
        price = data.get('Price')
        discount = data.get('Discount', 0)
        stock = data.get('Stock', 0)
        description = data.get('Description', None)

        # Kiểm tra dữ liệu bắt buộc
        if not all([category_id, supplier_id, name, price is not None]):
            return jsonify({
                "success": False,
                "error": "Thiếu thông tin bắt buộc: CategoryId, SupplierId, Name, Price"
            }), 400

        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)

        # Thực thi stored procedure
        cursor.execute(
            'EXEC sp_Products_Add %s, %s, %s, %s, %s, %s, %s',
            (category_id, supplier_id, name, price, discount, stock, description)
        )

        # Lấy ProductId vừa được tạo
        result = cursor.fetchone()
        product_id = result['ProductId'] if result else None

        conn.commit()
        conn.close()

        return jsonify({
            "success": True,
            "message": "Thêm sản phẩm thành công",
            "result": product_id
        }), 201

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
