import React, { useState, useEffect } from "react";
import "./manageOrder.scss";
import Navbar from "../../../components/navbar/navbar";
import {
  Table,
  Segment,
  Button,
  Popup,
  Modal,
  Pagination,
} from "semantic-ui-react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const ManageOrder = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [dataItem, setDataItem] = useState([]);
  const [message, setMessage] = useState("");
  const [openDialog, setOpenDialog] = useState("");
  const [orderId, setOrderId] = useState("");
  const [orderStatus, setOrderStatus] = useState(0);
  const [temp, setTemp] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isUserRole, setIsUserRole] = useState(false);
  const isAdmin = localStorage.getItem("isAdmin");
  const history = useHistory();
  const handlePaginationChange = async (activePage) => {
    setTemp(activePage);
    const page = parseInt(activePage?.target?.innerHTML);
    await setLoading(true);
    await setPageNumber(page);
    let url = "";
    if (pageNumber === 1) {
      url = `https://lap-center.herokuapp.com/api/order?pageNumber=1`;
    } else {
      url = `https://lap-center.herokuapp.com/api/order?pageNumber=${page}`;
    }

    await axios
      .get(url)
      .then(function (response) {
        // handle success
        window.scrollTo(0, 0);
        setData(response.data.orders);
        setTotalPage(response.data.totalPage);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const fetchData = () => {
    setLoading(true);
    axios
      .get("https://lap-center.herokuapp.com/api/order")
      .then(function (response) {
        setPageNumber(1);
        setData(response.data.orders);
        setTotalPage(response.data.totalPage);
        setLoading(false);
        console.log("dataas", data);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  // useEffect(() => {
  //   if (isAdmin === true) {
  //     fetchData();
  //   } else {
  //     setLoading(false);
  //     setOpenDialog(true);
  //     setMessage("Bạn không thể truy cập vào địa chỉ này!!!");
  //     setIsUserRole(true);
  //   }
  // }, []);

  useEffect(() => {
    if(isAdmin === "undefined" || isAdmin === "false") {
      setOpenDialog(true)
      setMessage("Bạn không thể truy cập vào địa chỉ này. Vui lòng quay lại trang chủ!!!");
      setIsUserRole(true);
    } else {
      fetchData();
    } 
  }, []);

  const convertOrder = (order) => {
    return order === 1 ? (
      <span className="case1">Vừa đặt</span>
    ) : order === 2 ? (
      <span className="case2">Đang giao</span>
    ) : order === 3 ? (
      <span className="case3">Đã nhận</span>
    ) : (
      <span className="case4">Trả hàng</span>
    );
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
  };

  const changeOrderStatus = () => {
    setOpen(false);
    setLoading(true);
    axios
      .patch(
        `https://lap-center.herokuapp.com/api/order/editOrderStatus/${orderId}`,
        {
          orderStatus: orderStatus,
        }
      )
      .then(function (res) {
        setLoading(false);
        setOpenDialog(true);
        handlePaginationChange(temp);
        setMessage("Thay đổi trạng thái đơn hàng thành công!!!");
      })
      .catch(function (err) {
        setOpenDialog(false);
        setMessage("Đã có lỗi xảy ra. Vui lòng kiểm tra lại!!");
      });
  };

  const onOpenDetail = (item) => {
    setDataItem(item);
    setOrderStatus(item.orderStatus);
    setOrderId(item._id);
    setOpen(true);
  };

  const onOpenDelete = (item) => {
    setMessage("Bạn có chắc chắn muốn xóa đơn hàng này?");
    setOpenDialog(true);
    setOrderId(item._id);
    setIsDelete(true);
  };

  const handleSelectChange = (e) => {
    console.log("value", parseInt(e.target.value));
    const order = parseInt(e.target.value);
    setOrderStatus(order);
  };

  const onDelete = () => {
    setLoading(true);
    setIsDelete(false);
    axios
      .delete(
        `https://lap-center.herokuapp.com/api/order/removeOrder/${orderId}`
      )
      .then(function (response) {
        setLoading(false);
        setOpenDialog(true);
        setMessage("Xóa thành công sản phẩm khỏi danh sách!!!");
        handlePaginationChange(temp);
      })
      .catch(function (error) {
        setLoading(false);
        setOpenDialog(true);
        setMessage("Xóa không thành công sản phẩm khỏi danh sách!!!");
      });
  };

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
                        onClick={() => onOpenDetail(item)}
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
                        onClick={() => onOpenDelete(item)}
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
                <Pagination
                  boundaryRange={0}
                  // defaultActivePage={1}
                  activePage={pageNumber}
                  ellipsisItem={true}
                  firstItem={true}
                  lastItem={true}
                  siblingRange={1}
                  totalPages={totalPage}
                  onPageChange={handlePaginationChange.bind(this)}
                />
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
                value={orderStatus}
                onChange={(e) => handleSelectChange(e)}
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
          <Button onClick={changeOrderStatus} color="blue">
            Cập nhật
          </Button>
        </Modal.Actions>
      </Modal>
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
          {!isUserRole && (
            <Button
              onClick={() => {
                setOpenDialog(false);
                setIsDelete(false);
              }}
            >
              {isDelete === true ? "Hủy" : "Đóng"}
            </Button>
          )}

          {isDelete && (
            <Button onClick={() => onDelete()} color="blue">
              Xác nhận
            </Button>
          )}
          {isUserRole && (
            <Button
              color="blue"
              onClick={() => {
                history.push("/");
                setOpenDialog(false);
              }}
            >
              Trang chủ
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default ManageOrder;
