import "./homePage.scss";
import products from "../../assets/products";

import { Header, OurServices, ProductFigure } from "../../components";
const HomePage = () => {
  return (
    <div className="homePage">
      {/* Header Section */}
      <Header />
      <section className="homePage__hero">
        <h1>
          שירות ואמינות
          <br /> זאת הדרך שלנו
        </h1>
      </section>

      <section className="homePage__hotProducts">
        <h3 className="homePage__subTitles">מוצרים חמים</h3>
        <hr />
        <div className="homePage__hotProducts-container">
          {products.map((product) => (
            <ProductFigure key={product.id} product={product} />
          ))}
        </div>
        <hr />
      </section>

      <section className="homePage__services">
        <h3 className="homePage__subTitles">השירותים שלנו</h3>
        <OurServices />
      </section>
    </div>
  );
};
export default HomePage;
