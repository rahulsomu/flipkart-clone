import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import "./cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart).cart;
  const rupeeSymbol = "₹";
  const totalMrp = () => {
    let total = cartItems.reduce((initialValue, currentElement) => {
      return (initialValue += currentElement.mrp * currentElement.quantity);
    }, 0);
    return total;
  };
  const subTotal = () => {
    let total = cartItems.reduce((initialValue, currentElement) => {
      return (initialValue +=
        currentElement.sellingPrice * currentElement.quantity);
    }, 0);

    return total;
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };
  return (
    <div className="cart_wrapper">
      {cartItems?.length > 0 ? (
        <>
          <div className="cart_items_wrapper">
            <div style={{ height: "calc(100% - 9rem)", overflowY: "scroll" }}>
              {cartItems?.map((item, index) => (
                <CartItem item={item} key={index} />
              ))}
            </div>

            <div className="cart_items_place_order">
              <button>Place Order</button>
            </div>
          </div>
          <div className="cart_price">
            <div className="cart_price_header">PRICE DETAILS</div>
            <div className="cart_price_details">
              <div className="cart_price_details_item">
                <p>{`Price (${cartItems?.length} ${
                  cartItems?.length > 1 ? "items" : "item"
                })`}</p>
                <p>
                  {rupeeSymbol}
                  {formatPrice(totalMrp())}
                </p>
              </div>
              <div className="cart_price_details_item">
                <p>Discount</p>
                <span>{`- ${rupeeSymbol}${formatPrice(
                  totalMrp() - subTotal()
                )}`}</span>
              </div>
              <div className="cart_price_details_item">
                <p>Delivery Charges</p>
                <span>FREE</span>
              </div>
            </div>
            <div className="total_amount">
              <div className="cart_price_details_item">
                <p>Total Amount</p>
                <p>
                  {rupeeSymbol}
                  {formatPrice(subTotal())}
                </p>
              </div>
            </div>
            <p
              style={{
                color: "var(--green)",
                fontSize: "1.5rem",
                padding: "1.5rem 2rem",
                fontWeight: "bolder",
              }}
            >
              {`You will save ${rupeeSymbol}${formatPrice(
                totalMrp() - subTotal()
              )} on this order`}
            </p>
            <div className="cart_bottom_text">
              <p>
                Safe and Secure Payments.Easy returns.
                <br />
                100% Authentic products.
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="empty_cart">
          <div className="empty_cart_image">
            <img
              src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
              alt="empty cart"
            />
          </div>
          <p style={{ fontSize: "2rem" }}>Your cart is Empty!</p>
          <span style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            Add items to it now.
          </span>
          <Link to="/">
            <button className="primary_btn" style={{ padding: "1.5rem 4rem" }}>
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
export default Cart;
