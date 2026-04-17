import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineSearch } from "react-icons/ai";
import CategoriesDropdown from "../categoriesDropdown/CategoriesDropdown";
import { useWindowDimensions } from "../../utils/useWindowDimensions";
import CategoriesBar from "../categoriesBar/CategoriesBar";
import { useAppStore } from "../../store/app-store";
import { axiosInstance } from "../../utils/axios";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const { isCategoriesOpen, setIsCategoriesOpen } = useAppStore((s) => s);
  const { isMobile } = useWindowDimensions();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    if (!val.trim()) { setSuggestions([]); setOpen(false); return; }
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/product?search=${encodeURIComponent(val.trim())}`
        );
        setSuggestions(data.products.slice(0, 8));
        setOpen(true);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 260);
  };

  const handleSelect = (product) => {
    setQuery("");
    setSuggestions([]);
    setOpen(false);
    navigate(`/product/${product._id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setOpen(false);
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  // Highlight matched letters in suggestion
  const highlight = (text, q) => {
    if (!q) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(regex);
    return parts.map((p, i) =>
      regex.test(p)
        ? <mark key={i} className="header-search__highlight">{p}</mark>
        : p
    );
  };

  return (
    <>
      <header className="header container">
        <div className="header-companyInfo">
          <p>סניף צומת גלעם: 04-8435172</p>
          <p>סניף ביאליק 3, ק.אתא: 04-6391913</p>
        </div>

        {/* Search with live suggestions */}
        <div className="header-search__wrap" ref={wrapperRef}>
          <form className="header-search__form" onSubmit={handleSubmit}>
            <AiOutlineSearch className="header-search__icon" />
            <input
              type="text"
              className="header-search"
              placeholder="חיפוש מוצרים..."
              value={query}
              onChange={handleChange}
              onFocus={() => suggestions.length > 0 && setOpen(true)}
              autoComplete="off"
            />
          </form>

          {open && (
            <ul className="header-search__dropdown">
              {loading && (
                <li className="header-search__dropdown-loading">מחפש...</li>
              )}
              {!loading && suggestions.length === 0 && (
                <li className="header-search__dropdown-empty">לא נמצאו תוצאות</li>
              )}
              {!loading && suggestions.map((p) => (
                <li
                  key={p._id}
                  className="header-search__dropdown-item"
                  onMouseDown={() => handleSelect(p)}
                >
                  <div className="header-search__dropdown-img">
                    {p.image
                      ? <img src={p.image} alt={p.productName} />
                      : <span>📦</span>
                    }
                  </div>
                  <div className="header-search__dropdown-info">
                    <span className="header-search__dropdown-name">
                      {highlight(p.productName, query)}
                    </span>
                    <span className="header-search__dropdown-meta">
                      {p.sku && <span className="header-search__dropdown-sku">{p.sku}</span>}
                      <span className="header-search__dropdown-price">₪{p.price}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <Link to="/" className="header-logo">
          <FaLeaf className="header-logo-icon" />
          ב.ר חומרי בניין
        </Link>
      </header>
      <hr />

      <section className="categories">
        {isMobile ? (
          <>
            <button className="categories-dropdown" onClick={() => setIsCategoriesOpen()}>
              <GiHamburgerMenu className="categories-dropdown--icon" />
              קטגוריות
            </button>
            <CategoriesDropdown />
          </>
        ) : (
          <CategoriesBar />
        )}
      </section>
    </>
  );
};

export default Header;
