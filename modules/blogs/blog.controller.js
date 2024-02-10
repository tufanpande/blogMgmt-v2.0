const Model= require("./blog.model");

const bookmarksModel = require("../bookmarks/bookmarks.model");


const create=(payload)=>{};

const getAll=()=>{};

const getById=(_id)=>{};

const updateById = (_id,payload)=>{};

const removeById=(_id)=>{};

const bookMark=(payload)=>{
    const{blogs, user} =payload;
    if(!blogs.length >0 ||!user)throw new Error("Blogs or User Missing");
    bookmarksModel.create(payload);

};

const authorBlogs=(userId)=>{};

module.exports={create, getAll,
    getById,
    updateById, 
    removeById,
    bookMark,
    authorBlogs
    };