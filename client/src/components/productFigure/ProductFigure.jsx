import "./productFigure.scss";
import productimage from "../../assets/sagproduct.jpg";
import products from "../../assets/products";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cart-store";

const ProductFigure = ({ product }) => {
  const { addItem } = useCartStore();

  const { productName, price, image, amount, id } = product;

  return (
    <div className="productFigure" key={id}>
      <div className="productFigure__container">
        <div className="productFigure__imageContainer">
          <img src={productimage} alt="sag" />
        </div>
        <p className="productFigure__title">
          {productName}
          <br />
        </p>
        <p>₪{price}</p>
      </div>
      <div className="productFigure__btnContainer">
        <Link to="/product/1" className="productFigure__btn btn">
          פרטים
        </Link>
        <button
          className="productFigure__btn btn-green"
          onClick={() => addItem({ productName, price, image, amount })}
        >
          הוסף לעגלה
        </button>
      </div>
    </div>
  );
};
export default ProductFigure;
