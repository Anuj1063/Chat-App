const router =require( "express").Router();
const auth =require('../middlewares/auth.middleware.js')();
const messageController =require('../controllers/message.controller.js');



router.get("/:id", auth.authenticate,messageController. getMessages);

router.post("/send/:id", auth.authenticate,messageController. sendMessage);

module.exports=router;
