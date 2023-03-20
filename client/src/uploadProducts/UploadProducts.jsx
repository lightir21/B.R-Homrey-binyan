import { useState } from "react";
import { axiosInstance } from "../utils/axios";

const UploadProducts = () => {
  const [product, setProduct] = useState({
    productName: "",
    category: "",
    price: "",
    subHeading: "",
    advantagesList: [],
    image: "",
    hotProducts: false,
  });

  const onChange = (e) => {
    const { name, value } = e.target;

    setProduct({ ...product, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post("/product", {
      ...product,
    });
  };

  return (
    <div>
      <form
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          margin: "2rem 5rem",
        }}
        onSubmit={onSubmit}
      >
        <div className="inputBox">
          <label htmlFor="productName">product name</label>
          <input onChange={onChange} type="text" name="productName" />
        </div>

        <div className="inputBox">
          <label htmlFor="category">category</label>
          <select onChange={onChange} name="category" id="category">
            <option value="ציוד טכני">ציוד טכני</option>
            <option value="אביזרי חשמל">אביזרי חשמל</option>
            <option value="תאורה">תאורה</option>
            <option value="גינה">גינה</option>
            <option value="קרניזים">קרניזים</option>
            <option value="אביזרים לבית">אביזרים לבית</option>
            <option value="אביזרים למקלחת">אביזרים למקלחת</option>
            <option value="צבע וציוד נלווה">צבע וציוד נלווה</option>
            <option value="מוצרי ניקוי">מוצרי ניקוי</option>
            <option value="כלי עבודה">כלי עבודה</option>
          </select>
        </div>

        <div className="inputBox">
          <label htmlFor="subCategory">Sub category</label>
        </div>

        <div className="inputBox">
          <label htmlFor="price">price</label>
          <input onChange={onChange} type="number" step="0.01" name="price" />
        </div>

        <div className="inputBox">
          <label htmlFor="subHeading">sub heading</label>
          <input onChange={onChange} type="text" name="subHeading" />
        </div>

        <div className="inputBox">
          <label htmlFor="advantagesList">Advantages List</label>
          <textarea onChange={onChange} type="text" name="advantagesList" />
        </div>

        <div className="inputBox">
          <label htmlFor="image">image</label>
          <input onChange={onChange} type="file" name="image" />
        </div>

        <div className="inputBox">
          <label htmlFor="productName">Hot products</label>
          <select onChange={onChange} name="hotProducts" id="hotProducts">
            <option value="false">False</option>
            <option value="true">true</option>
          </select>
        </div>
        <button>send</button>
      </form>
    </div>
  );
};
export default UploadProducts;
