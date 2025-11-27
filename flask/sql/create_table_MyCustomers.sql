-- Tạo bảng MyCustomers
CREATE TABLE MyCustomers
(
  Id INT PRIMARY KEY IDENTITY(1,1),
  FullName NVARCHAR(100) NOT NULL,
  Email VARCHAR(100) NOT NULL UNIQUE,
  Country VARCHAR(50),
  Gender VARCHAR(10),
  DoB DATE
);

-- Thêm chỉ mục cho Email để tăng tốc độ tìm kiếm
CREATE INDEX idx_MyCustomers_Email ON MyCustomers(Email);

-- Thêm chỉ mục cho Country để tăng tốc độ truy vấn theo quốc gia
CREATE INDEX idx_MyCustomers_Country ON MyCustomers(Country);

-- Thêm ràng buộc kiểm tra Gender (tùy chọn)
ALTER TABLE MyCustomers
ADD CONSTRAINT chk_MyCustomers_Gender 
CHECK (Gender IN ('Male', 'Female', 'Other', NULL));

-- Thêm ràng buộc kiểm tra Email format (tùy chọn)
ALTER TABLE MyCustomers
ADD CONSTRAINT chk_MyCustomers_Email 
CHECK (Email LIKE '%_@__%.__%');
