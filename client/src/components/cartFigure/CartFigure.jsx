import "./cartFigure.scss";
import { AiOutlineClose } from "react-icons/ai";
import { useCartStore } from "../../store/cart-store";
import { useEffect, useState } from "react";

const CartFigure = ({ item, index }) => {
  const { id, productName, price, image, amount, selectedColor } = item;
  const [amountState, setAmountState] = useState(amount);
  const { updateItemAmount, deleteItem, setTotalPrice, items } = useCartStore();

  useEffect(() => {
    if (amountState < 1) return;
    updateItemAmount(index, amountState);
    const total = items.reduce((acc, curr) => acc + curr.price * curr.amount, 0);
    setTotalPrice(total);
  }, [amountState]);

  return (
    <div className="cartFigure" key={`${id}-${selectedColor}`}>
      <div className="cartFigure__img-box">
        {image ? (
          <img src={image} alt={productName} />
        ) : (
          <div className="cartFigure__img-placeholder" />
        )}
      </div>
      <div className="cartFigure__details">
        <h3>{productName}</h3>
        {selectedColor && (
          <div className="cartFigure__color">
            <span
              className="cartFigure__color-dot"
              style={{ backgroundColor: selectedColor }}
            />
            <span>{selectedColor}</span>
          </div>
        )}
        <div className="cartFigure__details-priceBox">
          <p className="cartFigure__details-price">
            מחיר: <span>{price}₪</span>
          </p>
          <p>
            כמות:
            <input
              type="number"
              min="1"
              value={amountState}
              onChange={(e) => setAmountState(Math.max(1, Number(e.target.value)))}
            />
          </p>
        </div>
      </div>
      <AiOutlineClose
        className="cartFigure__delete"
        onClick={() => deleteItem(id, selectedColor)}
      />
    </div>
  );
};

export default CartFigure;
