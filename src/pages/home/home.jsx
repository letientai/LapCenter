import "./home.scss";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import Card from "../../components/cards/card";
import products from "../../assets/data/product";
import { Icon, Input } from "semantic-ui-react";

function Home() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");

  const onChangeSearch = (e) =>{
    setSearch(e.target.value);
    console.log(e.target.value);
  }
  // const onChangeBrand = (e) =>{
  //   setBrand(e.target.value);
  // }

  const onSubmitSearch = () =>{
    setData(
      products.filter((item) => 
      item?.name?.toLocaleLowerCase()?.includes(search?.toLocaleLowerCase())
      )
    );
  };
  const onSubmitBrand =async (e) => {
    await setBrand(e.target.value);
    await setData(
      products.filter((item) => 
      item?.name?.toLocaleLowerCase()?.includes(e.target.value?.toLocaleLowerCase())
      )
    )
  }
  const onSubmitPrice =async (e) => {
    setPrice(e.target.value);
    if(e.target.value == 1){
      setData(
        products.sort((a,b) => parseFloat(a.price) - parseFloat(b.price) )
      )
    }else if(e.target.value == 2){
      setData(
        products.sort((a,b) => parseFloat(b.price) - parseFloat(a.price) )
      )
    }
  }

  const fetchData = async () => {
    await setData(products);
  };

  useEffect(async () => {
    await fetchData();
  }, []);



  return (
    <div className="home-container">
      <Navbar className="navbar"/>

      <div className="menuLeft">
        <Input
          icon={<Icon name="search" inverted circular link onClick = {onSubmitSearch} />}
          placeholder="Search..." value={search} onChange = {onChangeSearch} 
        />
        <div className="selectForm">
          <p>Hãng</p>
          <select className="selectBox" value={brand} onChange = {onSubmitBrand}>
            <option selected value="">All</option>
            <option value="Asus">ASUS</option>
            <option value="Dell">DELL</option>
            <option value="Acer">ACER</option>
            <option value="Lenovo">LENOVO</option>
          </select>
        </div>
        <div className="selectForm">
          <p>Giá</p>
          <select className="selectBox" value={price} onChange ={onSubmitPrice}>
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
    </div>
  );
}

export default Home;
