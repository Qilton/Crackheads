const {updateUser,getUser}=require("../controllers/UserController")
const router=require('express').Router()
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage }); // memoryStorage()
router.post("/update/:id", upload.single("photo"), updateUser);
router.get('/:id',getUser)
module.exports=router