import "./homePage.scss";
import { FaLeaf } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  CategoriesDropdown,
  OurServices,
  ProductFigure,
} from "../../components";
import { useState } from "react";
const HomePage = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <div className="homePage">
      {/* Header Section */}
      <header className="homePage__header">
        <div className="homePage__header-companyInfo">
          <p>סניף צומת גלעם: 04-8435172</p>
          <p>סניף ביאליק 3, ק.אתא: 04-6391913</p>
        </div>
        <input type="text" className="homePage__header-search" />
        <div className="homePage__header-logo">
          <FaLeaf className="homePage__header-logo-icon" />
          ב.ר חומרי בניין
        </div>
      </header>
      <hr />

      {/* Categories Section */}
      <section className="homePage__categories">
        <button
          className="homePage__categories-dropdown"
          onClick={() => setIsCategoriesOpen((prev) => !prev)}
        >
          <GiHamburgerMenu className="homePage__categories-dropdown--icon" />
          קטגוריות
        </button>
        <CategoriesDropdown isCategoriesOpen={isCategoriesOpen} />
      </section>

      <section className="homePage__hero">
        <h1>
          שירות ואמינות
          <br /> זאת הדרך שלנו
        </h1>
      </section>

      <section className="homePage__hotProducts">
        <h3 className="homePage__subTitles">מוצרים חמים</h3>
        <hr />
        <ProductFigure />
        <ProductFigure />
        <ProductFigure />
        <ProductFigure />
        <ProductFigure />
        <hr />
        <h3 className="homePage__subTitles">השירותים שלנו</h3>
        <OurServices />
      </section>
    </div>
  );
};
export default HomePage;
