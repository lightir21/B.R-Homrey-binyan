import "./cartFigure.scss";
import products from "../../assets/products";
import { AiOutlineClose } from "react-icons/ai";
import sagProduct from "../../assets/sagproduct.jpg";
import { useCartStore } from "../../store/cart-store";
import { useEffect, useState } from "react";

const CartFigure = ({ item, index }) => {
  const { id, productName, price, subHeading, advantagesList, image, amount } =
    item;

  const [amountState, setAmountState] = useState(amount);

  const { updateItemAmount, deleteItem } = useCartStore();

  useEffect(() => {
    updateItemAmount(index, amountState);
  }, [amountState]);

  return (
    <div className="cartFigure" key={id}>
      <div className="cartFigure__img-box">
        <img src={sagProduct} alt={productName} />
      </div>
      <div className="cartFigure__details">
        <h3>{productName}</h3>
        <div className="cartFigure__details-priceBox">
          <p className="cartFigure__details-price">
            מחיר: <span>{price}₪</span>
          </p>
          <p>
            כמות:
            <input
              type="number"
              value={amountState}
              onChange={(e) => setAmountState(e.target.value)}
            />
          </p>
        </div>
      </div>
      <AiOutlineClose
        className="cartFigure__delete"
        onClick={() => deleteItem(id)}
      />
    </div>
  );
};
export default CartFigure;
