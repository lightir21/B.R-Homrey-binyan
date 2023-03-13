import { Header } from "../../components";
import "./productPage.scss";
import productimage from "../../assets/sagproduct.jpg";
import products from "../../assets/products";
import { useCartStore } from "../../store/cart-store";
import { useState } from "react";

const ProductPage = () => {
  const { id, productName, price, subHeading, advantagesList, image, amount } =
    products[0];

  const [amountState, setAmountState] = useState(1);

  const { addItem } = useCartStore();

  return (
    <div className="productPage container">
      <Header />
      <hr />
      <h1 className="productPage__heading">{productName}</h1>
      <div className="productPage__container">
        {/* description */}
        <div className="productPage__description">
          <h4 className="productPage__subHeading">{subHeading}</h4>
          <ul className="productPage__list">
            {advantagesList.map((item, i) => {
              return (
                <li key={i} className="productPage__list-item">
                  {item}
                </li>
              );
            })}
          </ul>
          <hr />
          <div className="productPage__details">
            <p>מחיר: {price}₪</p>
            <div className="productPage__details-amount">
              <p>
                כמות:{" "}
                <input
                  type="number"
                  value={amountState}
                  onChange={(e) => setAmountState(e.target.value)}
                />
              </p>
            </div>
          </div>
          <button
            className="productPage__btn btn-green"
            onClick={() => {
              addItem({ productName, price, image, amount: amountState, id });
              setAmountState(1);
            }}
          >
            הוסף לעגלה
          </button>
        </div>
        {/* image */}
        <div className="productPage__image">
          <img src={productimage} alt={productName} />
        </div>
      </div>
    </div>
  );
};
export default ProductPage;
