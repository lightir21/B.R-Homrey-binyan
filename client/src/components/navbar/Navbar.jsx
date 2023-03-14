import "./navbar.scss";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Navbar = ({ setShowCart }) => {
  return (
    <nav className="navbar">
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
          <span>0</span>
        </div>
        <span className="navbar__cart-text">עגלת קניות</span>
        <AiOutlineShoppingCart />
      </div>
    </nav>
  );
};
export default Navbar;
