-- Stored Procedure: sp_Products_Add
-- Mô tả: Thêm sản phẩm mới vào bảng Products

CREATE PROCEDURE sp_Products_Add
  @CategoryId INT,
  @SupplierId INT,
  @Name NVARCHAR(255),
  @Price DECIMAL(18, 2),
  @Discount DECIMAL(5, 2) = 0,
  @Stock INT = 0,
  @Description NVARCHAR(MAX) = NULL
AS
BEGIN
  SET NOCOUNT ON;

  BEGIN TRY
        INSERT INTO Products
    (CategoryId, SupplierId, Name, Price, Discount, Stock, Description)
  VALUES
    (@CategoryId, @SupplierId, @Name, @Price, @Discount, @Stock, @Description);
        
        -- Trả về ProductId vừa tạo
        SELECT SCOPE_IDENTITY() AS ProductId;
    END TRY
    BEGIN CATCH
        -- Xử lý lỗi
        DECLARE @ErrorMessage NVARCHAR(4000) = ERROR_MESSAGE();
        DECLARE @ErrorSeverity INT = ERROR_SEVERITY();
        DECLARE @ErrorState INT = ERROR_STATE();
        
        RAISERROR(@ErrorMessage, @ErrorSeverity, @ErrorState);
    END CATCH
END;
GO
