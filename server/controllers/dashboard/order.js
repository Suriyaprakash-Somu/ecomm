import dbConnect from "../../config/db.js";

export const getOrders = async (req, res) => {
  try {
    const { pageIndex = 0, pageSize = 10, filters, sorting, all } = req.query;
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

    let sortQuery = "ORDER BY o.created_at DESC";
    if (parsedSorting.length > 0) {
      sortQuery = `ORDER BY ${parsedSorting
        .map((s) => `${s.id} ${s.desc ? "DESC" : "ASC"}`)
        .join(", ")}`;
    }

    let query = `
          SELECT o.order_id, o.order_id AS id, o.customer_id, c.customer_name, c.customer_email, 
                 o.total_price, o.order_status, o.created_at
          FROM orders o
          JOIN customers c ON o.customer_id = c.customer_id
          WHERE 1=1 ${filterQuery} ${sortQuery}`;
    let queryParams = [...filterValues];

    if (!all || all === "false") {
      query += " LIMIT ? OFFSET ?";
      queryParams.push(Number(pageSize), Number(pageIndex) * Number(pageSize));
    }

    const [orders] = await dbConnect.query(query, queryParams);

    // Fetch Order Items
    const [orderDetails] = await dbConnect.query(`
          SELECT od.order_id, od.product_id, p.product_name, od.quantity, od.price
          FROM order_details od
          JOIN products p ON od.product_id = p.product_id
      `);

    // Merge Order Items into Orders
    const ordersWithDetails = orders.map((order) => ({
      ...order,
      items: orderDetails.filter((item) => item.order_id === order.order_id),
    }));

    if (all && all === "true") {
      return res.status(200).json({ rows: ordersWithDetails });
    }

    const [countResult] = await dbConnect.query(
      `SELECT COUNT(*) as total FROM orders o 
           JOIN customers c ON o.customer_id = c.customer_id 
           WHERE 1=1 ${filterQuery}`,
      filterValues
    );

    res.status(200).json({
      rows: ordersWithDetails,
      rowCount: countResult[0].total,
    });
  } catch (error) {
    console.error("Error in getOrders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrder = async (req, res) => {
  const { order_id, order_status } = req.body;

  if (!order_id || !order_status) {
    return res
      .status(400)
      .json({ message: "Order ID and status are required" });
  }

  try {
    await dbConnect.query(
      "UPDATE orders SET order_status = ?, updated_at = NOW() WHERE order_id = ?",
      [order_status, order_id]
    );

    res.status(200).json({ message: "Order status updated successfully" });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Failed to update order status" });
  }
};
