import crypto from "crypto";

// Returns a signed upload signature for Cloudinary
// The client sends directly to Cloudinary using this signature (no file passes through our server)
const getUploadSignature = (req, res) => {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = "homrey-binyan";

  const toSign = `folder=${folder}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
  const signature = crypto.createHash("sha256").update(toSign).digest("hex");

  res.json({
    signature,
    timestamp,
    folder,
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
  });
};

export { getUploadSignature };
