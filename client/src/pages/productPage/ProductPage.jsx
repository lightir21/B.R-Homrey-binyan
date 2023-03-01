import { Header } from "../../components";
import "./productPage.scss";
import productimage from "../../assets/sagproduct.jpg";
import products from "../../assets/products";

const ProductPage = () => {
  const { id, productName, price, subHeading, advantagesList, image } =
    products[0];

  return (
    <div className="productPage">
      <Header />
      <h1 className="productPage__heading">{productName}</h1>
      <div className="productPage__container">
        {/* description */}
        <div className="productPage__description">
          <h4 className="productPage__subHeading">{subHeading}</h4>
          <ul className="productPage__list">
            {advantagesList.map((item) => {
              return <li className="productPage__list-item">{item}</li>;
            })}
          </ul>
          <hr />
          <div className="productPage__details">
            <p>מחיר: {price}₪</p>
            <div className="productPage__details-amount">
              <p>
                כמות: <input type="number" />
              </p>
            </div>
          </div>
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
