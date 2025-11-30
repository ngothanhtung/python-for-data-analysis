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
