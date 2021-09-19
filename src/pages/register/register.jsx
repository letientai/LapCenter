import Navbar from "../../components/navbar/navbar";
import "./register.scss";
import { Input, Button } from "semantic-ui-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const account = { username: "admin", password: "admin" };

function Register() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setcfPassword] = useState("");
  const history = useHistory();
  const handleChange = (e, field) => {
    if (field == "username") {
      setUserName(e.target.value);
    } else if (field == "password") {
      setPassword(e.target.value);
    } else if (field == "cfpassword") {
      setcfPassword(e.target.value);
    }
  };
  const onLogin = () => {
    console.log(userName, password);
    if (userName == "" || password == "" || cfpassword == "") {
      alert("Yêu cầu nhập đủ thông tin!!");
    } else {
      if (cfpassword === password) {
        console.log("Đăng ký thành công");
        alert("Đăng ký thành công!!!");
        history.push("/login");
      } else {
        console.log("Đăng ký thất bại");
        alert("Mật khẩu không trùng nhau!!!");
        setcfPassword("");
      }
    }
  };
  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
            {" "}
            Đăng ký{" "}
          </h1>
          <div className="login-content">
            <label>Tên đăng nhập</label>
            <br />
            <Input
              placeholder="Username"
              className="inputText"
              onChange={(e) => handleChange(e, "username")}
              value={userName}
            />
            <br />
            <label style={{ marginTop: "10px" }}>Nhập mật khẩu</label>
            <br />
            <Input
              placeholder="Password"
              type="password"
              className="inputText"
              onChange={(e) => handleChange(e, "password")}
              value={password}
            />
            <br />
            <label style={{ marginTop: "10px" }}>Nhập lại mật khẩu</label>
            <br />
            <Input
              placeholder="Password"
              type="password"
              className="inputText"
              onChange={(e) => handleChange(e, "cfpassword")}
              value={cfpassword}
            />
            <br />
            <Button color="green" onClick={onLogin}>
              Đăng ký
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
