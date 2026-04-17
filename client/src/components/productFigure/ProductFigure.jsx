import "./productFigure.scss";
import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cart-store";

const ProductFigure = ({ product }) => {
  const { addItem } = useCartStore();
  const { _id, productName, price, image, colors } = product;

  return (
    <div className="productFigure">
      <div className="productFigure__container">
        <div className="productFigure__imageContainer">
          {image ? (
            <img src={image} alt={productName} />
          ) : (
            <div className="productFigure__imagePlaceholder" />
          )}
        </div>
        {colors?.length > 0 && (
          <div className="productFigure__colors">
            {colors.slice(0, 5).map((color) => (
              <span
                key={color}
                className="productFigure__colorDot"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
            {colors.length > 5 && (
              <span className="productFigure__colorMore">+{colors.length - 5}</span>
            )}
          </div>
        )}
        <p className="productFigure__title">{productName}</p>
        <p>₪{price}</p>
      </div>
      <div className="productFigure__btnContainer">
        <Link to={`/product/${_id}`} className="productFigure__btn btn">
          פרטים
        </Link>
        <button
          className="productFigure__btn btn-green"
          onClick={() =>
            addItem({
              id: _id,
              productName,
              price,
              image,
              amount: 1,
              selectedColor: colors?.length > 0 ? colors[0] : null,
            })
          }
        >
          הוסף לעגלה
        </button>
      </div>
    </div>
  );
};

export default ProductFigure;
