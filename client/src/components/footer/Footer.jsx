import "./footer.scss";
import categories from "../../extras/categories";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer container">
      {categories.map((cat) => {
        return (
          <div key={cat.id}>
            <Link
              to={`/category/${cat.text.replaceAll(" ", "-")}`}
              className="footer__header"
            >
              {cat.text}
            </Link>
            {cat.subCategories !== undefined
              ? cat.subCategories.map((sub) => (
                  <Link
                    to={`/category/${sub.text.replaceAll(" ", "-")}`}
                    className="footer__subHeader"
                    key={sub.id}
                  >
                    {sub.text}
                  </Link>
                ))
              : ""}
          </div>
        );
      })}
    </div>
  );
};
export default Footer;
