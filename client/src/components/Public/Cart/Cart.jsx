import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../../store/cartSlice";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import { Link } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { checkout } from "../../../api/public/cart";
import toast from "react-hot-toast";

const Cart = () => {
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const checkoutMutation = useMutation({
    mutationFn: checkout,
    onSuccess: (data) => {
      dispatch(clearCart());
    },
    onError: (error) => {
      toast.error(error.message || "Failed to checkout.");
    },
  });

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    const orderData = {
      items: cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_price: totalPrice,
    };

    checkoutMutation.mutate(orderData);
  };

  return (
    <div className="container mt-4">
      <h1 className={styles.pageTitle}>Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className={styles.emptyCart}>
          <div className={styles.emptyCartIcon}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any products to your cart yet.</p>
          <Link to={"/products"}>
            <button className={styles.continueShoppingBtn}>
              Continue Shopping
            </button>
          </Link>
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8">
            <div className={styles.cartItemsContainer}>
              {cartItems.map((item) => (
                <CartItem key={item.product_id} item={item} />
              ))}
            </div>

            <div className={styles.cartActions}>
              <button
                className={styles.clearCartBtn}
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
              <Link to={"/products"}>
                <button className={styles.continueShoppingBtn}>
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>

          <div className="col-lg-4">
            <div className={styles.orderSummary}>
              <h3 className={styles.summaryTitle}>Order Summary</h3>

              <div className={styles.summaryRow}>
                <span>
                  Items (
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)})
                </span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span>Free</span>
              </div>

              <div className={`${styles.discountSection} container`}>
                <input
                  type="text"
                  className={styles.discountInput}
                  placeholder="Discount code"
                />
                <button className={styles.applyBtn}>Apply</button>
              </div>

              <div className={styles.totalRow}>
                <span>Total</span>
                <div className={styles.totalAmount}>
                  <span className={styles.currencySymbol}>₹</span>
                  <span className={styles.finalPrice}>
                    {totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                className={styles.checkoutBtn}
                onClick={handleCheckout}
                disabled={checkoutMutation.isLoading}
              >
                {checkoutMutation.isLoading
                  ? "Processing..."
                  : "Proceed to Checkout"}
              </button>

              <div className={styles.secureCheckout}>
                <span>🔒 Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
