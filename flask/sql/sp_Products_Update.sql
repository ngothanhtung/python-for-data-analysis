-- Stored Procedure: sp_Products_Update
-- Mô tả: Cập nhật thông tin sản phẩm trong bảng Products

CREATE OR ALTER PROCEDURE sp_Products_Update
  @ProductId INT,
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
        -- Kiểm tra sản phẩm có tồn tại không
        IF NOT EXISTS (SELECT 1
  FROM Products
  WHERE Products.Id = @ProductId)
        BEGIN
    RAISERROR('Product not found. ', 16, 1);
    RETURN;
  END

        UPDATE Products
        SET 
            CategoryId = @CategoryId,
            SupplierId = @SupplierId,
            Name = @Name,
            Price = @Price,
            Discount = @Discount,
            Stock = @Stock,
            Description = @Description
        WHERE Id = @ProductId;
        
        -- Trả về số dòng được cập nhật
        SELECT @@ROWCOUNT AS RowsAffected;
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
