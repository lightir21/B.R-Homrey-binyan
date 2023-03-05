import "./cartFigure.scss";
import products from "../../assets/products";
import { AiOutlineClose } from "react-icons/ai";
import sagProduct from "../../assets/sagproduct.jpg";

const CartFigure = () => {
  const { id, productName, price, subHeading, advantagesList, image } =
    products[0];

  return (
    <div className="cartFigure">
      <div className="cartFigure__img-box">
        <img src={sagProduct} alt={productName} />
      </div>
      <div className="cartFigure__details">
        <h3>{productName}</h3>
        <p className="cartFigure__details-price">
          מחיר: <span>{price}</span>
        </p>
        <p>
          כמות: <input type="number" />
        </p>
      </div>
      <AiOutlineClose className="cartFigure__delete" />
    </div>
  );
};
export default CartFigure;
