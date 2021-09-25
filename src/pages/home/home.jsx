import "./home.scss";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Card from "../../components/cards/card";
import products from "../../assets/data/product";
import { Icon, Input, Segment } from "semantic-ui-react";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const axios = require("axios");
  const [loading, setLoading] = useState(true);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const onSubmitSearch = (e) => {
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${price}`;
    fetchData(url);
  };
  const onSubmitBrand = async (e) => {
    await setBrand(e.target.value);
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${e.target.value}&orderByColumn=price&orderByDirection=${price}`;
    await fetchData(url);
  };
  const onSubmitPrice = async (e) => {
    await setPrice(e.target.value);
    let url = `https://lap-center.herokuapp.com/api/product?productName=${search}&productBrand=${brand}&orderByColumn=price&orderByDirection=${e.target.value}`;
    await fetchData(url);
  };

  const fetchData = async (url) => {
    setLoading(true);
    axios
      .get(url)
      .then(function (response) {
        setData(response.data.products);
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

      <div className="menuLeft">
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
        <div className="selectForm">
          <b>Hãng</b>
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
          <b>Giá</b>
          <select className="selectBox" value={price} onChange={onSubmitPrice}>
            <option selected value=""></option>
            <option value="asc">Từ thấp đến cao</option>
            <option value="desc">Từ cao đến thấp</option>
          </select>
        </div>
      </div>
      <Segment loading={loading} className="product">
        {data.map((item) => (
          <Card product={item} />
        ))}
      </Segment>
    </div>
  );
}

export default Home;
