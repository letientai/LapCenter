import "./home.scss";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Card from "../../components/cards/card";
import { Icon, Input, Segment, Pagination } from "semantic-ui-react";
import HistoryAndCart from "../../components/historyAndCart/historyAndCart";
import axios from "axios";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
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

const imageBanner = [
  "https://laptopbaominh.com/wp-content/uploads/2015/08/banner-n04.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSYdD9jOx-1-FGrfE0uXOrM48mT7Co4FJLWtQ6fPnJf8pEqvLVPLegU0x-OfeATRfVAw&usqp=CAU",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAUzUfmw9he-AW3JLebOJU0zokludk3Zi-C-ehReY5suYVg1TXV7TwTiSEtr-G20bNDg&usqp=CAU",
  "https://laptopjapan.com/wp-content/uploads/2020/04/baner-trang-chu.jpg",
  "https://storage-asset.msi.com/event/nb/2018/my-pre-order/images/banner.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo6geHK6ewGvS-ZxhZjtPz3ImXDK8Z0wsQUazOtFyXJnnkKK06s5FAuT-wLSzoTzI_lQ&usqp=CAU",
  "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img/https://laptopdell.com.vn/wp-content/uploads/2021/07/Laptop-do-hoa-1.jpg",
  "https://i.ytimg.com/vi/nlDVbSoc3so/maxresdefault.jpg",
];

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const currenUser = localStorage.getItem("customerName");
  const [isSearch, setIsSearch] = useState(false);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSubmitSearch = (e) => {
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${price}`;
    fetchData(url);
    setIsSearch(true);
  };

  const onSubmitBrand = async (e) => {
    await setBrand(e.target.value);
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${e.target.value}&orderByColumn=price&orderByDirection=${price}`;
    await fetchData(url);
    setIsSearch(true);

  };

  const onSubmitPrice = async (e) => {
    await setPrice(e.target.value);
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${e.target.value}`;
    await fetchData(url);
    setIsSearch(true);

  };

  const handlePaginationChange = async (e, { activePage }) => {
    await setLoading(true);
    await setPageNumber(activePage);
    setIsSearch(true);

    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${price}&pageSize=12&pageNumber=${activePage}`;
    await axios
      .get(url)
      .then(function (response) {
        // handle success
        setData(response.data.products);
        setTotalPage(response.data.totalPage);

        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const fetchData = async (url) => {
    setLoading(true);
    axios
      .get(url)
      .then(function (response) {
        setPageNumber(1);
        setData(response.data.products);
        setTotalPage(response.data.totalPage);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
      });
  };

  useEffect(async () => {
    let url = `https://lap-center.herokuapp.com/api/product?`;
    await fetchData(url);
  }, []);

  return (
    <div className="home-container">
      <Navbar className="navbar" />
      <div className="filter">
        <div className="search">
          <Input
            icon={
              <Icon
                name="search"
                inverted
                circular
                link
                onClick={onSubmitSearch}
              />
            }
            placeholder="Search..."
            value={search}
            onChange={onChangeSearch}
          />
        </div>
        <div className="selectForm">
          <select className="selectBox" value={brand} onChange={onSubmitBrand}>
            <option selected value="">
              All
            </option>
            <option value="Asus">ASUS</option>
            <option value="Dell">DELL</option>
            <option value="Acer">ACER</option>
            <option value="Lenovo">LENOVO</option>
          </select>
        </div>
        <div className="selectForm">
          <select className="selectBox" value={price} onChange={onSubmitPrice}>
            <option selected value=" ">
              Mặc định
            </option>
            <option value="asc">Từ thấp đến cao</option>
            <option value="desc">Từ cao đến thấp</option>
          </select>
        </div>
      </div>
      <div className="currentUser">
        {currenUser && (
          <p>
            Chào mừng, <span>{currenUser}</span>
          </p>
        )}
      </div>
      {isSearch === false && (
        <Carousel responsive={responsive}>
          {imageBanner?.map((item) => (
            <img className="imgBanner" src={item} />
          ))}
        </Carousel>
      )}

      {currenUser && <HistoryAndCart />}
      <div className="container-body">
        <div className="menuLeft"></div>
        <Segment loading={loading} className="product">
          {data.length === 0 ? (
            <div className="noResults">
              <h1 style={{ textAlign: "center" }}>
                Không tìm thấy sản phẩm nào!!
              </h1>
            </div>
          ) : (
            data.map((item) => <Card product={item} />)
          )}
        </Segment>
        <div className="menuRight"></div>
      </div>
      <div className="paginator">
        <Pagination
          boundaryRange={0}
          // defaultActivePage={1}
          activePage={pageNumber}
          ellipsisItem={true}
          firstItem={true}
          lastItem={true}
          siblingRange={1}
          totalPages={totalPage}
          onPageChange={handlePaginationChange}
        />
      </div>
    </div>
  );
}

export default Home;
