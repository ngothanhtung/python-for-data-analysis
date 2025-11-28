import streamlit as st
import pandas as pd
import plotly.express as px

# Page configuration
st.set_page_config(
    page_title="Data Viewer",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Title
st.title("📊 Danh sách hàng hóa")

# Load data from CSV file
df = pd.read_csv('sample_data.csv')

# Optional: Display data summary
st.write(f"Tổng số: {len(df)}")


# Display table
st.dataframe(df, use_container_width=True)

# Phân tích dữ liệu
st.write("### Phân tích dữ liệu")
# Dùng Label tiếng việt cho phần mô tả data
st.write("Tổng doanh số:", df['Sales'].sum())
st.write("Doanh số trung bình:", df['Sales'].mean())
st.write("Sản phẩm có doanh số cao nhất:",
         df.loc[df['Sales'].idxmax()]['Product'])
st.write("Sản phẩm có doanh số thấp nhất:",
         df.loc[df['Sales'].idxmin()]['Product'])


# Vẽ biểu đồ Bar Chart
st.write("### Biểu đồ phân phối doanh số")
st.bar_chart(df['Sales'])

# Vẽ biểu đồ Pie Chart với Plotly
st.write("### Biểu đồ tròn phân phối theo danh mục")
category_counts = df['Category'].value_counts()
fig = px.pie(
    values=category_counts.values,
    names=category_counts.index,
    title='Phân phối sản phẩm theo danh mục'
)
st.plotly_chart(fig, use_container_width=True)
