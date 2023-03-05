import "./cartPage.scss";
import { CartFigure } from "../../components";
import { motion, AnimatePresence } from "framer-motion";

const CartPage = ({ showCart }) => {
  return (
    <AnimatePresence>
      {showCart && (
        <motion.div className="cartPage">
          <h2>העגלה שלך</h2>

          <div className="cartPage__itemsList">
            <CartFigure />
          </div>
          <div className="cartPage__footer">
            <hr />
            <p>
              סך הכל: <span>0</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default CartPage;
