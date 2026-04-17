import { useParams } from "react-router-dom";
import { Header, ProductFigure } from "../../components";
import "./categoryPage.scss";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axios";

const CategoryPage = () => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");

  const categoryName = name.replaceAll("-", " ");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(
          `/product?category=${encodeURIComponent(categoryName)}`
        );
        setProducts(data.products);
        setSorted(data.products);
      } catch (err) {
        console.error("Failed to fetch category products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [name]);

  const handleSort = (e) => {
    const val = e.target.value;
    setSortOption(val);
    const copy = [...products];
    if (val === "cheapToPricy") copy.sort((a, b) => a.price - b.price);
    else if (val === "pricyToCheap") copy.sort((a, b) => b.price - a.price);
    else setSorted(products);
    if (val) setSorted(copy);
  };

  return (
    <div className="categoryPage container">
      <Header />
      <hr />
      <div className="categoryPage__container">
        <h1>{categoryName}</h1>
        <select name="sortOptions" id="sortOptions" value={sortOption} onChange={handleSort}>
          <option value="">סידור ברירת מחדל</option>
          <option value="cheapToPricy">מיין מהזול ליקר</option>
          <option value="pricyToCheap">מיין מהיקר לזול</option>
        </select>
        <div className="categoryPage__itemsList">
          {loading ? (
            <p className="categoryPage__status">טוען...</p>
          ) : sorted.length > 0 ? (
            sorted.map((product) => (
              <ProductFigure key={product._id} product={product} />
            ))
          ) : (
            <p className="categoryPage__status">אין מוצרים בקטגוריה זו</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
