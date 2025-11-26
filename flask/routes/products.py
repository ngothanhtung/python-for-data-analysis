from flask import Blueprint, jsonify, request
import pymssql
from config import MSSQL_CONFIG

products_bp = Blueprint('products', __name__)

# Tạo kết nối đến MSSQL


def get_db_connection():
    """Tạo kết nối đến MSSQL"""
    conn = pymssql.connect(
        server=MSSQL_CONFIG['server'],
        user=MSSQL_CONFIG['user'],
        password=MSSQL_CONFIG['password'],
        database=MSSQL_CONFIG['database']
    )
    return conn

# Gọi tất cả sản phẩm từ bảng Products


@products_bp.route('/api/products')
def get_products():
    """Lấy danh sách tất cả sản phẩm"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)
        cursor.execute('SELECT * FROM Products')
        products = cursor.fetchall()
        conn.close()

        return jsonify(products)
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# Lấy tất cả sản phẩm từ stored procedure

# Mặc định là GET


@products_bp.route('/api/all-products', methods=['GET'])
def get_all_products():
    """Lấy danh sách tất cả sản phẩm từ stored procedure"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)
        cursor.execute('EXEC sp_Products_GetAll')
        products = cursor.fetchall()
        conn.close()

        return jsonify(products)
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500

# Thêm mới dữ liệu sản phẩm bằng stored procedure


@products_bp.route('/api/products/add', methods=['POST'])
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


@products_bp.route('/api/products/update', methods=['PUT'])
def update_product():
    """Cập nhật sản phẩm bằng stored procedure"""
    try:
        data = request.get_json()

        # Lấy dữ liệu từ request
        product_id = data.get('ProductId')
        category_id = data.get('CategoryId')
        supplier_id = data.get('SupplierId')
        name = data.get('Name')
        price = data.get('Price')
        discount = data.get('Discount', 0)
        stock = data.get('Stock', 0)
        description = data.get('Description', None)

        # Kiểm tra dữ liệu bắt buộc
        if not all([product_id, category_id, supplier_id, name, price is not None]):
            return jsonify({
                "success": False,
                "error": "Thiếu thông tin bắt buộc: ProductId, CategoryId, SupplierId, Name, Price"
            }), 400

        conn = get_db_connection()
        cursor = conn.cursor(as_dict=True)

        # Thực thi stored procedure
        cursor.execute(
            'EXEC sp_Products_Update %s, %s, %s, %s, %s, %s, %s, %s',
            (product_id, category_id, supplier_id,
             name, price, discount, stock, description)
        )

        # Lấy số dòng được cập nhật
        result = cursor.fetchone()
        rows_affected = result['RowsAffected'] if result else 0

        conn.commit()
        conn.close()

        if rows_affected > 0:
            return jsonify({
                "success": True,
                "message": "Cập nhật sản phẩm thành công",
                "result": rows_affected
            }), 200
        else:
            return jsonify({
                "success": False,
                "message": "Không tìm thấy sản phẩm để cập nhật"
            }), 404

    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500
