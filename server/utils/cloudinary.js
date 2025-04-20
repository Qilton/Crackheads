const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: "dexcarf4x", 
    api_key: "761455659629295", 
    api_secret: "asVoYAabBE-uJbPjeToMRXVp_Iw"
});

const uploadonCloudinary = async (fileBuffer) => {
  try {
    if (!fileBuffer) {
      console.error("No file buffer provided");
      return null;
    }

    // Using upload_stream to handle buffer directly
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            reject("Cloudinary upload failed");
          } else if (result && result.url) {
            console.log("Cloudinary upload success:", result.url);
            resolve(result.url);  // Return the URL if upload is successful
          } else {
            console.error("No URL returned from Cloudinary:", result);
            reject("No URL returned from Cloudinary");
          }
        }
      ).end(fileBuffer);
    });

  } catch (err) {
    console.error("Error in uploading file on Cloudinary:", err);
    return null;
  }
};

module.exports = { uploadonCloudinary };