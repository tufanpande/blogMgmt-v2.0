const router =require('express').Router();

router.get("/", async (req, res, next)=>{
try{
    const result= await blogController.getAll();
    res.json({data:result});
}catch(e){
    next(e)
}
});

module.exports =router;