import { Link, useParams } from "react-router-dom";
import "./profile.css";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../Utils/functions";
import { wishlistItems } from "../../redux/action/appActions";
import {
  clearRemoveFromWishlistStatus,
  removeFromWishlist,
} from "../../redux/action/wishlistAction";
import { toast } from "react-toastify";
import { getUserDetails } from "../../redux/action/getUserDetailsAction";
import { CircularProgress } from "@mui/material";

const Profile = () => {
  const { tab } = useParams();
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const removeFromWishlistStatus = useSelector(
    (state) => state.removeFromWishlist
  );
  const userName = userDetails.data && userDetails.data.userDetails[0];
  const userId = userDetails.data && userDetails.data.userDetails[0]._id;

  const [activeTab, setActiveTab] = useState(tab);
  const wishlist = userDetails.data && userDetails.data.userDetails[0].wishlist;
  const rupeeSymbol = "₹";
  const calculateDiscount = (cp, sp) => {
    return Math.abs(Math.ceil(((sp - cp) / cp) * 100));
  };
  useEffect(() => {
    if (removeFromWishlistStatus.success) {
      toast.success(`Removed From Wishlist`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      dispatch(getUserDetails({ userId: userId }));
      dispatch(clearRemoveFromWishlistStatus());
    }
  }, [removeFromWishlistStatus.success]);

  return (
    <div className="profile_wrapper">
      <div className="left_tabs_wrapper">
        <div className="tab_user_info">
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/profile-pic-male_4811a1.svg"
            alt=""
          />
          <div className="tab_user_info_name">
            <p>Hello,</p>
            <p
              style={{ textTransform: "capitalize" }}
            >{`${userName.firstName} ${userName.lastName}`}</p>
          </div>
        </div>
        <div className="left_tabs">
          <div className="left_tab">
            <div className="left_tab_heading">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDI0IDE4Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04LjY5NCAtMTEpIj48ZWxsaXBzZSBjeD0iMjAuNTU3IiBjeT0iMjAiIHJ4PSIyMC41NTciIHJ5PSIyMCIvPjxwYXRoIGZpbGw9IiMyODc0RjEiIGQ9Ik05IDExdjE3LjEwOGMwIC40OTMuNDEuODkyLjkxOC44OTJoNC45M3YtNS4yNTdoLTMuMDMzbDQuOTEyLTQuNzcgNC45NzIgNC44M2gtMy4wMzVWMjloMTIuNDE3Yy41MDcgMCAuOTE4LS40LjkxOC0uODkyVjExSDl6Ii8+PC9nPjwvc3ZnPg=="
                alt=""
              />
              <p style={{ color: tab == "orders" ? "var(--primary" : "" }}>
                MY ORDERS
              </p>
            </div>
          </div>
          <div className="left_tab">
            <div className="left_tab_heading">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMiIgaGVpZ2h0PSIyMSIgdmlld0JveD0iMCAwIDIyIDIxIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05LjY5NCAtMTApIj48cGF0aCBmaWxsPSIjMjg3NEYwIiBkPSJNMTQuMjc1IDIyLjcwNGMyLjI3Mi0uNDEyIDQuMzQ3LS42MTggNi4yMjUtLjYxOCAxLjg3OCAwIDMuOTUzLjIwNiA2LjIyNS42MThhNS4xNSA1LjE1IDAgMCAxIDQuMjMgNS4wNjhWMzFoLTIwLjkxdi0zLjIyOGE1LjE1IDUuMTUgMCAwIDEgNC4yMy01LjA2OHptMS4yNzQtNy43MjRjMC0yLjU4IDIuMTYzLTQuNjczIDQuODMyLTQuNjczIDIuNjY3IDAgNC44MyAyLjA5MiA0LjgzIDQuNjczIDAgMi41OC0yLjE2MyA0LjY3My00LjgzIDQuNjczLTIuNjcgMC00LjgzMy0yLjA5Mi00LjgzMy00LjY3M3oiLz48ZWxsaXBzZSBjeD0iMjAuNTU3IiBjeT0iMjAiIHJ4PSIyMC41NTciIHJ5PSIyMCIvPjwvZz48L3N2Zz4="
                alt=""
              />
              <p>ACCOUNT SETTINGS</p>
            </div>
            <ul>
              <li
                onClick={() => setActiveTab("profile")}
                className={activeTab === "profile" ? "activeTab" : ""}
              >
                Profile Information
              </li>
              <li
                onClick={() => setActiveTab("address")}
                className={activeTab === "address" ? "activeTab" : ""}
              >
                Manage Addresses
              </li>
            </ul>
          </div>
          <div className="left_tab">
            <div className="left_tab_heading">
              <img
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMyIgaGVpZ2h0PSIxOSIgdmlld0JveD0iMCAwIDIzIDE5Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyODc0RjAiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTIwLjUgMi43NWgtOUw5LjI1LjVIMi41QTIuMjQ3IDIuMjQ3IDAgMCAwIC4yNiAyLjc1bC0uMDEgMTMuNUEyLjI1NyAyLjI1NyAwIDAgMCAyLjUgMTguNWgxOGEyLjI1NyAyLjI1NyAwIDAgMCAyLjI1LTIuMjVWNWEyLjI1NyAyLjI1NyAwIDAgMC0yLjI1LTIuMjV6bS01LjYyNSAzLjM3NWEyLjI1NyAyLjI1NyAwIDAgMSAyLjI1IDIuMjUgMi4yNTcgMi4yNTcgMCAwIDEtMi4yNSAyLjI1IDIuMjU3IDIuMjU3IDAgMCAxLTIuMjUtMi4yNSAyLjI1NyAyLjI1NyAwIDAgMSAyLjI1LTIuMjV6bTQuNSA5aC05VjE0YzAtMS40OTYgMy4wMDQtMi4yNSA0LjUtMi4yNXM0LjUuNzU0IDQuNSAyLjI1djEuMTI1eiIvPjxwYXRoIGQ9Ik0tMi00aDI3djI3SC0yeiIvPjwvZz48L3N2Zz4="
                alt=""
              />
              <p>MY STUFF</p>
            </div>
            <ul>
              <li
                onClick={() => setActiveTab("wishlist")}
                className={activeTab === "wishlist" ? "activeTab" : ""}
              >
                My Wishlist
              </li>
            </ul>
          </div>
          <div className="left_tab">
            <div className="left_tab_heading">
              <PowerSettingsNewIcon />
              <p className="left_tab_logout">Logout</p>
            </div>
          </div>
        </div>
      </div>
      <div className="tab_details">
        <div className="tab_details_wishlist">
          {userDetails.success ? (
            <>
              <div className="tab_details_wishlist_heading">
                <p>{`My Wishlist (${wishlist?.length})`}</p>
              </div>
              {wishlist?.length > 0 ? (
                wishlist?.map((item) => (
                  <div className="wishlist_item" key={item._id}>
                    <div
                      className="remove_item"
                      onClick={() =>
                        dispatch(removeFromWishlist({ ...item, userId }))
                      }
                    >
                      <DeleteIcon />
                    </div>
                    <Link to={`/details/${item._id}`}>
                      <div className="wishlist_item_image">
                        <img src={item.mainImage} alt="" />
                      </div>{" "}
                      <div className="wishlist_item_details">
                        <h2>{item.productName}</h2>
                        <div className="wishlist_item_details_ratings">
                          <p>
                            {item.rating.overallRating}
                            <StarIcon />
                          </p>
                          <span>{`(${item.rating.reviews})`}</span>
                          <img
                            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png"
                            style={{ width: "8rem" }}
                            alt=""
                          />
                        </div>

                        <div className="wishlist_item_details_price">
                          <p>
                            {rupeeSymbol}
                            {formatPrice(item.sellingPrice)}
                          </p>
                          <p>
                            {rupeeSymbol}
                            {formatPrice(item.mrp)}
                          </p>
                          <p>{`${calculateDiscount(
                            item.mrp,
                            item.sellingPrice
                          )}% off`}</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div
                  className="empty_cart"
                  style={{ boxShadow: "none", marginTop: "2rem" }}
                >
                  <div className="empty_cart_image">
                    <img
                      src="https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90"
                      alt="empty cart"
                    />
                  </div>
                  <p style={{ fontSize: "2rem" }}>Your Wishlist is Empty!</p>
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
            </>
          ) : (
            <div className="loader">
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
