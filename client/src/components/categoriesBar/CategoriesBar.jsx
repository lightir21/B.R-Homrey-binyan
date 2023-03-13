import { Link } from "react-router-dom";
import categories from "../../extras/categories";
import "./catregoriesBar.scss";

const CategoriesBar = () => {
  return (
    <div className="categoriesBar container">
      {categories.map((cat) => (
        <Link
          key={cat.text}
          to={`/category/${cat.text.replaceAll(" ", "-")}`}
          className="categoriesBar__item"
        >
          {cat.text}
        </Link>
      ))}
    </div>
  );
};
export default CategoriesBar;
