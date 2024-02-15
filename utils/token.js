const JWT =require("jsonwebtoken");

const signJWT =(payload)=>{
    return JWT.sign(
        {
            data:payload,
        },
        process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_DUTATION}
    );
};

const verifyJWT =(token)=>{
    return JWT.verify(token, process.env.JWT_SECRET);
};

module.exports ={signJWT,verifyJWT};