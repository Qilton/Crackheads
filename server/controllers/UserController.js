const UserModel = require("../models/user");
const multer = require("multer");
const { uploadonCloudinary } = require("../utils/cloudinary"); // adjust the path if needed

// Setup multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Controller
const updateUser = async (req, res) => {
  try {
    const { address, phone, location } = req.body;

    if (!address || !phone || !location) {
      return res.status(400).json({
        message: "Please provide all the fields",
        success: false,
      });
    }

    const id = req.params.id;
    const user = await UserModel.findById(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    let imageUrl = user.profileImage; // fallback to old image

    // Handle file upload if image is provided
    if (req.file) {
      imageUrl = await uploadonCloudinary(req.file.buffer);
      if (!imageUrl) {
        return res.status(500).json({
          message: "Image upload failed",
          success: false,
        });
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        address,
        phone,
        location,
        pfp: imageUrl,
      },
      { new: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      success: true,
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

module.exports = { updateUser, getUser, upload };
