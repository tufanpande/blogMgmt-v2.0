const router =require('express').Router();
const userController= require("./user.controller")
router.post("/register",async(req, res, next)=>{
    try{
        const result = await userController.register(req.body);
        res.json({data:result});
    }catch(e){
        next(e)
    }
});


router.post("/login",async(req, res, next)=>{
    try{
        const result = await userController.login(req.body);
        res.json({data:result});
    }catch(e){
        next(e)
    }
});

module.exports =router;