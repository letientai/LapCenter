import "./login.scss";
import { Input, Button, Icon, Dimmer, Loader } from "semantic-ui-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
const axios = require("axios");

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const handleChange = (e, field) => {
    if (field === "username") {
      setUserName(e.target.value);
    } else if (field === "password") {
      setPassword(e.target.value);
    }
  };
  const onLogin = () => {
    setLoading(true);
    axios.post('https://lap-center.herokuapp.com/api/login', {
      username: username,
      password: password
    })
    .then(function (response) {
      console.log(response);
      setLoading(false)
      history.push('./')
      localStorage.setItem('customerName', response.data.userName);
      localStorage.setItem('userId', response.data.userId);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false)

      alert("Sai mat khau hoac ten dang nhap!!")
    });
  };
  let checkInfo = true;
  (!username || !password) ? checkInfo = true : checkInfo = false;
  return (
    <div>
      <Dimmer active={loading} inverted >
        <Loader inverted>Loading</Loader>
      </Dimmer>
       <Icon
        className="icon-home"
        name="home"
        size="large"
        inverted
        circular
        link
        onClick={() => history.push("/")}
      />
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
              value={username}
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
            <Button primary onClick={onLogin} disabled={checkInfo}>
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
