CREATE PROCEDURE sp_Hang_Hoa_Cap_Nhat
  @id INT,
  @name NVARCHAR(50),
  @price MONEY,
  @discount DECIMAL(18, 2) = 0,
  @stock INT = 0
AS
BEGIN
  UPDATE HangHoa
    SET name = @name,
        price = @price,
        discount = @discount,
        stock = @stock
    WHERE id = @id

  -- Trả về số dòng bị ảnh hưởng
  SELECT @@ROWCOUNT AS affected_rows;
END
go
