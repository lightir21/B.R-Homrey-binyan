import "./header.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import CategoriesDropdown from "../categoriesDropdown/CategoriesDropdown";
import { useWindowDimensions } from "../../utils/useWindowDimensions";
import CategoriesBar from "../categories/CategoriesBar";
import { AnimatePresence } from "framer-motion";
import { useAppStore } from "../../store/app-store";

const Header = () => {
  const { isCategoriesOpen, setIsCategoriesOpen } = useAppStore(
    (state) => state
  );
  const { isMobile } = useWindowDimensions();

  return (
    <>
      <header className="header">
        <div className="header-companyInfo">
          <p>סניף צומת גלעם: 04-8435172</p>
          <p>סניף ביאליק 3, ק.אתא: 04-6391913</p>
        </div>
        <input type="text" className="header-search" placeholder="חיפוש..." />
        <Link to="/" className="header-logo">
          <FaLeaf className="header-logo-icon" />
          ב.ר חומרי בניין
        </Link>
      </header>
      <hr />

      {/* Categories Section */}
      <section className="categories">
        {isMobile ? (
          <>
            <button
              className="categories-dropdown"
              onClick={() => setIsCategoriesOpen()}
            >
              <GiHamburgerMenu className="categories-dropdown--icon" />
              קטגוריות
            </button>

            <CategoriesDropdown />
          </>
        ) : (
          <CategoriesBar />
        )}
      </section>
    </>
  );
};
export default Header;
