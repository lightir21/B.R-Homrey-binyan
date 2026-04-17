import { useState, useCallback } from "react";
import { axiosInstance } from "../../utils/axios";
import "./adminPage.scss";

const CATEGORIES = [
  "ציוד טכני","אביזרי חשמל","תאורה","גינה","קרניזים",
  "אביזרים לבית","אביזרים למקלחת","צבע וציוד נלווה",
  "מוצרי ניקוי","כלי עבודה","מבצעים",
];

const EMPTY_FORM = {
  sku: "", productName: "", category: CATEGORIES[0], subCategory: "",
  price: "", subTitle: "", advantagesList: "", image: "",
  colors: "", hotProducts: "false",
};

// ─── Reusable ProductForm ──────────────────────────────────────────────────────
const ProductForm = ({ initial, onSubmit, submitLabel, loading, onCancel }) => {
  const [form, setForm] = useState(initial);
  const [colorInput, setColorInput] = useState("");
  const [colorList, setColorList] = useState(
    Array.isArray(initial.colors) ? initial.colors : []
  );
  const [imageUploading, setImageUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const addColor = () => {
    const t = colorInput.trim();
    if (!t || colorList.includes(t)) return;
    setColorList((p) => [...p, t]);
    setColorInput("");
  };
  const removeColor = (c) => setColorList((p) => p.filter((x) => x !== c));

  // ── Cloudinary direct upload ──────────────────────────────────────────────
  const uploadFile = useCallback(async (file) => {
    if (!file) return;
    const validTypes = ["image/jpeg","image/png","image/webp","image/gif"];
    if (!validTypes.includes(file.type)) {
      setUploadError("קובץ לא תקין. יש להעלות jpg / png / webp");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("הקובץ גדול מדי (מקסימום 10MB)");
      return;
    }
    setUploadError("");
    setImageUploading(true);
    try {
      // 1. Get signed params from our server
      const { data: sig } = await axiosInstance.get("/upload/signature");
      // 2. Upload directly to Cloudinary (file never hits our server)
      const fd = new FormData();
      fd.append("file", file);
      fd.append("api_key", sig.apiKey);
      fd.append("timestamp", sig.timestamp);
      fd.append("signature", sig.signature);
      fd.append("folder", sig.folder);
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
        { method: "POST", body: fd }
      );
      if (!res.ok) throw new Error("Upload failed");
      const json = await res.json();
      setForm((p) => ({ ...p, image: json.secure_url }));
    } catch (err) {
      setUploadError("שגיאה בהעלאת התמונה. נסה שנית.");
    } finally {
      setImageUploading(false);
    }
  }, []);

  const handleFilePick = (e) => uploadFile(e.target.files[0]);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    uploadFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      price: Number(form.price),
      hotProducts: form.hotProducts === "true",
      colors: colorList,
    });
  };

  return (
    <form className="adminPanel__form" onSubmit={handleSubmit}>
      <h3 className="adminPanel__sectionTitle">פרטי מוצר</h3>

      <div className="adminPanel__row">
        <div className="adminPanel__field">
          <label>מק"ט (SKU)</label>
          <input type="text" name="sku" value={form.sku} onChange={onChange}
            placeholder="נוצר אוטומטית אם ריק (BR-000001)" />
          <small>השאר ריק ליצירה אוטומטית</small>
        </div>
        <div className="adminPanel__field">
          <label>מחיר (₪) *</label>
          <input type="number" name="price" value={form.price} onChange={onChange}
            required min="0" step="0.01" placeholder="0.00" />
        </div>
      </div>

      <div className="adminPanel__field">
        <label>שם מוצר *</label>
        <input type="text" name="productName" value={form.productName}
          onChange={onChange} required placeholder="שם המוצר" />
      </div>

      <div className="adminPanel__row">
        <div className="adminPanel__field">
          <label>קטגוריה *</label>
          <select name="category" value={form.category} onChange={onChange}>
            {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="adminPanel__field">
          <label>תת-קטגוריה</label>
          <input type="text" name="subCategory" value={form.subCategory}
            onChange={onChange} placeholder="לדוגמה: מקדחות" />
        </div>
      </div>

      <div className="adminPanel__field">
        <label>כותרת משנה</label>
        <input type="text" name="subTitle" value={form.subTitle}
          onChange={onChange} placeholder="תיאור קצר של המוצר" />
      </div>

      <div className="adminPanel__field">
        <label>רשימת יתרונות</label>
        <textarea name="advantagesList" value={
          Array.isArray(form.advantagesList)
            ? form.advantagesList.join(", ")
            : form.advantagesList
        } onChange={onChange} rows={4}
          placeholder="יתרון 1, יתרון 2, יתרון 3 (מופרד בפסיקים)" />
        <small>הפרד בין יתרונות בפסיק</small>
      </div>

      {/* ── Image Upload ─────────────────────────────────────────────────── */}
      <div className="adminPanel__field">
        <label>תמונת מוצר</label>
        <div
          className={`adminPanel__dropZone ${dragOver ? "adminPanel__dropZone--over" : ""} ${imageUploading ? "adminPanel__dropZone--loading" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => document.getElementById("fileInput").click()}
        >
          {imageUploading ? (
            <div className="adminPanel__dropZone-spinner" />
          ) : form.image ? (
            <img src={form.image} alt="תצוגה מקדימה" className="adminPanel__dropZone-preview" />
          ) : (
            <div className="adminPanel__dropZone-placeholder">
              <span className="adminPanel__dropZone-icon">📷</span>
              <p>גרור תמונה לכאן או לחץ לבחירה</p>
              <small>jpg, png, webp — עד 10MB</small>
            </div>
          )}
        </div>
        <input id="fileInput" type="file" accept="image/*"
          style={{ display: "none" }} onChange={handleFilePick} />
        {form.image && (
          <div className="adminPanel__imageActions">
            <input type="url" name="image" value={form.image} onChange={onChange}
              placeholder="או הדבק URL ישירות" className="adminPanel__imageUrl" />
            <button type="button" className="adminPanel__clearImage"
              onClick={() => setForm((p) => ({ ...p, image: "" }))}>הסר תמונה</button>
          </div>
        )}
        {uploadError && <small className="adminPanel__uploadError">{uploadError}</small>}
      </div>

      {/* ── Colors ──────────────────────────────────────────────────────── */}
      <div className="adminPanel__field">
        <label>צבעים זמינים</label>
        <div className="adminPanel__colorPicker">
          <input type="color"
            value={colorInput.startsWith("#") ? colorInput : "#48ac25"}
            onChange={(e) => setColorInput(e.target.value)}
            className="adminPanel__colorWheel" title="בחר צבע" />
          <input type="text" value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            placeholder="#ff0000 או red" className="adminPanel__colorText"
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addColor())} />
          <button type="button" className="adminPanel__colorAdd btn-green" onClick={addColor}>
            הוסף
          </button>
        </div>
        {colorList.length > 0 && (
          <div className="adminPanel__colorList">
            {colorList.map((color) => (
              <div key={color} className="adminPanel__colorChip">
                <span className="adminPanel__colorChip-dot" style={{ backgroundColor: color }} />
                <span className="adminPanel__colorChip-name">{color}</span>
                <button type="button" className="adminPanel__colorChip-remove"
                  onClick={() => removeColor(color)}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="adminPanel__field adminPanel__field--inline">
        <label>מוצר חם?</label>
        <select name="hotProducts" value={form.hotProducts} onChange={onChange}>
          <option value="false">לא</option>
          <option value="true">כן</option>
        </select>
      </div>

      <div className="adminPanel__formActions">
        {onCancel && (
          <button type="button" className="adminPanel__cancelBtn" onClick={onCancel}>
            ביטול
          </button>
        )}
        <button type="submit" className="adminPanel__submit btn-green" disabled={loading}>
          {loading ? "שומר..." : submitLabel}
        </button>
      </div>
    </form>
  );
};

// ─── Search & Edit Section ─────────────────────────────────────────────────────
const EditSection = ({ onLogout }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    setStatus(null);
    try {
      const { data } = await axiosInstance.get(`/product?search=${encodeURIComponent(query)}`);
      setResults(data.products);
      if (data.products.length === 0) setStatus({ type: "info", msg: "לא נמצאו מוצרים" });
    } catch {
      setStatus({ type: "error", msg: "שגיאה בחיפוש" });
    } finally {
      setSearching(false);
    }
  };

  const handleSave = async (formData) => {
    setSaving(true);
    setStatus(null);
    try {
      const { data } = await axiosInstance.patch(`/product/${editingProduct._id}`, formData);
      setStatus({ type: "success", msg: "המוצר עודכן בהצלחה!" });
      setResults((prev) => prev.map((p) => p._id === editingProduct._id ? data.product : p));
      setEditingProduct(null);
    } catch (err) {
      const msg = err.response?.data?.msg || "שגיאה בשמירה";
      if (err.response?.status === 401) { setStatus({ type: "error", msg: "פג תוקף. התחבר מחדש." }); setTimeout(onLogout, 1500); }
      else setStatus({ type: "error", msg });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/product/${id}`);
      setResults((prev) => prev.filter((p) => p._id !== id));
      setDeleteConfirm(null);
      setStatus({ type: "success", msg: "המוצר נמחק" });
    } catch {
      setStatus({ type: "error", msg: "שגיאה במחיקה" });
    }
  };

  if (editingProduct) {
    const initial = {
      ...editingProduct,
      advantagesList: editingProduct.advantagesList?.join(", ") || "",
      hotProducts: editingProduct.hotProducts ? "true" : "false",
    };
    return (
      <div>
        {status && <div className={`adminPanel__status adminPanel__status--${status.type}`}>{status.msg}</div>}
        <div className="adminPanel__editHeader">
          <h3>עריכת מוצר: <span>{editingProduct.productName}</span></h3>
          <span className="adminPanel__editSku">מק"ט: {editingProduct.sku}</span>
        </div>
        <ProductForm initial={initial} onSubmit={handleSave} submitLabel="שמור שינויים"
          loading={saving} onCancel={() => setEditingProduct(null)} />
      </div>
    );
  }

  return (
    <div className="adminPanel__editSection">
      <form className="adminPanel__searchForm" onSubmit={handleSearch}>
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder='חפש לפי שם מוצר או מק"ט...' className="adminPanel__searchInput" />
        <button type="submit" className="btn-green adminPanel__searchBtn" disabled={searching}>
          {searching ? "מחפש..." : "חפש"}
        </button>
      </form>

      {status && <div className={`adminPanel__status adminPanel__status--${status.type}`}>{status.msg}</div>}

      {results.length > 0 && (
        <div className="adminPanel__results">
          {results.map((p) => (
            <div key={p._id} className="adminPanel__resultCard">
              <div className="adminPanel__resultCard-img">
                {p.image ? <img src={p.image} alt={p.productName} /> : <div className="adminPanel__resultCard-noImg">📦</div>}
              </div>
              <div className="adminPanel__resultCard-info">
                <p className="adminPanel__resultCard-name">{p.productName}</p>
                <p className="adminPanel__resultCard-sku">מק"ט: <strong>{p.sku || "—"}</strong></p>
                <p className="adminPanel__resultCard-meta">{p.category} · ₪{p.price}</p>
                {p.colors?.length > 0 && (
                  <div className="adminPanel__resultCard-colors">
                    {p.colors.map((c) => (
                      <span key={c} style={{ backgroundColor: c }} className="adminPanel__resultCard-colorDot" title={c} />
                    ))}
                  </div>
                )}
              </div>
              <div className="adminPanel__resultCard-actions">
                <button className="adminPanel__editBtn" onClick={() => setEditingProduct(p)}>עריכה</button>
                {deleteConfirm === p._id ? (
                  <div className="adminPanel__deleteConfirm">
                    <span>למחוק?</span>
                    <button className="adminPanel__deleteYes" onClick={() => handleDelete(p._id)}>כן</button>
                    <button className="adminPanel__deleteNo" onClick={() => setDeleteConfirm(null)}>לא</button>
                  </div>
                ) : (
                  <button className="adminPanel__deleteBtn" onClick={() => setDeleteConfirm(p._id)}>מחק</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Main AdminPanel ───────────────────────────────────────────────────────────
const AdminPanel = ({ onLogout }) => {
  const [tab, setTab] = useState("add"); // "add" | "edit"
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAdd = async (formData) => {
    setLoading(true);
    setStatus(null);
    try {
      await axiosInstance.post("/product", formData);
      setStatus({ type: "success", msg: "המוצר הועלה בהצלחה!" });
    } catch (err) {
      const msg = err.response?.data?.msg || "שגיאה בהעלאת המוצר";
      if (err.response?.status === 401) { setStatus({ type: "error", msg: "פג תוקף ההתחברות." }); setTimeout(onLogout, 1500); }
      else setStatus({ type: "error", msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminPanel">
      <div className="adminPanel__header">
        <h2>ניהול מוצרים</h2>
        <button className="adminPanel__logout" onClick={onLogout}>התנתק</button>
      </div>

      <div className="adminPanel__tabs">
        <button className={`adminPanel__tab ${tab === "add" ? "adminPanel__tab--active" : ""}`}
          onClick={() => setTab("add")}>➕ הוסף מוצר</button>
        <button className={`adminPanel__tab ${tab === "edit" ? "adminPanel__tab--active" : ""}`}
          onClick={() => setTab("edit")}>🔍 חפש ועדכן</button>
      </div>

      <div className="adminPanel__body">
        {tab === "add" && (
          <>
            {status && <div className={`adminPanel__status adminPanel__status--${status.type}`}>{status.msg}</div>}
            <ProductForm initial={EMPTY_FORM} onSubmit={handleAdd}
              submitLabel="העלה מוצר" loading={loading} />
          </>
        )}
        {tab === "edit" && <EditSection onLogout={onLogout} />}
      </div>
    </div>
  );
};

export default AdminPanel;
