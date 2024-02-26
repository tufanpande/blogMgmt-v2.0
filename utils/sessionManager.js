
const {verifyJWT} =require("../utils/token");
const userModel = require("../modules/users/user.model");


const checkRole=(sysRole)=>{
    return async (req, res,next)=>{
        try{
            const token = req.headers.access_token ||"";
            if (!token)throw new Error ("Access token is required");
            const data = verifyJWT(token);
            if (!data) throw new Error("Permission Denied");
            //check role

            const {data:user} =data;
            const{email}=user;
            const userData =await userModel.findOne({email, isActive:true});
            if(!userData) throw new Error("user not found");
            const isValidRole=sysRole.some((role)=>userData.roles.includes(role));
            if(!isValidRole) throw new Error ("permission denied");
            req.currentUser =userData._id;
        }catch(e){
            next(e);
        }
    };
};
module.exports={checkRole};