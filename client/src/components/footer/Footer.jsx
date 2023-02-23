import "./footer.scss";
import categories from "../../extras/categories";

const Footer = () => {
  return (
    <div className="footer">
      {categories.map((cat) => {
        return (
          <div key={cat.id}>
            <h4>{cat.text}</h4>
            {cat.subCategories !== undefined
              ? cat.subCategories.map((sub) => <p key={sub.id}>{sub.text}</p>)
              : ""}
          </div>
        );
      })}
    </div>
  );
};
export default Footer;
