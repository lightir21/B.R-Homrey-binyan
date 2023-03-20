import "./navbar.scss";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useCartStore } from "../../store/cart-store";

const Navbar = ({ setShowCart }) => {
  const { items } = useCartStore();

  return (
    <nav className="navbar">
      <div className="navbar__container container">
        <div className="navbar__buttons">
          <Link to="/">ראשי</Link>
          <Link to="/about">אודות</Link>
          <Link to="/contactUs">צרו קשר</Link>
        </div>
        <div
          className="navbar__cart"
          onClick={() => setShowCart((prev) => !prev)}
        >
          <div className="navbar__cart-num-box">
            <span>{items.length}</span>
          </div>
          <span className="navbar__cart-text">עגלת קניות</span>
          <AiOutlineShoppingCart />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
