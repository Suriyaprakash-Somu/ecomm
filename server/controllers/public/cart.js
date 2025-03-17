import dbConnect from "../../config/db.js";

export const checkout = async (req, res) => {
  const { items, total_price } = req.body;
  const { customer_id } = req.customer;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "No items in the cart" });
  }

  const connection = await dbConnect.getConnection();

  try {
    await connection.beginTransaction();

    // Insert order into orders table
    const [orderResult] = await connection.query(
      "INSERT INTO orders (customer_id, total_price, order_status, created_at, updated_at) VALUES (?, ?, 'Pending', NOW(), NOW())",
      [customer_id, total_price]
    );

    const orderId = orderResult.insertId;

    // Insert order details into order_details table
    const orderDetailsQuery =
      "INSERT INTO order_details (order_id, product_id, quantity, price) VALUES ?";
    const orderDetailsData = items.map((item) => [
      orderId,
      item.product_id,
      item.quantity,
      item.price,
    ]);

    await connection.query(orderDetailsQuery, [orderDetailsData]);

    await connection.commit();

    res.status(201).json({
      message: "Order placed successfully",
      order_id: orderId,
    });
  } catch (error) {
    await connection.rollback();
    console.error("Checkout Error:", error);
    res.status(500).json({ message: "Failed to place order" });
  } finally {
    connection.release();
  }
};
