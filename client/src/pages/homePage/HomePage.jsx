import "./homePage.scss";
import { useEffect, useState } from "react";
import { Header, OurServices, ProductFigure } from "../../components";
import { axiosInstance } from "../../utils/axios";

const HomePage = () => {
  const [hotProducts, setHotProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHot = async () => {
      try {
        const { data } = await axiosInstance.get("/product?hotProducts=true");
        setHotProducts(data.products);
      } catch (err) {
        console.error("Failed to load hot products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHot();
  }, []);

  return (
    <div className="homePage">
      <Header />
      <section className="homePage__hero">
        <h1>
          שירות ואמינות
          <br /> זאת הדרך שלנו
        </h1>
      </section>

      <section className="homePage__hotProducts container">
        <h3 className="homePage__subTitles">מוצרים חמים</h3>
        <hr />
        <div className="homePage__hotProducts-container">
          {loading ? (
            <p className="homePage__loading">טוען מוצרים...</p>
          ) : hotProducts.length > 0 ? (
            hotProducts.map((product) => (
              <ProductFigure key={product._id} product={product} />
            ))
          ) : (
            <p className="homePage__empty">אין מוצרים חמים כרגע</p>
          )}
        </div>
        <hr />
      </section>

      <section className="homePage__services container">
        <h3 className="homePage__subTitles">השירותים שלנו</h3>
        <OurServices />
      </section>
    </div>
  );
};

export default HomePage;
