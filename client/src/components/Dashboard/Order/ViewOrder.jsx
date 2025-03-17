import React from "react";

const ViewOrder = ({ viewData, onClose }) => {
  return (
    <div className="container mt-4">
      <h2>Order Details</h2>
      <p>
        <strong>Order ID:</strong> {viewData.order_id}
      </p>
      <p>
        <strong>Customer:</strong> {viewData.customer_name}
      </p>
      <p>
        <strong>Total Price:</strong> ₹{viewData.total_price}
      </p>
      <p>
        <strong>Status:</strong> {viewData.order_status}
      </p>
      <p>
        <strong>Order Date:</strong> {viewData.created_at}
      </p>

      <h3>Products in Order</h3>
      <ul>
        {viewData.items.map((item) => (
          <li key={item.product_id}>
            {item.product_name} - {item.quantity} x ₹{item.price}
          </li>
        ))}
      </ul>

      <button className="btn btn-primary mt-3" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default ViewOrder;
