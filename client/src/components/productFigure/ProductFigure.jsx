import "./productFigure.scss";
import productimage from "../../assets/sagproduct.jpg";
const ProductFigure = () => {
  return (
    <div className="productFigure">
      <div className="productFigure__imageContainer">
        <img src={productimage} alt="sag" />
      </div>
      <p className="productFigure__title">נוזל רצפות sag&clean</p>
      <p>₪25.90</p>
      <button className="productFigure__btn btn">פרטים</button>
      <button className="productFigure__btn btn-green">הוסף לעגלה</button>
    </div>
  );
};
export default ProductFigure;
