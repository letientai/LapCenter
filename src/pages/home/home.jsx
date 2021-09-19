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

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  };
  // const onChangeBrand = (e) =>{
  //   setBrand(e.target.value);
  // }

  const onSubmitSearch = (e) => {
    // setData(
    //   products.filter((item) =>
    //     item?.name?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase())
    //   )
    // );
    const searchName = "https://lap-center.herokuapp.com/api/product?productName=";
    const linkSearchName = searchName.concat(search)
    console.log(linkSearchName);
    axios
      .get(linkSearchName)
      .then(function (response) {
        setData(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      })
      setPrice("")
      setBrand("All")
  };
  const onSubmitBrand = async (e) => {
    await setBrand(e.target.value);
    // await setData(
    //   products.filter((item) =>
    //     item?.name
    //       ?.toLocaleLowerCase()
    //       ?.includes(e.target.value?.toLocaleLowerCase())
    //   )
    // );
    const searchBR = "https://lap-center.herokuapp.com/api/product?productBrand=";
    const linkSearchBR = searchBR.concat(e.target.value)
    console.log(linkSearchBR);
    axios
      .get(linkSearchBR)
      .then(function (response) {
        setData(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      })
      setPrice("")
      setSearch("")
  };
  const onSubmitPrice = async (e) => {
    setPrice(e.target.value);
    if (e.target.value == 1) {
      // setData(
      //   data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      // );
      axios
      .get("https://lap-center.herokuapp.com/api/product?orderByColumn=price&orderByDirection=asc")
      .then(function (response) {
        setData(response.data.products);
      })
    } 
    else if (e.target.value == 2) {
      // setData(
      //   data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      // );
      axios
      .get("https://lap-center.herokuapp.com/api/product?orderByColumn=price&orderByDirection=desc")
      .then(function (response) {
        setData(response.data.products);
      })
      .catch(function (error) {
        console.log(error);
      })
      
    } 
    setBrand("All")
    setSearch("")
  };

  const fetchData = async () => {
    // await setData(products);
    ////////Cách 1
    ///start call API
    axios
      .get("https://lap-center.herokuapp.com/api/product")
      .then(function (response) {
        // handle success
        console.log('đúng',response.data.products);
        setData(response.data.products);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      /// end call API
      ///////Cách 2
      // fetch('https://lap-center.herokuapp.com/api/product')
      // .then(response => response.json())
      // .then(data => {
      //   console.log('Success:', data);
      //   setData(data.products)
      // })
      // .catch((error) => {
      //   console.error('Error:', error);
      // });
  };

  useEffect(async () => {
    await fetchData();
  }, []);
  const [loadingPage, setLoadingPage] = useState(true);
  setTimeout(function(){ setLoadingPage(false) }, 2000);

  return (
    <Segment className="home-container" loading={loadingPage}>
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
          <p>Hãng</p>
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
          <p>Giá</p>
          <select className="selectBox" value={price} onChange={onSubmitPrice}>
            <option selected value=""></option>
            <option value="1">Từ thấp đến cao</option>
            <option value="2">Từ cao đến thấp</option>
          </select>
        </div>
      </div>
      <div className="product">
        {data.map((item) => (
          <Card product={item} />
        ))}
      </div>
    </Segment>
    
  );
}

export default Home;
