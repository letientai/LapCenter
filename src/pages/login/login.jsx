import Navbar from "../../components/navbar/navbar";
import "./login.scss";
import { Input, Button } from "semantic-ui-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const account = { username: "admin", password: "admin" };

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleChange = (e, field) => {
    if (field == "username") {
      setUserName(e.target.value);
    } else if (field == "password") {
      setPassword(e.target.value);
    }
  };
  const onLogin = () => {
    console.log(userName, password);
    if (userName === account.username && password === account.password) {
      console.log("Đăng nhập thành công");
      alert("Đăng nhập thành công!!!");
      history.push("/");
    } else {
      console.log("Đăng nhập thất bại");
      alert("Nhập sai tên đăng nhập hoặc mật khẩu!!!");
      setPassword("");
    }
  };
  return (
    <div>
      <Navbar />
      <div className="login-container">
        <div className="login-form">
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
            {" "}
            Đăng nhập{" "}
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
            <label style={{ marginTop: "10px" }}>Mật khẩu</label>
            <br />
            <Input
              placeholder="Password"
              type="password"
              className="inputText"
              onChange={(e) => handleChange(e, "password")}
              value={password}
            />
            <br />
            <Button className="custom-btn btn-3" onClick={onLogin}>
              <span>Đăng nhập</span>
            </Button>
            <p style={{ marginTop: "20px", textAlign: "center" }}>
              Bạn chưa có tài khoản?{" "}
              <a
                className="register-text"
                onClick={() => history.push("./register")}
              >
                Đăng ký ngay.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
