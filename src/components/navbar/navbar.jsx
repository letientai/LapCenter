import React, { useState, useEffect } from "react";
import logo from "../../assets/imgs/desktop-computer.png";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
// import React, { useState, useEffect } from "react";

const Navbar = (props) => {
  const history = useHistory();
  const currenUser = localStorage.getItem("customerName");
  const isAdmin = localStorage.getItem("isAdmin");

  const backToHome = () => {
    history.push("/");
  };

  return (
    <div className="navbar">
      <p className="logo-container">
        <img className="logo" src={logo} onClick={backToHome} />
      </p>
      <div className="options">
        <Link to="/" className="option">
          TRANG CHỦ
        </Link>
        <Link to="/introduct" className="option">
          GIỚI THIỆU
        </Link>
        {isAdmin === "true" ? (
          <Link to="/admin/order" className="option">
            QUẢN LÝ ĐƠN HÀNG
          </Link>
        ) : (
          <Link to="/contact" className="option">
            LIÊN HỆ
          </Link>
        )}

        {currenUser ? (
          <Link
            to="/login"
            className="option"
            onClick={() => localStorage.clear()}
          >
            ĐĂNG XUẤT
          </Link>
        ) : (
          <Link to="/login" className="option">
            LOGIN
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
