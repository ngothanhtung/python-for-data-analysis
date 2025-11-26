# 📊 Python Data Analysis Dashboard

A powerful interactive data analysis dashboard built with Python, Pandas, Plotly, and Streamlit.

## 🚀 Features

- **Interactive File Upload**: Support for CSV and Excel files
- **Data Preview**: View and explore your dataset
- **Statistical Analysis**: Comprehensive statistical summaries
- **Interactive Visualizations**:
  - Histograms for distribution analysis
  - Box plots for outlier detection
  - Scatter plots with trend lines
  - Correlation heatmaps
- **Data Information**: Column types, null values, and unique counts
- **Export Functionality**: Download processed data as CSV

## 📋 Prerequisites

- Python 3.8 or higher
- pip (Python package installer)

## 🛠️ Installation

1. **Clone or navigate to the project directory**:
   ```bash
   cd /Users/tony/GitHub/Aptech/python-for-data-analysis/dashboard
   ```

2. **Create a virtual environment** (recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On macOS/Linux
   # or
   venv\Scripts\activate  # On Windows
   ```

3. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

## 🎯 Usage

1. **Run the Streamlit app**:
   ```bash
   streamlit run app.py
   ```

2. **Open your browser** and navigate to the URL shown in the terminal (usually `http://localhost:8501`)

3. **Upload your data**:
   - Click on "Browse files" in the sidebar
   - Select a CSV or Excel file
   - Explore your data using the interactive dashboard

## 📦 Dependencies

- **pandas**: Data manipulation and analysis
- **plotly**: Interactive visualizations
- **streamlit**: Web application framework
- **numpy**: Numerical computing
- **openpyxl**: Excel file support

## 🎨 Dashboard Sections

### 📋 Data Preview
- View the first 100 rows of your dataset
- Download processed data as CSV

### 📈 Visualizations
- Create histograms to analyze distributions
- Generate box plots to identify outliers
- Build scatter plots with trend lines

### 📊 Statistics
- View descriptive statistics
- Explore correlation matrices with heatmaps

### 🔍 Data Info
- Check column data types
- Identify missing values
- Count unique values per column

## 💡 Tips

- For best results, ensure your data is clean and properly formatted
- Numeric columns are required for most visualizations
- Large datasets may take longer to process

## 🤝 Contributing

Feel free to fork this project and submit pull requests with improvements!

## 📄 License

This project is open source and available for educational purposes.
