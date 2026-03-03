// utils/uploadPdf.js
const cloudinary = require("../config/cloudinary");

function uploadPdfBufferToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",      // IMPORTANT for PDF preview + better delivery
        folder: "generated_tickets",
        public_id: publicId,
        overwrite: true,
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    stream.end(buffer);
  });
}

module.exports = { uploadPdfBufferToCloudinary };