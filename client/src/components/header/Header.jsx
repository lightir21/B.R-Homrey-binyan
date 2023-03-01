import "./header.scss";
import { useState } from "react";
import { FaLeaf } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import CategoriesDropdown from "../categoriesDropdown/CategoriesDropdown";

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  return (
    <>
      <header className="header">
        <div className="header-companyInfo">
          <p>סניף צומת גלעם: 04-8435172</p>
          <p>סניף ביאליק 3, ק.אתא: 04-6391913</p>
        </div>
        <input type="text" className="header-search" placeholder="חיפוש..." />
        <div className="header-logo">
          <FaLeaf className="header-logo-icon" />
          ב.ר חומרי בניין
        </div>
      </header>
      <hr />

      {/* Categories Section */}
      <section className="categories">
        <button
          className="categories-dropdown"
          onClick={() => setIsCategoriesOpen((prev) => !prev)}
        >
          <GiHamburgerMenu className="categories-dropdown--icon" />
          קטגוריות
        </button>
        <CategoriesDropdown isCategoriesOpen={isCategoriesOpen} />
      </section>
    </>
  );
};
export default Header;
