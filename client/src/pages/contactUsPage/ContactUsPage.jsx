import "./contactUsPage.scss";

const ContactUsPage = () => {
  return (
    <div className="contactUs">
      <div className="contactUs__container">
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
