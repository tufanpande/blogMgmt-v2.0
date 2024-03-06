const bcryptjs = require("bcryptjs");


const hashedPassword =(password)=>{
    return bcryptjs.hashSync(password,10);
};


const comparePassword =(password,hashPassword )=>{
    return bcryptjs.compareSync(password,hashPassword);
};


module.exports = {hashedPassword, comparePassword};