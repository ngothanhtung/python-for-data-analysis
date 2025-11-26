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


hang_hoa_bp = Blueprint('hang_hoa', __name__)


@hang_hoa_bp.route('/api/hang_hoa/them_moi', methods=['POST'])
def them_moi():
    """Thêm sản phẩm mới bằng stored procedure"""
    try:
        data = request.get_json()

        # Lấy dữ liệu từ request
        name = data.get('name')
        price = data.get('price')
        discount = data.get('discount', 0)
        stock = data.get('stock', 0)

        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)

        # Thực thi stored procedure
        cursor.execute(
            'EXEC sp_Hang_Hoa_Them_Moi %s, %s, %s, %s',
            (name, price, discount, stock)
        )

        # Lấy ProductId vừa được tạo
        result = cursor.fetchone()
        id = result['id'] if result else None

        conn.commit()
        conn.close()

        return jsonify({
            "success": True,
            "message": "Thêm sản phẩm thành công",
            "id": id
        }), 201

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@hang_hoa_bp.route('/api/hang_hoa/danh_sach')
def danh_sach():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)
        cursor.execute('SELECT * FROM HangHoa ORDER BY Price DESC')
        products = cursor.fetchall()
        conn.close()

        return jsonify(products)
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@hang_hoa_bp.route('/api/hang_hoa/cap_nhat/<int:id>', methods=['PUT'])
def cap_nhat(id):
    """Cập nhật thông tin hàng hóa bằng stored procedure"""
    try:
        data = request.get_json()

        # Lấy dữ liệu từ request
        name = data.get('name')
        price = data.get('price')
        discount = data.get('discount', 0)
        stock = data.get('stock', 0)

        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)

        # Thực thi stored procedure
        cursor.execute(
            'EXEC sp_Hang_Hoa_Cap_Nhat %s, %s, %s, %s, %s',
            (id, name, price, discount, stock)
        )

        # Lấy số dòng bị ảnh hưởng
        result = cursor.fetchone()
        affected_rows = result['affected_rows'] if result else 0

        conn.commit()
        conn.close()

        if affected_rows > 0:
            return jsonify({
                "success": True,
                "message": "Cập nhật hàng hóa thành công",
                "id": id
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "Không tìm thấy hàng hóa với id này"
            }), 404

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@hang_hoa_bp.route('/api/hang_hoa/xoa/<int:id>', methods=['DELETE'])
def xoa(id):
    """Xóa hàng hóa theo id"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # Thực thi câu lệnh DELETE
        cursor.execute('DELETE FROM HangHoa WHERE id = %s', (id,))

        affected_rows = cursor.rowcount

        conn.commit()
        conn.close()

        if affected_rows > 0:
            return jsonify({
                "success": True,
                "message": "Xóa hàng hóa thành công",
                "id": id
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "Không tìm thấy hàng hóa với id này"
            }), 404

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
