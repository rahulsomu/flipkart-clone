import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";
import CheckIcon from "@mui/icons-material/Check";
import "./cart.css";
import { saveAddress } from "../../redux/action/saveAddressAction";
import { saveOrder } from "../../redux/action/saveOrderAction";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button } from "@mui/material";
import { resetCart } from "../../redux/action/addItemToCartAction";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart).cart;
  const userDetails = useSelector((state) => state.userDetails);
  const user = userDetails.data && userDetails?.data?.userDetails[0];
  const [checkoutMode, setCheckoutMode] = useState(false);
  const [addAddressMode, setAddressMode] = useState(false);
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    pincode: "",
    locality: "",
    address: "",
    city: "",
    state: "",
    landmark: "",
    alternatePhone: "",
    addressType: "Home",
  });
  const [selectedAddress, setSelectedAddress] = useState(
    user ? user?.savedAddresses[0] : ""
  );
  const [deliveryAddress, setDeliveryAddress] = useState(null);
  const [checkoutStep, setCheckoutStep] = useState(userDetails?.data ? 2 : 1);
  const [paymentOption, setPaymentOption] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const availablePaymentOptions = [
    {
      name: "UPI",
      value: "upi",
      available: false,
    },
    {
      name: "wallets",
      value: "wallet",
      available: false,
    },
    {
      name: "Credit / Debit / ATM Card",
      value: "card",
      available: false,
    },
    {
      name: "Net-Banking",
      value: "netBanking",
      available: false,
    },
    {
      name: "Cash on Delivery",
      value: "cod",
      available: true,
    },
    {
      name: "EMI (Easy Installments)",
      value: "emi",
      available: false,
    },
  ];
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

  const saveAddressHandler = (e) => {
    e.preventDefault();
    const payload = {
      ...address,
      userId: user._id,
    };
    console.log(payload);
    dispatch(saveAddress(payload));
  };
  const placeOrderHandler = () => {
    const orderPayload = {
      deliveryAddress,
      items: [...cartItems],
      paymentOption,
      subTotal: subTotal(),
      userId: user._id,
    };
    console.log(orderPayload);
    // dispatch(saveOrder(orderPayload));
    setOrderPlaced(true);
  };
  useEffect(() => {
    if (!orderPlaced && checkoutStep == 4) {
      document.querySelector(".checkout_wrapper").scrollTop += 500;
    }
  }, [checkoutStep]);
  return (
    <>
      {!orderPlaced ? (
        <div className="cart_wrapper">
          {cartItems?.length > 0 ? (
            <>
              {checkoutMode ? (
                <div className="checkout_wrapper">
                  <div className="checkout_step">
                    <div
                      className="checkout_step_header"
                      style={{
                        background:
                          checkoutStep === 1 ? "var(--primary)" : "#fff",
                        color: checkoutStep === 1 ? "#fff" : "grey",
                      }}
                    >
                      <div className="checkout_step_header_count">1</div>
                      <p>Login</p>
                      <CheckIcon
                        style={{ marginLeft: "-1rem", marginTop: "-3px" }}
                      />
                    </div>
                    <div className="checkout_step_content">
                      <div className="checkout_login_content">
                        <p style={{ textTransform: "capitalize" }}>
                          {user?.firstName} {user?.lastname}
                        </p>
                        <p>{user?.phoneNo}</p>
                      </div>
                    </div>
                  </div>
                  <div className="checkout_step">
                    <div
                      className="checkout_step_header"
                      style={{
                        background:
                          checkoutStep === 2 ? "var(--primary)" : "#fff",
                        color: checkoutStep === 2 ? "#fff" : "grey",
                      }}
                    >
                      <div className="checkout_step_header_count">2</div>
                      <p>Delivery Address</p>
                      {deliveryAddress && (
                        <CheckIcon
                          style={{ marginLeft: "-1rem", marginTop: "-3px" }}
                        />
                      )}
                    </div>
                    <div className="checkout_step_content">
                      {deliveryAddress !== null ? (
                        <div className="delivery_address">
                          <div className="delivery_address_content">
                            <p
                              style={{
                                fontWeight: "bold",
                                textTransform: "capitalize",
                                marginRight: "5px",
                              }}
                            >
                              {deliveryAddress.name}
                            </p>
                            <p
                              style={{
                                textTransform: "capitalize",
                              }}
                            >
                              {deliveryAddress.address},
                            </p>
                            <p>{deliveryAddress.city},</p>
                            <p>{deliveryAddress.state}, - </p>
                            <p style={{ fontWeight: "bold" }}>
                              {deliveryAddress.pincode}
                            </p>
                          </div>

                          <button
                            onClick={() => {
                              setDeliveryAddress(null);
                              setCheckoutStep(checkoutStep - 1);
                            }}
                          >
                            Change
                          </button>
                        </div>
                      ) : (
                        <>
                          {user.savedAddresses.map((item) => (
                            <div
                              className="address_item"
                              style={{
                                background:
                                  item === selectedAddress
                                    ? "#f5faff"
                                    : "#ffffff",
                              }}
                            >
                              <input
                                type="radio"
                                name="address"
                                value={JSON.stringify(item)}
                                checked={item === selectedAddress}
                                onChange={(e) => {
                                  setSelectedAddress(item);
                                  setAddressMode(false);
                                }}
                              />
                              <div className="address_details">
                                <div className="address_details_top">
                                  <p
                                    style={{
                                      textTransform: "capitalize",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {item.name}
                                  </p>
                                  <p
                                    style={{
                                      background: "#ebe9e9",
                                      padding: "2px 4px",
                                      color: "#808080",
                                    }}
                                  >
                                    {item.addressType}
                                  </p>
                                  <p>{item.phone}</p>
                                </div>
                                <div className="address_details_bottom">
                                  <p>{item.address},</p>
                                  <p>{item.city},</p>
                                  <p>{item.state},</p>
                                  <p>{item.pincode}</p>
                                </div>
                                {item === selectedAddress && (
                                  <button
                                    className="deliver_here_btn"
                                    onClick={() => {
                                      setDeliveryAddress(item);

                                      setCheckoutStep(checkoutStep + 1);
                                    }}
                                  >
                                    Deliver here
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                          {!addAddressMode && (
                            <div style={{ padding: "1rem" }}>
                              <button
                                className="add_address_btn"
                                onClick={() => {
                                  setAddressMode(true);
                                  setSelectedAddress("");
                                }}
                              >
                                + Add a new address
                              </button>
                            </div>
                          )}
                        </>
                      )}
                      {addAddressMode && (
                        <form className="address_form">
                          <div className="form_row">
                            <input
                              type="text"
                              placeholder="Name"
                              value={address.name}
                              onChange={(e) =>
                                setAddress({ ...address, name: e.target.value })
                              }
                            />
                            <input
                              type="text"
                              placeholder="10-digit mobile number"
                              value={address.phone}
                              onChange={(e) =>
                                setAddress({
                                  ...address,
                                  phone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form_row">
                            <input
                              type="text"
                              placeholder="Pincode"
                              value={address.pincode}
                              onChange={(e) =>
                                setAddress({
                                  ...address,
                                  pincode: e.target.value,
                                })
                              }
                            />
                            <input
                              type="text"
                              placeholder="Locality"
                              value={address.locality}
                              onChange={(e) =>
                                setAddress({
                                  ...address,
                                  locality: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form_row">
                            <textarea
                              name=""
                              id=""
                              cols="30"
                              rows="10"
                              placeholder="Address(Area and Street)"
                              value={address.address}
                              onChange={(e) =>
                                setAddress({
                                  ...address,
                                  address: e.target.value,
                                })
                              }
                            ></textarea>
                          </div>
                          <div className="form_row">
                            <input
                              type="text"
                              placeholder="City/District/Town"
                              value={address.city}
                              onChange={(e) =>
                                setAddress({ ...address, city: e.target.value })
                              }
                            />
                            <input
                              type="text"
                              placeholder="State"
                              value={address.state}
                              onChange={(e) =>
                                setAddress({
                                  ...address,
                                  state: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form_row">
                            <input
                              type="text"
                              placeholder="Landmark(optional)"
                              value={address.landmark}
                              onChange={(e) =>
                                setAddress({
                                  ...address,
                                  landmark: e.target.value,
                                })
                              }
                            />
                            <input
                              type="text"
                              placeholder="Alternate Phone(optional)"
                              value={address.alternatePhone}
                              onChange={(e) =>
                                setAddress({
                                  ...address,
                                  alternatePhone: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="form_row">
                            <input
                              type="radio"
                              value="Home"
                              name="type"
                              id="Home"
                              checked={address.addressType === "Home"}
                              onChange={(e) =>
                                setAddress({
                                  ...address,
                                  addressType: e.target.value,
                                })
                              }
                            />
                            <label htmlFor="Home">
                              Home (All Day Delivery)
                            </label>
                            <input
                              type="radio"
                              value="Work"
                              name="type"
                              id="Work"
                              checked={address.addressType === "Work"}
                              onChange={(e) => {
                                setAddress({
                                  ...address,
                                  addressType: e.target.value,
                                });
                              }}
                            />
                            <label htmlFor="Work">
                              Work (Delivery between 10Am-5PM)
                            </label>
                          </div>
                          <div className="form_row">
                            <button
                              className="save_address_btn"
                              type="submit"
                              onClick={saveAddressHandler}
                              disabled={
                                !address.name ||
                                !address.phone ||
                                !address.pincode ||
                                !address.locality ||
                                !address.address ||
                                !address.city ||
                                !address.state ||
                                !address.addressType
                              }
                            >
                              Save and deliver here
                            </button>
                            <button
                              className="save_address_cancel_btn"
                              onClick={() => {
                                setAddress({
                                  name: "",
                                  phone: "",
                                  pincode: "",
                                  locality: "",
                                  address: "",
                                  city: "",
                                  state: "",
                                  landmark: "",
                                  alternatePhone: "",
                                  addressType: "Home",
                                });
                                setAddressMode(false);
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>
                  <div className="checkout_step">
                    <div
                      className="checkout_step_header"
                      style={{
                        background:
                          checkoutStep === 3 ? "var(--primary)" : "#fff",
                        color: checkoutStep === 3 ? "#fff" : "grey",
                      }}
                    >
                      <div className="checkout_step_header_count">3</div>
                      <p>Order Summary</p>
                      {checkoutStep === 4 && (
                        <CheckIcon
                          style={{ marginLeft: "-1rem", marginTop: "-3px" }}
                        />
                      )}
                    </div>
                    <div className="checkout_step_content">
                      {deliveryAddress &&
                        cartItems?.map((item, index) => (
                          <CartItem item={item} key={index} />
                        ))}
                      {deliveryAddress && checkoutStep !== 4 && (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            width: "100%",
                            padding: "2rem",
                          }}
                        >
                          <button
                            className="order_summary_btn"
                            onClick={() => {
                              setCheckoutStep(4);
                            }}
                          >
                            Continue
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="checkout_step">
                    <div
                      className="checkout_step_header"
                      style={{
                        background:
                          checkoutStep === 4 ? "var(--primary)" : "#fff",
                        color: checkoutStep === 4 ? "#fff" : "grey",
                      }}
                    >
                      <div className="checkout_step_header_count">4</div>
                      <p>Payment options</p>
                      {paymentOption && (
                        <CheckIcon
                          style={{ marginLeft: "-1rem", marginTop: "-3px" }}
                        />
                      )}
                    </div>
                    <div className="checkout_step_content">
                      {checkoutStep === 4 && (
                        <div className="payment_option_list">
                          <ul>
                            {availablePaymentOptions.map((item) => (
                              <li
                                onClick={() =>
                                  item.available && setPaymentOption(item.value)
                                }
                                style={{
                                  background:
                                    paymentOption === item.value
                                      ? "#f5faff"
                                      : "#ffffff",
                                  cursor: item.available
                                    ? "pointer"
                                    : "not-allowed",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                  }}
                                >
                                  <div style={{ display: "flex", gap: "2rem" }}>
                                    <input
                                      type="radio"
                                      value="upi"
                                      name="payment"
                                      checked={paymentOption === item.value}
                                      disabled={!item.available}
                                    />
                                    <p
                                      style={{
                                        color: item.available
                                          ? "black"
                                          : "grey",
                                        textTransform: "capitalize",
                                      }}
                                    >
                                      {item.name}
                                    </p>
                                  </div>

                                  {!item.available && (
                                    <p
                                      style={{
                                        color: "grey",
                                        fontSize: "1rem",
                                      }}
                                    >
                                      Currently Unavailable
                                    </p>
                                  )}
                                </div>
                                {paymentOption === item.value && (
                                  <button
                                    className="confirm_order_btn"
                                    onClick={placeOrderHandler}
                                  >
                                    Confirm order
                                  </button>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="cart_items_wrapper">
                  <>
                    {" "}
                    <div
                      style={{
                        height: "calc(100% - 9rem)",
                        overflowY: "scroll",
                      }}
                    >
                      {cartItems?.map((item, index) => (
                        <CartItem item={item} key={index} />
                      ))}
                    </div>
                    <div className="cart_items_place_order">
                      <button onClick={() => setCheckoutMode(true)}>
                        Place Order
                      </button>
                    </div>
                  </>
                </div>
              )}

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
                <button
                  className="primary_btn"
                  style={{ padding: "1.5rem 4rem" }}
                >
                  Shop Now
                </button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="order_placed_success">
          <div className="order_placed_success_icon">
            <CheckCircleIcon style={{ fontSize: "20rem", color: "#00994C" }} />
          </div>
          <p style={{ fontSize: "2rem", color: "#00994C" }}>
            Cheers! Order Placed Successfully
          </p>
          <span>{`Please pay ${subTotal()} via ${paymentOption}.`}</span>
          <Button
            onClick={() => {
              navigate("/");
              dispatch(resetCart());
            }}
            variant="outlined"
            style={{
              marginTop: "20px",
              fontSize: "1.5rem",
              textTransform: "capitalize",
            }}
          >
            Back to Home
          </Button>
        </div>
      )}
    </>
  );
};
export default Cart;
