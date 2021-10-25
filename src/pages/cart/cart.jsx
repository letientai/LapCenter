import React, { useEffect, useState } from "react";
import { Table, Segment, Popup, Button, Modal } from "semantic-ui-react";
import Navbar from "../../components/navbar/navbar";
import "./cart.scss";
import axios from "axios";

function Cart() {
  const userId = localStorage.getItem("userId");
  const currentUser = localStorage.getItem("customerName");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  useEffect(() => {
    fetchAPI();
  }, []);
  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/cart/${userId}`)
      .then(function (response) {
        const data = response.data.products;
        setData(data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
      });
  };
  const onDelete = () => {
    setLoading(true);
    setOpen(false);
    axios
      .delete(
        `https://lap-center.herokuapp.com/api/cart/removeCartInCart/${productId}`
      )
      .then(function (response) {
        setLoading(false);
        setOpenDialog(true);
        setMessage("Xóa thành công");
        fetchAPI();
      })
      .catch(function (error) {
        setOpenDialog(true);
        setMessage("Xóa không thành công");
        console.log(error);
      });
  };
  return (
    <div>
      <Navbar />
      <Segment loading={loading} className="cart-container">
        <h2>
          Giỏ hàng của <span>{currentUser}</span>
        </h2>
        <div className="cart-content">
          <Table color="green" key="green">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Hình ảnh</Table.HeaderCell>
                <Table.HeaderCell>Tên sản phẩm</Table.HeaderCell>
                <Table.HeaderCell>Hãng</Table.HeaderCell>
                <Table.HeaderCell>Giá</Table.HeaderCell>
                <Table.HeaderCell>Hành động</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <img src={item.image} alt="" className="cart-img" />
                  </Table.Cell>
                  <Table.Cell>
                    <span className="cart-name">{item.productName}</span>
                  </Table.Cell>
                  <Table.Cell>{item.productBrand}</Table.Cell>
                  <Table.Cell>
                    <span style={{ color: "#db2828" }}>{item.price}VND</span>
                  </Table.Cell>
                  <Table.Cell>
                    <Popup
                      content="Xóa"
                      trigger={
                        <Button
                          icon="trash alternate"
                          color="youtube"
                          circular
                          onClick={() => {
                            setProductId(item._id);
                            setOpen(true);
                          }}
                        />
                      }
                    />
                    <Popup
                      content="Mua"
                      trigger={
                        <Button
                          icon="shopping cart"
                          color="facebook"
                          circular
                          // onClick={() => onBuy(item.productId)}
                        />
                      }
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
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

      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="mini"
      >
        <Modal.Header>
          <h4 className="txt-check">Thông báo</h4>
        </Modal.Header>
        <Modal.Content image>
          <p>Bạn có muốn xóa sản phẩm này không ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button color="green" onClick={onDelete}>
            Xác nhận
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
export default Cart;
