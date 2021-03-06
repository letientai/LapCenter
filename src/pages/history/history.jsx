import React, { useEffect, useState } from "react";
import { Table, Segment } from "semantic-ui-react";
import Navbar from "../../components/navbar/navbar";
import "./history.scss";
import axios from "axios";

function History() {
  const userId = localStorage.getItem("userId");
  const currentUser = localStorage.getItem("customerName");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchAPI();
  },[])
  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/history/${userId}`)
      .then(function (response) {
        // handle success
        const data = response.data.products;
        console.log("Histories: ", data);
        setData(data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div>
      <Navbar />
      <Segment loading={loading} className="history-container">
        <h4>
          Lịch sử mua hàng của <span>{currentUser}</span>
        </h4>
        <div className="history-content">
          <Table color="green" key="green">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Tên sản phẩm</Table.HeaderCell>
                <Table.HeaderCell>Số lượng</Table.HeaderCell>
                <Table.HeaderCell>Số điện thoại</Table.HeaderCell>
                <Table.HeaderCell>Địa chỉ giao hàng</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map((item, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <span className="history-name">{item.productName}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span style={{ color: "#db2828" }}>{item.quantity}</span>
                  </Table.Cell>
                  <Table.Cell>{item.phone}</Table.Cell>
                  <Table.Cell>{item.address}</Table.Cell>
                </Table.Row>
              ))} 
            </Table.Body>
          </Table>
        </div>
      </Segment>
    </div>
  );
}
export default History;