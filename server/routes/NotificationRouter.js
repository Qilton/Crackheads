const {  fcmToken,alert } =require( "../controllers/NotificationController");
const ensureAuthenticated = require('../middleware/Auth');
const router = require("express").Router();

router.post("/token", ensureAuthenticated, fcmToken);
router.post('/alert', ensureAuthenticated,alert);
module.exports = router;
