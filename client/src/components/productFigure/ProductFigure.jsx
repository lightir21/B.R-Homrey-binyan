import "./productFigure.scss";
import productimage from "../../assets/sagproduct.jpg";
import { Link } from "react-router-dom";

const ProductFigure = () => {
  return (
    <div className="productFigure">
      <div className="productFigure__imageContainer">
        <img src={productimage} alt="sag" />
      </div>
      <p className="productFigure__title">נוזל רצפות sag&clean</p>
      <p>₪25.90</p>
      <Link to="/product/1" className="productFigure__btn btn">
        פרטים
      </Link>
      <button className="productFigure__btn btn-green">הוסף לעגלה</button>
    </div>
  );
};
export default ProductFigure;
