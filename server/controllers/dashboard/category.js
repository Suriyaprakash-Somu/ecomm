import dbConnect from "../../config/db.js";

export const addCategory = async (req, res) => {
  try {
    const { category_name, isActive } = req.body;

    if (!category_name) {
      return res.status(400).json({ message: "Category name is required" });
    }

    const [existingCategory] = await dbConnect.query(
      "SELECT * FROM categories WHERE category_name = ?",
      [category_name]
    );

    if (existingCategory.length > 0) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const [result] = await dbConnect.query(
      "INSERT INTO categories (category_name, isActive, created_at, updated_at) VALUES (?, ?, NOW(), NOW())",
      [category_name, isActive ? 1 : 0]
    );

    res.status(201).json({
      message: "Category added successfully",
      category_id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategories = async (req, res) => {
  try {
    const { pageIndex = 0, pageSize = 10, filters, sorting } = req.query;
    let parsedFilters = [];
    let parsedSorting = [];

    try {
      parsedFilters =
        filters && filters !== "undefined" ? JSON.parse(filters) : [];
      parsedSorting =
        sorting && sorting !== "undefined" ? JSON.parse(sorting) : [];
    } catch (error) {
      parsedFilters = [];
      parsedSorting = [];
    }

    let filterQuery = "";
    let filterValues = [];

    if (parsedFilters.length > 0) {
      parsedFilters.forEach((filter) => {
        filterQuery += ` AND ${filter.id} LIKE ?`;
        filterValues.push(`%${filter.value}%`);
      });
    }

    let sortQuery = "ORDER BY created_at DESC";
    if (parsedSorting.length > 0) {
      sortQuery = `ORDER BY ${parsedSorting
        .map((s) => `${s.id} ${s.desc ? "DESC" : "ASC"}`)
        .join(", ")}`;
    }

    const offset = Number(pageIndex) * Number(pageSize);

    const [categories] = await dbConnect.query(
      `SELECT category_id, category_id AS id, category_name, isActive FROM categories WHERE 1=1 ${filterQuery} ${sortQuery} LIMIT ? OFFSET ?`,
      [...filterValues, Number(pageSize), offset]
    );

    const [countResult] = await dbConnect.query(
      `SELECT COUNT(*) as total FROM categories WHERE 1=1 ${filterQuery}`,
      filterValues
    );

    res.status(200).json({
      rows: categories,
      rowCount: countResult[0].total,
    });
  } catch (error) {
    console.error("Error in getCategories:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Category ID is required" });
    }

    const [categoryCheck] = await dbConnect.query(
      "SELECT * FROM categories WHERE category_id = ?",
      [id]
    );

    if (categoryCheck.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    await dbConnect.query("DELETE FROM categories WHERE category_id = ?", [id]);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { category_id, category_name, isActive } = req.body;

    if (!category_id || !category_name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [existingCategory] = await dbConnect.query(
      "SELECT * FROM categories WHERE category_id = ?",
      [category_id]
    );

    if (existingCategory.length === 0) {
      return res.status(404).json({ message: "Category not found" });
    }

    await dbConnect.query(
      "UPDATE categories SET category_name = ?, isActive = ?, updated_at = NOW() WHERE category_id = ?",
      [category_name, isActive ? 1 : 0, category_id]
    );

    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
