import "./register.scss";
import { Input, Button, Dimmer, Loader, Icon, Modal } from "semantic-ui-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
function Register() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState();
  const [cfpassword, setcfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] =useState(false);
  const [message, setMessage] =useState(false);


  const history = useHistory();
  const handleChange = (e, field) => {
    if (field === "name") {
      setName(e.target.value);
    } else if (field === "password") {
      setPassword(e.target.value);
    } else if (field === "cfpassword") {
      setcfPassword(e.target.value);
    } else if (field === "email") {
      setEmail(e.target.value);
    } else if (field === "phone") {
      setPhone(e.target.value);
    }
  };
  const onRegister = () => {
    if (name === "" || password === "" || cfpassword === "") {
      alert("Yêu cầu nhập đủ thông tin!!");
    } else {
      if (cfpassword === password) {
        setLoading(true);
        axios
          .post("https://lap-center.herokuapp.com/api/register", {
            name: name,
            email: email,
            phone: phone,
            password: password,
          })
          .then(function (response) {
            console.log(response);
            setLoading(false);
            setOpenDialog(true)
            setMessage("Đăng ký thành công")
          })
          .catch(function (error) {
            console.log(error);
            setLoading(false);
            setOpenDialog(true)
            setMessage("Đăng ký không thành công!!")
          });
      } else {
        setOpenDialog(true)
        setMessage("Mật khẩu không trùng nhau!!!")
        setcfPassword("");
      }
    }
  };
  let checkInfo = true;
  !name || !phone || !email || !password || !cfpassword
    ? (checkInfo = true)
    : (checkInfo = false);

  // if (!name || !phone || !email || !password || !cfpassword)
  //   checkInfo = true;
  // else
  //   checkInfo = false;

  // if (!name || !phone || !email || !password || !cfpassword)
  // if (customerName && phoneNumber && email && address) checkInfo = false
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
      <div className="register-container">
        <div className="register-form">
          <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
            {" "}
            Đăng ký{" "}
          </h1>
          <div className="register-content">
            <label>Tên người dùng</label>
            <br />
            <Input
              placeholder="Name"
              className="inputText"
              onChange={(e) => handleChange(e, "name")}
              value={name}
            />
            <br />
            <label>Số điện thoại</label>
            <br />
            <Input
              placeholder="Phone"
              className="inputText"
              type="number"
              onChange={(e) => handleChange(e, "phone")}
              value={phone}
            />
            <br />
            <label>Email</label>
            <br />
            <Input
              placeholder="Email"
              className="inputText"
              onChange={(e) => handleChange(e, "email")}
              value={email}
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
            <label style={{ marginTop: "10px" }}>Xác nhận mật khẩu</label>
            <br />
            <Input
              placeholder="Password"
              type="password"
              className="inputText"
              onChange={(e) => handleChange(e, "cfpassword")}
              value={cfpassword}
            />
            <br />
            <Button primary onClick={onRegister} disabled={checkInfo}>
              <span>Đăng ký</span>
            </Button>
            <p style={{ marginTop: "10px", textAlign: "center" }}>
              Bạn đã có tài khoản.{" "}
              <a className="login-text" onClick={() => history.push("/login")}>
                Đăng nhập.
              </a>
            </p>
          </div>
        </div>
      </div>
      <Modal
        onClose={() => setOpenDialog(false)}
        onOpen={() => setOpenDialog(true)}
        open={openDialog}
        size="mini"
      >
        <Modal.Header>
          <h4 className="txt-check">Thông báo</h4>
        </Modal.Header>
        <Modal.Content image>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenDialog(false)}>Đóng</Button>
          {password === cfpassword &&
          <Button primary onClick={() => (history.push('/login'), setOpenDialog(false))}>Đăng nhập</Button> 
        }
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default Register;
