import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../../../store/cartSlice";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import styles from "./Cart.module.css";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.cartItem}>
      <div className={styles.itemImage}>
        {item.image_url ? (
          <img src={item.image_url} alt={item.product_name} />
        ) : (
          <div className={styles.imagePlaceholder}></div>
        )}
      </div>

      <div className={styles.itemDetails}>
        <h3 className={styles.itemName}>{item.product_name}</h3>

        <div className={styles.priceQuantityRow}>
          <div className={styles.itemPrice}>
            <span className={styles.currencySymbol}>₹</span>
            <span className={styles.priceValue}>{item.price}</span>
          </div>

          <div className={styles.quantityControls}>
            <button
              className={styles.quantityBtn}
              onClick={() =>
                dispatch(
                  updateQuantity({
                    product_id: item.product_id,
                    quantity: Math.max(1, item.quantity - 1),
                  })
                )
              }
              disabled={item.quantity <= 1}
            >
              <FaMinus />
            </button>

            <span className={styles.quantityValue}>{item.quantity}</span>

            <button
              className={styles.quantityBtn}
              onClick={() =>
                dispatch(
                  updateQuantity({
                    product_id: item.product_id,
                    quantity: item.quantity + 1,
                  })
                )
              }
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className={styles.itemTotal}>
          <span>Total: </span>
          <span className={styles.totalValue}>
            ₹{(item.price * item.quantity).toFixed(2)}
          </span>
        </div>

        <button
          className={styles.removeBtn}
          onClick={() => dispatch(removeFromCart(item.product_id))}
        >
          <FaTrash /> Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
