const { signup, login } = require('../controllers/AuthController')
const { signUpValidation, loginValidation } = require('../middleware/AuthValidation')

const router=require('express').Router()


router.post('/signup',signUpValidation,signup)
router.post('/login',loginValidation,login)

                             
module.exports= router;