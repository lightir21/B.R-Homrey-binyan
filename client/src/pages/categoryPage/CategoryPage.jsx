import { useParams } from "react-router-dom";
import { Header, ProductFigure } from "../../components";
import "./categoryPage.scss";
const CategoryPage = () => {
  const { name } = useParams();

  return (
    <div className="categoryPage">
      <Header />
      <div className="categoryPage__container">
        <h1>{name.replaceAll("-", " ")}</h1>
        <select name="sortOptions" id="sortOptions">
          <option value="">סידור ברירת מחדל</option>
          <option value="cheapToPricy">מיין מהזול ליקר</option>
          <option value="cheapToPricy">מיין מהיקר לזול</option>
        </select>
        <div className="categoryPage__itemsList">
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
          <ProductFigure />
        </div>
      </div>
    </div>
  );
};
export default CategoryPage;