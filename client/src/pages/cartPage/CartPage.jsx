import "./cartPage.scss";
import { CartFigure } from "../../components";
import { motion } from "framer-motion";
import { useCartStore } from "../../store/cart-store";
import { Link } from "react-router-dom";

const CartPage = ({ showCart, setShowCart }) => {
  const { items } = useCartStore();
  return (
    <>
      {showCart && (
        <motion.div
          className="cartPage"
          initial={{ x: "-100vw" }}
          animate={{ x: 0 }}
          exit={{ x: "-100vw" }}
          transition={{ type: "spring", mass: 0.1 }}
        >
          <h2>העגלה שלי</h2>
          <hr />

          <div className="cartPage__itemsList">
            {items.map((item, index) => {
              return <CartFigure key={item.id} item={item} index={index} />;
            })}
          </div>

          <div className="cartPage__footer">
            <hr />
            <p>
              סך הכל: <span>0₪</span>
            </p>
            <Link
              to="/order"
              className="cartPage__footer-btn btn-green"
              onClick={() => setShowCart(false)}
            >
              שלח הזמנה
            </Link>
          </div>
        </motion.div>
      )}
    </>
  );
};
export default CartPage;
