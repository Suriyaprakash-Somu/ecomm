import dbConnect from "../../config/db.js";

export const getCustomerCategories = async (req, res) => {
  try {
    const { pageIndex = 0, pageSize = 10 } = req.query;
    const offset = Number(pageIndex) * Number(pageSize);
    const parsedPageSize = Number(pageSize);

    const [categories] = await dbConnect.query(
      `SELECT category_id, category_name 
           FROM categories 
           WHERE isActive = 1 
           ORDER BY created_at DESC 
           LIMIT ? OFFSET ?`,
      [parsedPageSize, offset]
    );

    const [countResult] = await dbConnect.query(
      `SELECT COUNT(*) as total FROM categories WHERE isActive = 1`
    );

    const totalRows = countResult[0]?.total || 0;
    const totalPages = Math.ceil(totalRows / parsedPageSize);

    res.status(200).json({
      pages: categories,
      rowCount: totalRows,
      totalPages,
      pageIndex: Number(pageIndex),
      hasNextPage: Number(pageIndex) < totalPages - 1,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
