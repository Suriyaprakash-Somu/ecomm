import dbConnect from "../../config/db.js";

export const getCustomerProducts = async (req, res) => {
  try {
    const { pageIndex = 0, pageSize = 10 } = req.query;
    const offset = Number(pageIndex) * Number(pageSize);
    const parsedPageSize = Number(pageSize);

    const [products] = await dbConnect.query(
      `SELECT product_id, product_name, product_url, category_id, price, description, rating, image_url 
       FROM products 
       WHERE isActive = 1 
       ORDER BY created_at DESC 
       LIMIT ? OFFSET ?`,
      [parsedPageSize, offset]
    );

    const [countResult] = await dbConnect.query(
      `SELECT COUNT(*) as total FROM products WHERE isActive = 1`
    );

    const totalRows = countResult[0]?.total || 0;
    const totalPages = Math.ceil(totalRows / parsedPageSize);

    res.status(200).json({
      pages: products,
      rowCount: totalRows,
      totalPages,
      pageIndex: Number(pageIndex),
      hasNextPage: Number(pageIndex) < totalPages - 1,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
