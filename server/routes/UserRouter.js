const {updateUser}=require("../controllers/UserController")
const router=require('express').Router()
router.post('/update/:id',updateUser)
module.exports=router