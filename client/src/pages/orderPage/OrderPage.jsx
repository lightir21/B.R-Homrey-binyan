import "./orderPage.scss";
import { useCartStore } from "../../store/cart-store";
import { useState } from "react";
import { axiosInstance } from "../../utils/axios";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "../../components";

const OrderPage = () => {
  const { items, totalPrice } = useCartStore();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", address: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await axiosInstance.post("/order", {
        ...form,
        items,
        totalPrice,
      });
      setSuccess(true);
      // Clear cart after successful order
      useCartStore.setState({ items: [], totalPrice: 0 });
    } catch (err) {
      setError(err.response?.data?.msg || "שגיאה בשליחת ההזמנה. נסה שנית.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="orderPage">
        <Header />
        <div className="orderPage__successWrap">
          <div className="orderPage__successCard">
            <div className="orderPage__successIcon">✓</div>
            <h2>ההזמנה נשלחה!</h2>
            <p>תודה, <strong>{form.fullName}</strong>.</p>
            <p className="orderPage__successSub">קיבלנו את ההזמנה שלך ונחזור אליך בהקדם לאישור ותשלום.</p>
            <button className="orderPage__backBtn btn-green" onClick={() => navigate("/")}>
              חזור לדף הבית
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="orderPage">
      <Header />

      <div className="orderPage__layout container">

        {/* ── Order summary sidebar ── */}
        <div className="orderPage__summary">
          <h3 className="orderPage__summary-title">סיכום הזמנה</h3>

          {items.length === 0 ? (
            <div className="orderPage__empty">
              <p>העגלה ריקה</p>
              <Link to="/" className="orderPage__emptyLink">→ המשך קנייה</Link>
            </div>
          ) : (
            <>
              <ul className="orderPage__items">
                {items.map((item) => (
                  <li key={`${item.id}-${item.selectedColor}`} className="orderPage__item">
                    <div className="orderPage__item-img">
                      {item.image
                        ? <img src={item.image} alt={item.productName} />
                        : <span>📦</span>
                      }
                    </div>
                    <div className="orderPage__item-info">
                      <p className="orderPage__item-name">{item.productName}</p>
                      {item.selectedColor && (
                        <div className="orderPage__item-color">
                          <span style={{ backgroundColor: item.selectedColor }} className="orderPage__item-colorDot" />
                          <span>{item.selectedColor}</span>
                        </div>
                      )}
                      <p className="orderPage__item-meta">
                        {item.amount} × ₪{item.price}
                      </p>
                    </div>
                    <span className="orderPage__item-total">
                      ₪{(item.price * item.amount).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="orderPage__total">
                <span>סה"כ לתשלום</span>
                <strong>₪{totalPrice.toFixed(2)}</strong>
              </div>
              <p className="orderPage__note">החיוב יבוצע בשיחה עם נציג</p>
            </>
          )}
        </div>

        {/* ── Contact form ── */}
        <div className="orderPage__formWrap">
          <h2 className="orderPage__formTitle">השאר פרטים</h2>
          <p className="orderPage__formSub">ניצור איתך קשר לאישור ותיאום</p>

          {error && <div className="orderPage__error">{error}</div>}

          <form className="orderPage__form" onSubmit={handleSubmit} noValidate>
            <div className="orderPage__field">
              <label htmlFor="fullName">שם מלא *</label>
              <input id="fullName" name="fullName" type="text"
                value={form.fullName} onChange={onChange} required placeholder="ישראל ישראלי" />
            </div>
            <div className="orderPage__field">
              <label htmlFor="email">אימייל *</label>
              <input id="email" name="email" type="email"
                value={form.email} onChange={onChange} required placeholder="israel@example.com" />
            </div>
            <div className="orderPage__field">
              <label htmlFor="phone">פלאפון *</label>
              <input id="phone" name="phone" type="tel"
                value={form.phone} onChange={onChange} required placeholder="050-0000000" />
            </div>
            <div className="orderPage__field">
              <label htmlFor="address">כתובת למשלוח</label>
              <input id="address" name="address" type="text"
                value={form.address} onChange={onChange} placeholder="רחוב, עיר" />
            </div>

            <button
              type="submit"
              className="orderPage__submitBtn btn-green"
              disabled={loading || items.length === 0}
            >
              {loading
                ? <><span className="orderPage__spinner" /> שולח...</>
                : "שלח הזמנה"}
            </button>
            {items.length === 0 && (
              <p className="orderPage__disabledNote">יש להוסיף מוצרים לפני שליחה</p>
            )}
          </form>
        </div>

      </div>
    </div>
  );
};

export default OrderPage;
