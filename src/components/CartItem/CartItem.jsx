import "./cartItem.css";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../../redux/action/appActions";
import { useDispatch } from "react-redux";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const rupeeSymbol = "₹";

  const calculateDiscount = (cp, sp) => {
    return Math.abs(Math.ceil(((sp - cp) / cp) * 100));
  };
  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN").format(price);
  };
  const calcDay = () => {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date();
    let day = d.getDay();

    const result =
      weekday.length - day == 2
        ? weekday[0]
        : weekday.length - day == 1
        ? weekday[2]
        : weekday[day + 2];
    return result;
  };
  const removeItemFromCart = (id) => {
    dispatch(removeItem(id));
  };
  return (
    <div className="cart_item">
      <div style={{ display: "flex" }}>
        <Link to={`/details/${item._id}`}>
          <div className="cart_item_image">
            <img src={item.mainImage} alt="product" />
          </div>
        </Link>
        <div className="cart_item_details">
          <div className="cart_item_name">
            <p>{item.productName}</p>
            <p>
              Delivery in 2 days, {calcDay()} | Free
              <span style={{ textDecoration: "line-through" }}>₹40</span>
            </p>
          </div>
          <div className="cart_item_variant">
            <p>{item.variant}</p>
          </div>
          <div className="cart_item_seller">
            <p>Seller : OnlineServices</p>
            <img
              src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
              alt="fassured"
            />
          </div>
          <div className="cart_item_price_wrapper">
            <div className="cart_item_price">
              <p>
                {rupeeSymbol}
                {formatPrice(item.mrp)}
              </p>
              <p>
                {rupeeSymbol}
                {formatPrice(item.sellingPrice)}
              </p>
              <span>{calculateDiscount(item.mrp, item.sellingPrice)}% Off</span>
              <span>
                4 offers applied <InfoIcon />
              </span>
            </div>
            <div className="cart_item_supercoin">
              <p>{`Or Pay ${rupeeSymbol}${formatPrice(
                item.sellingPrice - 50
              )} + `}</p>
              <img
                src="https://rukminim1.flixcart.com/www/100/100/promos/18/07/2019/4aebbd99-7478-411e-aced-265e7722d18d.png?q=90"
                alt="supercoin"
              />
              <p>60</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cart_item_footer">
        <div className="cart_item_quantity">
          <button
            disabled={item.quantity <= 1}
            onClick={() => dispatch(decreaseQuantity(item))}
          >
            <RemoveIcon />
          </button>
          <p>{item.quantity}</p>
          <button
            onClick={() => {
              if (item.quantity < 5) {
                dispatch(increaseQuantity(item));
              } else {
                toast.error("Maximum 5 quantity is Allowed per User", {
                  position: "bottom-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              }
            }}
          >
            <AddIcon />
          </button>
        </div>
        <button
          onClick={() => {
            removeItemFromCart(item);
          }}
        >
          REMOVE
        </button>
      </div>
    </div>
  );
};

export default CartItem;
