import "./footer.scss";
import categories from "../../extras/categories";

const Footer = () => {
  return (
    <div className="footer">
      {categories.map((cat) => {
        console.log(cat);
        return (
          <div>
            <h4>{cat.text}</h4>
            {cat.subCategories !== undefined
              ? cat.subCategories.map((sub) => <p>{sub.text}</p>)
              : ""}
          </div>
        );
      })}
    </div>
  );
};
export default Footer;
