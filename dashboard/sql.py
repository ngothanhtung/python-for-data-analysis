import streamlit as st
import pandas as pd
import plotly.express as px
from db import get_db_connection


# Page configuration
st.set_page_config(
    page_title="Data Viewer",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Title
st.title("📊 Danh sách hàng hóa")

# Load data from MSSQL database
conn = get_db_connection()
query = "SELECT * FROM Products"  # Giả sử bảng tên là Products
df = pd.read_sql(query, conn)
conn.close()

# Display table
st.dataframe(df, use_container_width=True)

# Phân tích dữ liệu
st.write("### Phân tích dữ liệu")
# Dùng Label tiếng việt cho phần mô tả data
st.write("Tổng giá trị:", df['Price'].sum())
st.write("Giá trị trung bình:", df['Price'].mean())
st.write("Sản phẩm có giá cao nhất:",
         df.loc[df['Price'].idxmax()]['Name'])
st.write("Sản phẩm có giá thấp nhất:",
         df.loc[df['Price'].idxmin()]['Name'])

# Vẽ biểu đồ Bar Chart
st.write("### Biểu đồ phân phối giá")
st.bar_chart(df['Price'])
