import "./card.scss";
import { Button, Icon } from "semantic-ui-react";
import React from "react";
import { useHistory } from "react-router-dom";

const Card = (props) => {
  const history = useHistory();
  const item = props.product;
  const moveToDetail = () =>{
    history.push('/productDetail')
  }
  return (
    <div className="card-container" onClick={moveToDetail} key={item.id}>
      <img className="image" src={item.images[0]} />
      <h4 className="name">{item.name}</h4>
      <p className="email d-flex"> Hãng:{" "} <span className="ml-1 text-success font-weight-bold">{item.brand}</span> </p>
      <p className="email d-flex name"> Chip xử lý:{" "}<span className="ml-1 text-success font-weight-bold ">{item.cpu}</span></p>
      <p className="email d-flex">Price:{" "} <span className="ml-1 text-success font-weight-bold"> {item.price} VND</span></p>
      {/* <button onClick={() => { }} className="btn-success">
            Mua ngay
          </button> */}
      <Button onClick={moveToDetail} className="custom-btn btn-3">
        <span>
          <Icon name="eye" /> Xem sản phẩm
        </span>
      </Button>
    </div>
  );
};

export default Card;
