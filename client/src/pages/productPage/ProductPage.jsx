import "./productPage.scss";
import { Header } from "../../components";
import { useCartStore } from "../../store/cart-store";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axios";
import { AiOutlineShoppingCart, AiOutlineCheck } from "react-icons/ai";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [added, setAdded] = useState(false);

  const { addItem } = useCartStore();

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axiosInstance.get(`/product/${id}`);
        setProduct(data.product);
        if (data.product.colors?.length > 0) setSelectedColor(data.product.colors[0]);
      } catch {
        setError("לא הצלחנו לטעון את המוצר. נסה שנית.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  const handleAdd = () => {
    if (!product) return;
    addItem({ id: product._id, productName: product.productName, price: product.price,
      image: product.image, amount, selectedColor });
    setAmount(1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  if (loading) return (
    <div className="productPage">
      <Header />
      <div className="productPage__skeleton container">
        <div className="productPage__skeleton-img" />
        <div className="productPage__skeleton-text">
          <div className="productPage__skeleton-line productPage__skeleton-line--title" />
          <div className="productPage__skeleton-line" />
          <div className="productPage__skeleton-line productPage__skeleton-line--short" />
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="productPage">
      <Header />
      <div className="productPage__error container">
        <span>😕</span><p>{error}</p>
        <Link to="/" className="btn-green productPage__errorBtn">חזור לדף הבית</Link>
      </div>
    </div>
  );

  if (!product) return null;

  const { productName, price, subTitle, advantagesList, image, colors, sku, category } = product;
  const isLight = (hex) => {
    if (!hex.startsWith("#")) return false;
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return (r * 299 + g * 587 + b * 114) / 1000 > 180;
  };

  return (
    <div className="productPage">
      <Header />

      {/* Breadcrumb */}
      <div className="productPage__breadcrumb container">
        <Link to="/">ראשי</Link>
        <span>›</span>
        <Link to={`/category/${category?.replaceAll(" ", "-")}`}>{category}</Link>
        <span>›</span>
        <span>{productName}</span>
      </div>

      <div className="productPage__layout container">

        {/* ── Image panel ───────────────────────────────────────────────── */}
        <div className="productPage__imagePanel">
          <div className="productPage__imageWrap">
            {image
              ? <img src={image} alt={productName} className="productPage__img" />
              : <div className="productPage__imgPlaceholder">📦</div>
            }
          </div>
        </div>

        {/* ── Info panel ────────────────────────────────────────────────── */}
        <div className="productPage__infoPanel">

          {/* SKU badge */}
          {sku && <span className="productPage__sku">מק"ט: {sku}</span>}

          <h1 className="productPage__title">{productName}</h1>
          {subTitle && <p className="productPage__subtitle">{subTitle}</p>}

          {/* Price */}
          <div className="productPage__priceBlock">
            <span className="productPage__price">₪{price.toFixed(2)}</span>
          </div>

          <hr className="productPage__divider" />

          {/* Advantages */}
          {advantagesList?.length > 0 && (
            <ul className="productPage__features">
              {advantagesList.map((item, i) => (
                <li key={i} className="productPage__feature">
                  <span className="productPage__feature-check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          )}

          {/* Color picker */}
          {colors?.length > 0 && (
            <div className="productPage__colors">
              <p className="productPage__colors-label">
                צבע: <strong>{selectedColor}</strong>
              </p>
              <div className="productPage__colors-row">
                {colors.map((c) => (
                  <button
                    key={c}
                    className={`productPage__swatch ${selectedColor === c ? "productPage__swatch--active" : ""}`}
                    style={{ backgroundColor: c,
                      borderColor: selectedColor === c ? (isLight(c) ? "#333" : c) : "#ddd" }}
                    onClick={() => setSelectedColor(c)}
                    title={c}
                  >
                    {selectedColor === c && (
                      <span style={{ color: isLight(c) ? "#333" : "#fff", fontSize: "0.8rem" }}>✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity + CTA */}
          <div className="productPage__purchase">
            <div className="productPage__qty">
              <button className="productPage__qty-btn"
                onClick={() => setAmount((a) => Math.max(1, a - 1))}>−</button>
              <input type="number" min="1" value={amount}
                onChange={(e) => setAmount(Math.max(1, Number(e.target.value)))}
                className="productPage__qty-input" />
              <button className="productPage__qty-btn"
                onClick={() => setAmount((a) => a + 1)}>+</button>
            </div>

            <button
              className={`productPage__addBtn ${added ? "productPage__addBtn--added" : ""}`}
              onClick={handleAdd}
            >
              {added
                ? <><AiOutlineCheck /> נוסף לעגלה</>
                : <><AiOutlineShoppingCart /> הוסף לעגלה</>
              }
            </button>
          </div>

          {/* Meta row */}
          <div className="productPage__meta">
            <span>קטגוריה: <Link to={`/category/${category?.replaceAll(" ", "-")}`}>{category}</Link></span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductPage;
