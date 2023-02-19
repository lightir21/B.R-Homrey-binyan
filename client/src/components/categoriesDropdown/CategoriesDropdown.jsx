import "./categoriesDropdown.scss";
import categories from "../../extras/categories";
const CategoriesDropdown = ({ isCategoriesOpen }) => {
  return (
    <ul
      className={
        isCategoriesOpen ? "categoriesDropdown active" : "categoriesDropdown"
      }
    >
      {categories.map((cat) => {
        return (
          <li className="categoriesDropdown__item" key={cat.id}>
            {cat.text}
          </li>
        );
      })}
    </ul>
  );
};
export default CategoriesDropdown;
