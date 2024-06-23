require("dotenv").config();
const data = require("./data");

const mongoose = require("mongoose");

const userController = require("../modules/users/user.controller");
const blogController = require("../modules/blogs/blog.controller");

const setup = {
  initialize: async () => {
    try {
      console.log(data.length);
      await mongoose.connect(process.env.DB_URL).then((connection) => {
        mongoose.connection.db.dropDatabase();
      });
      console.log("Starting User Seeding");
      const userA = await userController.create({
        name: "Raktim Admin",
        email: "raktim@rumsan.com",
        password: "123",
        roles: ["admin"],
      });

      const userB = await userController.create({
        name: "Raktim User",
        email: "raktim+user@rumsan.com",
        password: "abc",
        roles: ["user"],
      });
      console.log("Finished User Seeding");
      console.log("Starting Blog Seeding");
      for (let i = 0; i < 10; i++) {
        const payload = data[i];
        payload.status = "published";
        payload.author = userA?._id;
        payload.pictureUrl = `https://cdn.dummyjson.com/recipe-images/${
          i + 1
        }.webp`;
        await blogController.create(payload);
      }
      for (let i = 10; i < 20; i++) {
        const payload = data[i];
        payload.author = userB?._id;
        payload.status = "published";
        payload.pictureUrl = `https://cdn.dummyjson.com/recipe-images/${
          i + 1
        }.webp`;
        await blogController.create(payload);
      }

      console.log("Completed Blog Seeding");
    } catch (e) {
      console.log({ e });
    }
  },
};

setup.initialize();
