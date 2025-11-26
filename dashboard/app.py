import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# Page configuration
st.set_page_config(
    page_title="Data Analysis Dashboard",
    page_icon="📊",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
    <style>
    .main {
        padding: 0rem 1rem;
    }
    .stMetric {
        background-color: #f0f2f6;
        padding: 15px;
        border-radius: 10px;
    }
    </style>
    """, unsafe_allow_html=True)

# Title
st.title("📊 Data Analysis Dashboard")
st.markdown("---")

# Sidebar
with st.sidebar:
    st.header("⚙️ Configuration")
    st.markdown("Upload your data and configure visualizations")
    
    # File uploader
    uploaded_file = st.file_uploader(
        "Choose a CSV or Excel file",
        type=['csv', 'xlsx', 'xls']
    )

# Main content
if uploaded_file is not None:
    try:
        # Read the file
        if uploaded_file.name.endswith('.csv'):
            df = pd.read_csv(uploaded_file)
        else:
            df = pd.read_excel(uploaded_file)
        
        st.success(f"✅ Successfully loaded {uploaded_file.name}")
        
        # Display basic information
        col1, col2, col3, col4 = st.columns(4)
        
        with col1:
            st.metric("Total Rows", f"{len(df):,}")
        with col2:
            st.metric("Total Columns", len(df.columns))
        with col3:
            st.metric("Numeric Columns", len(df.select_dtypes(include=['number']).columns))
        with col4:
            st.metric("Missing Values", f"{df.isnull().sum().sum():,}")
        
        st.markdown("---")
        
        # Tabs for different views
        tab1, tab2, tab3, tab4 = st.tabs(["📋 Data Preview", "📈 Visualizations", "📊 Statistics", "🔍 Data Info"])
        
        with tab1:
            st.subheader("Data Preview")
            st.dataframe(df.head(100), use_container_width=True)
            
            # Download button
            csv = df.to_csv(index=False).encode('utf-8')
            st.download_button(
                label="📥 Download as CSV",
                data=csv,
                file_name="processed_data.csv",
                mime="text/csv"
            )
        
        with tab2:
            st.subheader("Data Visualizations")
            
            # Get numeric columns
            numeric_cols = df.select_dtypes(include=['number']).columns.tolist()
            
            if len(numeric_cols) > 0:
                col1, col2 = st.columns(2)
                
                with col1:
                    # Select column for histogram
                    hist_col = st.selectbox("Select column for histogram", numeric_cols, key="hist")
                    if hist_col:
                        fig_hist = px.histogram(
                            df, 
                            x=hist_col,
                            title=f"Distribution of {hist_col}",
                            color_discrete_sequence=['#636EFA']
                        )
                        fig_hist.update_layout(
                            showlegend=False,
                            height=400
                        )
                        st.plotly_chart(fig_hist, use_container_width=True)
                
                with col2:
                    # Select column for box plot
                    box_col = st.selectbox("Select column for box plot", numeric_cols, key="box")
                    if box_col:
                        fig_box = px.box(
                            df,
                            y=box_col,
                            title=f"Box Plot of {box_col}",
                            color_discrete_sequence=['#EF553B']
                        )
                        fig_box.update_layout(
                            showlegend=False,
                            height=400
                        )
                        st.plotly_chart(fig_box, use_container_width=True)
                
                # Scatter plot
                if len(numeric_cols) >= 2:
                    st.markdown("---")
                    col1, col2 = st.columns(2)
                    with col1:
                        x_col = st.selectbox("Select X axis", numeric_cols, key="scatter_x")
                    with col2:
                        y_col = st.selectbox("Select Y axis", numeric_cols, index=min(1, len(numeric_cols)-1), key="scatter_y")
                    
                    if x_col and y_col:
                        fig_scatter = px.scatter(
                            df,
                            x=x_col,
                            y=y_col,
                            title=f"{y_col} vs {x_col}",
                            color_discrete_sequence=['#00CC96'],
                            trendline="ols"
                        )
                        fig_scatter.update_layout(height=500)
                        st.plotly_chart(fig_scatter, use_container_width=True)
                
                # Bar chart
                st.markdown("---")
                st.subheader("📊 Bar Chart")
                
                # Get categorical columns
                categorical_cols = df.select_dtypes(include=['object', 'category']).columns.tolist()
                
                if len(categorical_cols) > 0 and len(numeric_cols) > 0:
                    col1, col2, col3 = st.columns(3)
                    
                    with col1:
                        bar_cat_col = st.selectbox("Select category column", categorical_cols, key="bar_cat")
                    with col2:
                        bar_num_col = st.selectbox("Select value column", numeric_cols, key="bar_num")
                    with col3:
                        bar_agg = st.selectbox("Aggregation", ["sum", "mean", "count", "median"], key="bar_agg")
                    
                    if bar_cat_col and bar_num_col:
                        # Aggregate data
                        if bar_agg == "sum":
                            agg_data = df.groupby(bar_cat_col)[bar_num_col].sum().reset_index()
                        elif bar_agg == "mean":
                            agg_data = df.groupby(bar_cat_col)[bar_num_col].mean().reset_index()
                        elif bar_agg == "count":
                            agg_data = df.groupby(bar_cat_col)[bar_num_col].count().reset_index()
                        else:  # median
                            agg_data = df.groupby(bar_cat_col)[bar_num_col].median().reset_index()
                        
                        # Sort by value
                        agg_data = agg_data.sort_values(bar_num_col, ascending=False)
                        
                        fig_bar = px.bar(
                            agg_data,
                            x=bar_cat_col,
                            y=bar_num_col,
                            title=f"{bar_num_col} by {bar_cat_col} ({bar_agg.capitalize()})",
                            color=bar_num_col,
                            color_continuous_scale='Viridis',
                            text_auto='.2f'
                        )
                        fig_bar.update_layout(
                            height=500,
                            showlegend=False,
                            xaxis_title=bar_cat_col,
                            yaxis_title=f"{bar_agg.capitalize()} of {bar_num_col}"
                        )
                        fig_bar.update_traces(textposition='outside')
                        st.plotly_chart(fig_bar, use_container_width=True)
                else:
                    st.info("Bar chart requires at least one categorical and one numeric column")
            else:
                st.warning("No numeric columns found for visualization")
        
        with tab3:
            st.subheader("Statistical Summary")
            st.dataframe(df.describe(), use_container_width=True)
            
            # Correlation matrix for numeric columns
            if len(numeric_cols) > 1:
                st.markdown("---")
                st.subheader("Correlation Matrix")
                corr_matrix = df[numeric_cols].corr()
                
                fig_corr = px.imshow(
                    corr_matrix,
                    text_auto='.2f',
                    aspect="auto",
                    color_continuous_scale='RdBu_r',
                    title="Correlation Heatmap"
                )
                fig_corr.update_layout(height=600)
                st.plotly_chart(fig_corr, use_container_width=True)
        
        with tab4:
            st.subheader("Dataset Information")
            
            # Column information
            col_info = pd.DataFrame({
                'Column': df.columns,
                'Data Type': df.dtypes.values,
                'Non-Null Count': df.count().values,
                'Null Count': df.isnull().sum().values,
                'Unique Values': [df[col].nunique() for col in df.columns]
            })
            
            st.dataframe(col_info, use_container_width=True)
            
    except Exception as e:
        st.error(f"❌ Error loading file: {str(e)}")
        st.info("Please make sure your file is a valid CSV or Excel file")

else:
    # Welcome message
    st.info("👈 Please upload a CSV or Excel file from the sidebar to get started")
    
    # Sample data demo
    st.subheader("📝 Sample Demo")
    st.markdown("Here's a quick demo with sample data:")
    
    # Create sample data
    import numpy as np
    sample_data = pd.DataFrame({
        'Date': pd.date_range('2024-01-01', periods=100),
        'Sales': np.random.randint(100, 1000, 100),
        'Profit': np.random.randint(20, 300, 100),
        'Category': np.random.choice(['A', 'B', 'C'], 100),
        'Region': np.random.choice(['North', 'South', 'East', 'West'], 100)
    })
    
    st.dataframe(sample_data.head(10), use_container_width=True)
    
    # Sample visualization
    fig = px.line(
        sample_data,
        x='Date',
        y='Sales',
        title='Sample Sales Trend',
        color_discrete_sequence=['#636EFA']
    )
    fig.update_layout(height=400)
    st.plotly_chart(fig, use_container_width=True)

    
