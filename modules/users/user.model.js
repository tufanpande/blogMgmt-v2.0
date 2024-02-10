const {Schema, model}=require("mongoose");



const {objectId}= Schema.Types;

const userSchema = new Schema({
    name:{type:String ,required:true},
    email:{type:String,required:true , unique:true},
    password:{type:String,required:true, select:false},
    roles:{type:String,enum:["admin","user"],default:"user"},
    isActive:{type:Boolean,required:true, default:true},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
});


module.exports = new model("User", userSchema);