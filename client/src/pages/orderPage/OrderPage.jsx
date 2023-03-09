import "./orderPage.scss";
import { useCartStore } from "../../store/cart-store";

const OrderPage = () => {
  const { items } = useCartStore();
  return (
    <div className="orderPage">
      <h2>השאר פרטים</h2>
      <ul className="orderPage__productsList">
        <h3>ההזמנה שלך:</h3>
        {items.map((item, i) => {
          return (
            <li className="orderPage__listItem">
              <p>{i + 1}.</p>
              <p>{item.productName}</p>
              <strong>{item.amount}x</strong>
            </li>
          );
        })}
      </ul>
      <p>ההזמנות נשלחות אלינו והחיוב יבוצע בשיחה איתנו</p>
      <hr />
      <form className="orderPage__form">
        <div className="orderPage__inputBox">
          <label htmlFor="fullName">שם מלא</label>
          <input type="text" id="fullName" name="fullName" />
        </div>
        <div className="orderPage__inputBox">
          <label htmlFor="">אימייל</label>
          <input type="text" />
        </div>
        <div className="orderPage__inputBox">
          <label htmlFor="">פלאפון</label>
          <input type="text" />
        </div>
        <div className="orderPage__inputBox">
          <label htmlFor="">כתובת</label>
          <input type="text" />
        </div>
        <button className="orderPage__btn btn-green" type="submit">
          שלח הזמנה
        </button>
      </form>
    </div>
  );
};
export default OrderPage;
