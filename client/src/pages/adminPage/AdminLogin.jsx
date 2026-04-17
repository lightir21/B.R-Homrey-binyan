import { useState } from "react";
import { axiosInstance } from "../../utils/axios";
import "./adminPage.scss";

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/auth/login", { password });
      localStorage.setItem("adminToken", data.token);
      onLogin();
    } catch (err) {
      setError("סיסמה שגויה. נסה שנית.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminLogin">
      <div className="adminLogin__card">
        <h2 className="adminLogin__title">כניסת מנהל</h2>
        <p className="adminLogin__subtitle">אזור מוגן – הזן סיסמה להמשך</p>
        {error && <p className="adminLogin__error">{error}</p>}
        <form className="adminLogin__form" onSubmit={handleSubmit}>
          <input
            type="password"
            className="adminLogin__input"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          <button
            type="submit"
            className="adminLogin__btn btn-green"
            disabled={loading}
          >
            {loading ? "מתחבר..." : "כניסה"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
