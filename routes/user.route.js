const router = require('express').Router();
const authController = require('../controllers/auth.controller');



router.get('/', authController.registerForm);
router.post('/register', authController.registerUser);


router.get('/login-form', authController.loadLogin);
router.post('/login', authController.login);
router.get('/logout', authController.logout);



module.exports = router;
