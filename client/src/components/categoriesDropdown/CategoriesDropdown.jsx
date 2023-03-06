import "./categoriesDropdown.scss";
import categories from "../../extras/categories";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAppStore } from "../../store/app-store";

const CategoriesDropdown = () => {
  const { isCategoriesOpen, setIsCategoriesOpen } = useAppStore(
    (state) => state
  );
  return (
    <AnimatePresence>
      {isCategoriesOpen && (
        <motion.ul
          key="modal"
          className="categoriesDropdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {categories.map((cat) => (
            <Link
              key={cat.text}
              to={`/category/${cat.text.replaceAll(" ", "-")}`}
              className="categoriesDropdown__item"
              onClick={setIsCategoriesOpen}
            >
              {cat.text}
            </Link>
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};

export default CategoriesDropdown;
