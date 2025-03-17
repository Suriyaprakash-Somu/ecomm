import dbConnect from "../../config/db.js";

export const getCustomerOrders = async (req, res) => {
  try {
    const { pageIndex = 0, pageSize = 10, filters, sorting, all } = req.query;
    let parsedFilters = [];
    let parsedSorting = [];
    const { customer_id } = req.customer;

    if (!customer_id) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    try {
      parsedFilters =
        filters && filters !== "undefined" ? JSON.parse(filters) : [];
      parsedSorting =
        sorting && sorting !== "undefined" ? JSON.parse(sorting) : [];
    } catch (error) {
      parsedFilters = [];
      parsedSorting = [];
    }

    let filterQuery = "AND o.customer_id = ?";
    let filterValues = [customer_id];

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
        SELECT o.order_id, o.order_id AS id, o.customer_id, o.total_price, 
               o.order_status, o.created_at
        FROM orders o
        WHERE 1=1 ${filterQuery} ${sortQuery}`;

    if (!all || all === "false") {
      query += " LIMIT ? OFFSET ?";
      filterValues.push(Number(pageSize), Number(pageIndex) * Number(pageSize));
    }

    const [orders] = await dbConnect.query(query, filterValues);

    const [orderDetails] = await dbConnect.query(
      `SELECT od.order_id, od.product_id, p.product_name, od.quantity, od.price
         FROM order_details od
         JOIN products p ON od.product_id = p.product_id
         JOIN orders o ON od.order_id = o.order_id
         WHERE o.customer_id = ?`,
      [customer_id]
    );

    const ordersWithDetails = orders.map((order) => ({
      ...order,
      items: orderDetails.filter((item) => item.order_id === order.order_id),
    }));

    if (all && all === "true") {
      return res.status(200).json({ rows: ordersWithDetails });
    }

    const [countResult] = await dbConnect.query(
      `SELECT COUNT(*) as total FROM orders o 
         WHERE o.customer_id = ? ${filterQuery}`,
      [customer_id, ...filterValues]
    );

    res.status(200).json({
      rows: ordersWithDetails,
      rowCount: countResult[0].total,
    });
  } catch (error) {
    console.error("Error in getCustomerOrders:", error);
    res.status(500).json({ message: "Server error" });
  }
};
