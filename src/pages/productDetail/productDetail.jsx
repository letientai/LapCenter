import React, { useEffect, useState } from "react";
import "./productDetail.scss";
import Navbar from "../../components/navbar/navbar";
import CardItem from "../../components/cardItem/cardItem";
import { Segment, Button, Table, Modal } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ProductDetail = () => {
  const [data, setData] = useState([]);
  const [sameProduct, setSameProduct] = useState([]);
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  const location = useLocation();
  const id = location.pathname?.split("product/")[1];
  const currenUser = localStorage.getItem('customerName');
  // const id = location.pathname?.replace('product/', '');
  const [openDialog, setOpenDialog] =useState(false);
  const [message, setMessage] =useState(false);
  const [open, setOpen] = useState(false);
  const moveToBuy = () => {
    history.push(`/buy/${id}`);
  };

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
        console.log("data detail", data);
        setData(data);
        setImage(data.images[0]);
        fetchSameProduct(data);
      })
      .catch(function (error) {
        setLoading(false);
        console.log("Error: ", error);
      });
  };
  const fetchSameProduct = (data) => {
    axios
      .get(
        `https://lap-center.herokuapp.com/api/product?productBrand=${data?.brand}&pageSize=10&pageNumber=1`
      )
      .then(function (response) {
        console.log("product more: ", response.data.products);
        setSameProduct(response.data.products);
        setLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  };
  const onAddToCart = () => {
    setOpen(false);
    setLoading(true);
    axios
      .post("https://lap-center.herokuapp.com/api/cart/addProductToCart", {
        userId: localStorage.getItem("userId"),
        productId: id,
        productName: data.name,
        productBrand: data.brand,
        image: image ,
        price: data.price,
      })
      .then(function (res) {
        console.log(res);
        setLoading(false);
        setOpenDialog(true)
        setMessage("Th??m v??o gi??? h??ng th??nh c??ng!!")
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
        setOpenDialog(true)
        setMessage("Th??m v??o gi??? h??ng th???y b???i !! Vui l??ng th??? l???i sau")
      });
  };
  const onChooseImage = (image) => {
    setImage(image);
  };
  return (
    <div>
      <Navbar />
      <Segment className="detail-segment-container" loading={loading}>
        <div className="detail-product-name">{data?.name}</div>
        <div className="detail-status">
          <p>T??nh tr???ng: C??n h??ng</p>
          <p style={{ marginLeft: "20px" }}>B???o h??nh: 24 th??ng</p>
        </div>
        <hr style={{ width: "80%" }} />
        <div className="detail-container">
          <div className="detail-left">
            <img className="detail-image" src={image} alt={image} />
            <div className="detail-list-images">
              {data?.images?.map((item) => (
                <img
                  className="detail-image-small"
                  src={item}
                  alt=""
                  onClick={() => onChooseImage(item)}
                />
              ))}
            </div>
          </div>
          <div className="detail-main">
            <p>
              Gi?? b??n: <span>{data?.price} VND</span>
            </p>
            <div className="detail-discount">
              <div className="discount-top">
                <p>Khuy???n m??i - Qu?? t???ng</p>
              </div>
              <div className="discount-content">something</div>
            </div>
            <div className="detail-buy">
              <Button color="red" onClick={moveToBuy}>
                MUA NGAY
              </Button>
              {currenUser && 
              <Button color="green" className="btnCart" onClick={() => setOpen(true)}>
                TH??M V??O GI??? H??NG
              </Button>
              }
              <p>
                G???I NGAY <a href="tel:+84969442510"> 0969 44 2510 </a> ????? GI???
                H??NG
              </p>
            </div>
          </div>
          <div className="detail-right">
            <div>
              <span>??i???n tho???i t?? v???n - ?????t h??ng</span>
              <ul>
                <li>Kim L?? - 0904 555 666</li>
                <li>Hu???nh L??? - 0345 789 789</li>
                <li>V??n D??ng - 0876 567 678</li>
              </ul>
            </div>
            <div>
              <span>?????a ch??? mua h??ng</span>
              <ul>
                <li>152 ABC, Thanh Kh??, TP. ???? N???ng</li>
                <li>162 ABC, Thanh Kh??, TP. ???? N???ng</li>
                <li>172 ABC, Thanh Kh??, TP. ???? N???ng</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="specifications">
          <Table celled fixed singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Ph???n c???ng</Table.HeaderCell>
                <Table.HeaderCell>Th??ng s??? k?? thu???t</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              <Table.Row>
                <Table.Cell>Model</Table.Cell>
                <Table.Cell>{data?.model}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>CPU</Table.Cell>
                <Table.Cell>{data?.cpu}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>RAM</Table.Cell>
                <Table.Cell>{data?.ram}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>??? c???ng</Table.Cell>
                <Table.Cell>{data?.disk}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Card ????? h???a</Table.Cell>
                <Table.Cell>{data?.card}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>M??n h??nh</Table.Cell>
                <Table.Cell>{data?.monitor}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </div>
        <div className="same-product">
          <h3>S???n ph???m c??ng th????ng hi???u</h3>
          <hr />
          <Carousel responsive={responsive} showDots={true}>
            {sameProduct.map((item) => (
              <CardItem product={item} />
            ))}
          </Carousel>
        </div>
      <Modal
        onClose={() => setOpenDialog(false)}
        onOpen={() => setOpenDialog(true)}
        open={openDialog}
        size="mini"
      >
        <Modal.Header>
          <h4 className="txt-check">Th??ng b??o</h4>
        </Modal.Header>
        <Modal.Content image>
          <p>{message}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpenDialog(false)}>????ng</Button>
        </Modal.Actions>
      </Modal>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size="mini"
      >
        <Modal.Header>
          <h4 className="txt-check">Th??ng b??o</h4>
        </Modal.Header>
        <Modal.Content image>
          <p>B???n c?? mu???n th??m s???n ph???m v??o gi??? h??ng kh??ng ?</p>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>H???y</Button>
          <Button color="green" onClick={onAddToCart}>
            X??c nh???n
          </Button>
        </Modal.Actions>
      </Modal>
      </Segment>
    </div>
  );
};
export default ProductDetail;
