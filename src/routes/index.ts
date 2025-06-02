import express from "express";
import userRouter from './users/user'; 
import postRouter from './posts/post'; 



const router = express.Router();    

router.use("/users", userRouter); 
router.use("/posts", postRouter); 

export default router; 

    