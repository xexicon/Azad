const cloudinary = require("../config/cloudinary");

function uploadPdfBufferToCloudinary(buffer, publicId) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        public_id: publicId,
        folder: "generated_tickets",
        format: "pdf",
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