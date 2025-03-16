import slugify from "slugify";
import dbConnect from "../../config/db.js";

export const addProduct = async (req, res) => {
  try {
    const {
      product_name,
      category_id,
      price,
      description,
      isActive,
      isFeatured,
      isRecent,
      rating,
      image_url,
    } = req.body;

    if (!product_name || !category_id || !price) {
      return res
        .status(400)
        .json({ message: "Product name, category, and price are required" });
    }

    const productUrl = slugify(product_name, { lower: true, strict: true });

    const [existingProduct] = await dbConnect.query(
      "SELECT * FROM products WHERE product_url = ?",
      [productUrl]
    );

    if (existingProduct.length > 0) {
      return res
        .status(400)
        .json({ message: "A product with this URL already exists" });
    }

    const [result] = await dbConnect.query(
      "INSERT INTO products (product_name, product_url, category_id, price, description, isActive, isFeatured, isRecent, rating, image_url, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [
        product_name,
        productUrl,
        category_id,
        price,
        description,
        isActive ? 1 : 0,
        isFeatured ? 1 : 0,
        isRecent ? 1 : 0,
        rating || 0,
        image_url,
      ]
    );

    res.status(201).json({
      message: "Product added successfully",
      product_id: result.insertId,
      product_url: productUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getProducts = async (req, res) => {
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

    const [products] = await dbConnect.query(
      `SELECT product_id, product_id AS id, product_name, product_url, category_id, price, description, isActive, isFeatured, isRecent, rating, image_url FROM products WHERE 1=1 ${filterQuery} ${sortQuery} LIMIT ? OFFSET ?`,
      [...filterValues, Number(pageSize), offset]
    );

    const [countResult] = await dbConnect.query(
      `SELECT COUNT(*) as total FROM products WHERE 1=1 ${filterQuery}`,
      filterValues
    );

    res.status(200).json({
      rows: products,
      rowCount: countResult[0].total,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const [productCheck] = await dbConnect.query(
      "SELECT * FROM products WHERE product_id = ?",
      [id]
    );

    if (productCheck.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    await dbConnect.query("DELETE FROM products WHERE product_id = ?", [id]);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const {
      product_id,
      product_name,
      category_id,
      price,
      description,
      isActive,
      isFeatured,
      isRecent,
      rating,
      image_url,
    } = req.body;

    if (!product_id || !product_name || !category_id || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const [existingProduct] = await dbConnect.query(
      "SELECT * FROM products WHERE product_id = ?",
      [product_id]
    );

    if (existingProduct.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    const productUrl = slugify(product_name, { lower: true, strict: true });

    await dbConnect.query(
      "UPDATE products SET product_name = ?, product_url = ?, category_id = ?, price = ?, description = ?, isActive = ?, isFeatured = ?, isRecent = ?, rating = ?, image_url = ?, updated_at = NOW() WHERE product_id = ?",
      [
        product_name,
        productUrl,
        category_id,
        price,
        description,
        isActive ? 1 : 0,
        isFeatured ? 1 : 0,
        isRecent ? 1 : 0,
        rating || 0,
        image_url,
        product_id,
      ]
    );

    res.status(200).json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
