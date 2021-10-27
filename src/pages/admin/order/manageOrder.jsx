import React, { useState, useEffect } from "react";
import "./manageOrder.scss";
import Navbar from "../../../components/navbar/navbar";
import {
  Table,
  Segment,
  Button,
  Popup,
  Menu,
  Icon,
  Modal,
} from "semantic-ui-react";
import axios from "axios";
const ManageOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://lap-center.herokuapp.com/api/order")
      .then(function (response) {
        setPageNumber(1);
        setData(response.data.orders);
        setTotalPage(response.data.totalPage);
        setLoading(false);
        console.log("data", data);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const convertOrder = (order) => {
    return(
      order === 1 ? 
      <span className="case1">Vừa đặt</span> :
      order === 2 ? 
      <span className="case2">Đang giao</span> :
      order === 3 ? 
      <span className="case3">Đã nhận</span> :
      <span className="case4">Trả hàng</span>
    )
    // switch(order) {
    //     case 1:
    //       return <span className="case1">Vừa đặt</span>
    //     case 2:
    //       return <span className="case2">Đang giao</span>
    //     case 3:
    //       return <span className="case3">Đã nhận</span>
    //     default:
    //       return <span className="case4">Trả hàng</span>
    //   }
  }
  return (
    <div>
      <Navbar />
      <Segment className="order-container" loading={loading}>
        <h1>Quản lý đơn hàng</h1>

        <Table celled color="teal">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Tên khách hàng</Table.HeaderCell>
              <Table.HeaderCell>Tên sản phẩm</Table.HeaderCell>
              <Table.HeaderCell>Số điện thoại</Table.HeaderCell>
              <Table.HeaderCell>Trạng thái</Table.HeaderCell>
              <Table.HeaderCell>Hành động</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {data.map((item, index) => (
              <Table.Row key={index}>
                <Table.Cell>{item.customerName}</Table.Cell>
                <Table.Cell>{item.productName}</Table.Cell>
                <Table.Cell>{item.phone}</Table.Cell>
                <Table.Cell>
                  {/* {item.orderStatus === 1 ? (
                    <span className="case1">Vừa đặt</span>
                  ) : item.orderStatus === 2 ? (
                    <span className="case2">Đang giao</span>
                  ) : item.orderStatus === 3 ? (
                    <span className="case3">Đã nhận</span>
                  ) : (
                    <span className="case4">Trả hàng</span>
                  )} */}
                  {convertOrder(item.orderStatus)}
                </Table.Cell>
                <Table.Cell>
                  <Popup
                    content="Chi tiết"
                    trigger={
                      <Button
                        icon="eye"
                        color="facebook"
                        circular
                        onClick={() => {
                          setDataItem(item);
                          setOpen(true);
                        }}
                      />
                    }
                  />
                  <Popup
                    content="Xóa"
                    trigger={
                      <Button
                        icon="trash alternate"
                        color="youtube"
                        circular
                        //   onClick={() => onBuy(item.productId)}
                      />
                    }
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  <Menu.Item as="a">1</Menu.Item>
                  <Menu.Item as="a">2</Menu.Item>
                  <Menu.Item as="a">3</Menu.Item>
                  <Menu.Item as="a">4</Menu.Item>
                  <Menu.Item as="a" icon>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Segment>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>THÔNG TIN KHÁCH HÀNG</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div className="info-check">
              <p>Tên khách hàng:</p>
              <span>{dataItem?.customerName}</span>
            </div>
            <div className="info-check">
              <p>Tên sản phẩm:</p>
              <span>{dataItem?.productName}</span>
            </div>
            <div className="info-check">
              <p>Hãng:</p>
              <span>{dataItem?.productBrand}</span>
            </div>
            <div className="info-check">
              <p>Số lượng:</p>
              <span> {dataItem?.quantity}</span>
            </div>
            <div className="info-check">
              <p>Số điện thoại:</p>
              <span>{dataItem?.phone}</span>
            </div>
            <div className="info-check">
              <p>Địa chỉ:</p>
              <span>{dataItem?.address}</span>
            </div>
            <div className="info-check">
              <p>Trạng thái đơn hàng:</p>
              <select
                //   value={selectedStatus}
                //   onChange={handleSelectChange}
                className="select-status"
              >
                <option value="1">Vừa đặt</option>
                <option value="2">Đang giao</option>
                <option value="3">Đã nhận</option>
                <option value="4">Gửi trả</option>
              </select>
            </div>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button onClick={() => setOpen(false)} positive>
            Cập nhật
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ManageOrder;
