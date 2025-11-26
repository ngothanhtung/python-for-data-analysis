CREATE PROCEDURE sp_Hang_Hoa_Them_Moi
  @name NVARCHAR(50),
  @price MONEY,
  @discount DECIMAL(18, 2) = 0,
  @stock INT = 0
AS
BEGIN
  INSERT INTO HangHoa
    (name, price, discount, stock)
  VALUES
    (@name, @price, @discount, @stock)

  -- Trả về id vừa tạo
  SELECT SCOPE_IDENTITY() AS id;
END
go
