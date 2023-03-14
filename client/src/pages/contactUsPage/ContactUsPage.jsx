import "./contactUsPage.scss";
import image from "../../assets/nico-baum-jr0GS51wwyE-unsplash.webp";

const ContactUsPage = () => {
  return (
    <div className="contactUs container">
      <div
        className="contactUs__container"
        style={{ backgroundImage: `url(${image})` }}
      >
        <h1>צרו איתנו קשר</h1>
        <form className="contactUs__form">
          <input type="text" placeholder="שם מלא" />
          <input type="text" placeholder="אימייל" />
          <input type="text" placeholder="מ'ס פלאפון" />
          <textarea
            type="text"
            placeholder="איך נוכל לעזור?"
            style={{ resize: "none" }}
          />
        </form>
      </div>
    </div>
  );
};
export default ContactUsPage;
