import nodemailer from "nodemailer";

const sendOrder = async (req, res) => {
  const { fullName, email, phone, address, items, totalPrice } = req.body;

  if (!fullName || !email || !phone || !items?.length) {
    return res.status(400).json({ msg: "Missing required fields" });
  }

  // Build a clean HTML table of items
  const itemRows = items
    .map(
      (item, i) => `
      <tr style="border-bottom:1px solid #eee;">
        <td style="padding:8px 12px;text-align:right;">${i + 1}</td>
        <td style="padding:8px 12px;text-align:right;">${item.productName}</td>
        <td style="padding:8px 12px;text-align:center;">
          ${item.selectedColor
            ? `<span style="display:inline-block;width:14px;height:14px;border-radius:50%;background:${item.selectedColor};border:1px solid #ccc;vertical-align:middle;margin-left:4px;"></span>${item.selectedColor}`
            : "—"}
        </td>
        <td style="padding:8px 12px;text-align:center;">${item.amount}</td>
        <td style="padding:8px 12px;text-align:left;">₪${(item.price * item.amount).toFixed(2)}</td>
      </tr>`
    )
    .join("");

  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
      <div style="background:#48ac25;padding:20px 24px;border-radius:8px 8px 0 0;">
        <h2 style="color:#fff;margin:0;">הזמנה חדשה — ב.ר חומרי בניין</h2>
      </div>
      <div style="background:#fff;padding:24px;border:1px solid #eee;border-top:none;border-radius:0 0 8px 8px;">

        <h3 style="color:#333;margin-top:0;">פרטי לקוח</h3>
        <table style="width:100%;margin-bottom:24px;">
          <tr><td style="padding:4px 0;color:#888;width:120px;">שם מלא:</td><td style="color:#333;font-weight:600;">${fullName}</td></tr>
          <tr><td style="padding:4px 0;color:#888;">אימייל:</td><td style="color:#333;">${email}</td></tr>
          <tr><td style="padding:4px 0;color:#888;">טלפון:</td><td style="color:#333;">${phone}</td></tr>
          <tr><td style="padding:4px 0;color:#888;">כתובת:</td><td style="color:#333;">${address || "—"}</td></tr>
        </table>

        <h3 style="color:#333;">פרטי ההזמנה</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
          <thead>
            <tr style="background:#f5f5f5;">
              <th style="padding:8px 12px;text-align:right;">#</th>
              <th style="padding:8px 12px;text-align:right;">מוצר</th>
              <th style="padding:8px 12px;text-align:center;">צבע</th>
              <th style="padding:8px 12px;text-align:center;">כמות</th>
              <th style="padding:8px 12px;text-align:left;">סכום</th>
            </tr>
          </thead>
          <tbody>${itemRows}</tbody>
        </table>

        <div style="background:#f9f9f9;padding:12px 16px;border-radius:6px;text-align:left;font-size:1.1em;">
          <strong>סה"כ לתשלום: ₪${Number(totalPrice).toFixed(2)}</strong>
        </div>

        <p style="color:#aaa;font-size:0.85em;margin-top:24px;">
          הזמנה זו נשלחה אוטומטית ממערכת ב.ר חומרי בניין
        </p>
      </div>
    </div>`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"ב.ר חומרי בניין" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `הזמנה חדשה מ-${fullName} — ${new Date().toLocaleDateString("he-IL")}`,
    html,
  });

  res.status(200).json({ msg: "Order sent successfully" });
};

export { sendOrder };
