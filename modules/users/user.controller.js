const userModel= require("./user.model");
const {hashPassword, comparePassword}= require("../../utils/bcrypt")


const register=async (payload)=>{
    payload.password= hashPassword(payload.password);
    const user = await userModel.create(payload);
    if(!user) throw new Error("Registration Failed");
    return  user;
};


const login =async (payload)=>{
    const{email, password} =payload;
    if (!email|| !password)throw new Error("Email or password Missing");
//check if user  exist or not using email
    const user = await userModel.findOne({email}).select("+password");
    if(!user)throw new Error("User doesn't Exist!!");
// if user exist , get the hashed password
    const{password:hashPw}= user;
//compare the password
    const result= comparePassword(password,hashPw);
// if password mtch , loginto the system
if(!result)throw new Error("Email or Password mismatch. Please try again.");
return result;
// access token return
};

const getById =(_id)=>{};

const updateById=(_id,payload)=>{};

const forgetPassword=(payload)=>{};

const resetPassword=(payload)=>{};

const changePassword=(payload)=>{};


module.exports={register, login, getById, updateById,forgetPassword, resetPassword,changePassword };