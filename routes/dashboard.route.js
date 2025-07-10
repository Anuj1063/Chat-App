const router = require('express').Router();
const dashboardController = require('../controllers/dashboard.controller');
const profileUpload=require('../helper/imageUpload')
const auth=require('../middlewares/auth.middleware')()



router.get('/add-profile-form',auth.authenticate, dashboardController.addprofileForm);
router.post('/add-profile',auth.authenticate,profileUpload.single('profilePic'), dashboardController.addProfile);

router.get('/chat-dashboard', auth.authenticate,dashboardController.loadChatDashboard);


module.exports = router;
