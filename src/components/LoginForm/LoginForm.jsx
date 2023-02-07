import React, { useState } from "react";
import "./loginform.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserDetailsStatus,
  getUserDetails,
} from "../../redux/action/getUserDetailsAction";
import { registerUser } from "../../redux/action/registerUserAction";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { loggedIn } from "../../redux/action/appActions";

const LoginForm = ({ setDialogOpen }) => {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const registationDetails = useSelector((state) => state.registerUser);

  const [loginMode, setLoginMode] = useState(true);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const loginhandler = (e) => {
    e.preventDefault();

    dispatch(getUserDetails(loginData));
  };
  const registerHandler = (e) => {
    e.preventDefault();

    dispatch(registerUser(registerData));
  };

  useEffect(() => {
    if (userDetails.success) {
      toast.success(
        `Welcome ${userDetails.data?.userDetails[0]?.firstName?.toUpperCase()}!`,
        {
          position: "bottom-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      dispatch(loggedIn(true));
      setDialogOpen(false);
      localStorage.setItem("user", JSON.stringify({ email: loginData.email }));
      dispatch(clearUserDetailsStatus());
    }
  }, [userDetails.success]);
  useEffect(() => {
    if (userDetails.error) {
      toast.error("User does not Exist", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });

      dispatch(clearUserDetailsStatus());
    }
  }, [userDetails.error]);

  useEffect(() => {
    if (registationDetails.success) {
      toast.success("Registration SuccessFull , Please Login", {
        position: "bottom-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoginMode(true);
      setLoginData({ ...loginData, email: registationDetails.data.user.email });
    }
  }, [registationDetails.success]);
  useEffect(() => {
    const loginDetails = JSON.parse(localStorage.getItem("user"));

    if (loginDetails) setLoginData(loginDetails);
  }, []);

  return (
    <div className="form">
      <div className="form_left">
        <div className="form_left_heading">
          <h2>{loginMode ? "Login" : "Looks like you're new here!"}</h2>
          <p>
            {loginMode
              ? "Get access to your Orders,Wishlist and Recommendations."
              : "Sign up with your Mobile Number to get started"}
          </p>
        </div>
        <div className="form_left_image">
          <img
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
            alt="image"
          />
        </div>
      </div>
      <div className="form_right">
        <form>
          {loginMode ? (
            <>
              <input
                type="text"
                value={loginData.email}
                onChange={(e) => {
                  setLoginData({ ...loginData, email: e.target.value });
                }}
                placeholder="Enter Email / Mobile Number"
              />
              <input
                type="password"
                value={loginData.password}
                onChange={(e) => {
                  setLoginData({ ...loginData, password: e.target.value });
                }}
                placeholder="Enter Password"
              />
              <p>
                By continuing, you agree to Flipkart's <span>Terms of Use</span>{" "}
                and <span>Privacy Policy</span>.
              </p>
              <button className="submit" onClick={loginhandler}>
                Login
              </button>
            </>
          ) : (
            <>
              <input
                type="text"
                value={registerData.firstName}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    firstName: e.target.value,
                  })
                }
                placeholder="Enter First Name"
              />
              <input
                type="text"
                value={registerData.lastName}
                onChange={(e) =>
                  setRegisterData({ ...registerData, lastName: e.target.value })
                }
                placeholder="Enter Last Name"
              />
              <input
                type="text"
                value={registerData.phoneNo}
                onChange={(e) =>
                  setRegisterData({ ...registerData, phoneNo: e.target.value })
                }
                placeholder="Enter Phone No."
              />
              <input
                type="text"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
                placeholder="Enter Email"
              />

              <input
                type="text"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
                placeholder="Enter Password"
              />
              <input
                type="text"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
              />
              <p>
                By continuing, you agree to Flipkart's <span>Terms of Use</span>{" "}
                and <span>Privacy Policy</span>.
              </p>
              <button
                disabled={
                  registerData.password !== confirmPassword ||
                  !registerData.firstName ||
                  !registerData.phoneNo ||
                  !registerData.email ||
                  !registerData.password ||
                  !confirmPassword
                }
                className="submit"
                onClick={registerHandler}
              >
                Register
              </button>
            </>
          )}
        </form>

        <button onClick={() => setLoginMode(!loginMode)}>
          {loginMode
            ? "New to Flipkart? Create an Account"
            : "Existing User? Log In"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
