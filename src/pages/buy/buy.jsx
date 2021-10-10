import React, { useState, useEffect } from "react";
import "./buy.scss";
import Navbar from "../../components/navbar/navbar";
import {
  Segment,
  Button,
  Input,
  Label,
  Form,
  TextArea,
  Modal,
  Image,
} from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Buy = () => {
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] =useState(false);
  const [message, setMessage] =useState(false);




  const location = useLocation();
  const id = location.pathname?.split("buy/")[1];

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, [location]);

  const fetchData = () => {
    setLoading(true);
    let url = `https://lap-center.herokuapp.com/api/product/getProductById/${id}`;
    axios
      .get(url)
      .then(function (response) {
        const data = response.data.response;
        setData(data);
        setImage(data.images[0]);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("Error: ", error);
      });
  };
  const onChangeQuantity = (method) => {
    if (method === "plus") {
      setQuantity(quantity + 1);
    } else if (quantity === 1) {
      setQuantity(1);
    } else {
      setQuantity(quantity - 1);
    }
  };

  let checkInfo = true;
  if (!customerName || !phoneNumber || !email || !address) checkInfo = true;
  if (customerName && phoneNumber && email && address) checkInfo = false;

  const onChangeInfo = (e, field) => {
    const value = e.target.value;
    switch (field) {
      case "customer":
        setCustomerName(value);
        break;
      case "phone":
        setPhoneNumber(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      default:
      // code block
    }
  };
  const onOrder = () => {
    setOpen(false);
    setLoading(true)
    axios
      .post("https://lap-center.herokuapp.com/api/order/addOrder", {
        customerName: customerName,
        email: email,
        phone: phoneNumber,
        address: address,
        productName: data.name,
        productBrand: data.brand,
        quantity: quantity,
        orderStatus: 1,
      })
      .then(function (res) {
        setLoading(false)
        console.log(res);
        setOpenDialog(true)
        setMessage("Đặt hàng thành công!!!")
        
      })
      .catch(function (err) {
        console.log(err);
        setOpenDialog(false)
        setMessage("Đã có lỗi xảy ra. Vui lòng kiểm tra lại!!")
      });
  };
  return (
    <div>
      <Navbar />
      <Segment className="buy-container" loading={loading}>
        <div className="buy-title">
          <p>Để đặt hàng</p>
          <span>
            , quý khách hàng vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc
            và điền các thông tin dưới đây:
          </span>
        </div>
        <div className="buy-content">
          <div className="buy-header">
            <img className="buy-image" src={image} alt={image} />
            <p>{data.name}</p>
            <div className="quantity">
              <Button icon="minus" onClick={() => onChangeQuantity("minus")} />
              <Input className="inp-quantity" value={quantity} />
              <Button icon="plus" onClick={() => onChangeQuantity("plus")} />
              <h4>{data.price} đ</h4>
            </div>
          </div>
          <hr />
          <div className="buy-total">
            <h3>Tổng tiền:</h3>
            <p> {data.price * quantity} đ</p>
          </div>
          <div className="user-info">
            <Segment raised>
              <Label as="a" color="red" ribbon>
                Thông tin khách hàng
              </Label>
              <Form className="info-form">
                <Form.Field>
                  <label>Tên khách hàng</label>
                  <input
                    placeholder="Tên khách hàng"
                    value={customerName}
                    onChange={(e) => onChangeInfo(e, "customer")}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Số điện thoại</label>
                  <input
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChange={(e) => onChangeInfo(e, "phone")}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Email</label>
                  <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => onChangeInfo(e, "email")}
                  />
                </Form.Field>
                <Form.Field>
                  <label>Địa chỉ</label>
                  <TextArea
                    placeholder="Địa chỉ"
                    value={address}
                    onChange={(e) => onChangeInfo(e, "address")}
                  />
                </Form.Field>
                <Modal
                  onClose={() => setOpen(false)}
                  onOpen={() => setOpen(true)}
                  open={open}
                  trigger={
                    <Button color="red" disabled={checkInfo} className="btn-order">
                      Đặt hàng
                    </Button>
                  }
                >
                  <Modal.Header>
                    <h2 className="txt-check">XÁC NHẬN THÔNG TIN</h2>
                  </Modal.Header>
                  <Modal.Content image>
                    <Image size="medium" src={image} wrapped />
                    <Modal.Description>
                      <h5 className="txt-title">Thông tin sản phẩm</h5>
                      <div className="info-check">
                        <p>Tên sản phẩm:</p>
                        <span>{data.name}</span>
                      </div>
                      <div className="info-check">
                        <p>Hãng:</p>
                        <span>{data.brand}</span>
                      </div>
                      <div className="info-check">
                        <p>Số lượng:</p>
                        <span>{quantity}</span>
                      </div>
                      <div className="info-check">
                        <p>Tổng tiền:</p>
                        <span>{quantity * data.price} VND</span>
                      </div>
                      <h5 className="txt-title">Thông tin khách hàng</h5>
                      <div className="info-check">
                        <p>Tên khách hàng:</p>
                        <span>{customerName}</span>
                      </div>
                      <div className="info-check">
                        <p>Số điện thoại:</p>
                        <span>{phoneNumber}</span>
                      </div>
                      <div className="info-check">
                        <p>Email:</p>
                        <span>{email}</span>
                      </div>
                      <div className="info-check">
                        <p>Địa chỉ:</p>
                        <span>{address} VND</span>
                      </div>
                    </Modal.Description>
                  </Modal.Content>
                  <Modal.Actions>
                    <Button onClick={() => setOpen(false)}>Hủy</Button>
                    <Button onClick={onOrder} color="red">
                      Xác nhận{" "}
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Form>
            </Segment>
          </div>
        </div>
      </Segment>
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
        </Modal.Actions>
      </Modal>
    </div>
  );
};
export default Buy;
