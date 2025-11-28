import pandas as pd

# Đọc file CSV
df = pd.read_csv('notebook/logistics.csv')

# Thêm cột id (autonumber) ở đầu
df.insert(0, 'id', range(1, len(df) + 1))

# Đổi tên các cột sang snake_case
df.columns = [
    'id',
    'shipment_id',
    'country',
    'port',
    'product',
    'quantity_kg',
    'value_usd',
    'transport_mode',
    'eta',
    'clearance_time_days',
    'status'
]

# Lưu lại file CSV
df.to_csv('notebook/logistics.csv', index=False)

print("✓ Đã cập nhật file logistics.csv:")
print(f"  - Thêm cột 'id' (autonumber từ 1 đến {len(df)})")
print("  - Đổi tên các cột sang snake_case")
print("\nCác cột mới:")
for i, col in enumerate(df.columns, 1):
    print(f"  {i}. {col}")

print(f"\n5 dòng đầu tiên:")
print(df.head())
