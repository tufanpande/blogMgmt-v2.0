const userModel = require("./user.model");
const { hashedPassword, comparePassword } = require("../../utils/bcrypt");
const { mailer } = require("../../services/mailer");
const { generateRandomToken } = require("../../utils/token");
const { signJWT } = require("../../utils/token");

// const { verify } = require("crypto");
// const { error } = require("console");

const register = async (payload) => {
  delete payload.roles;
  payload.password = hashedPassword(payload.password);
  const user = await userModel.create(payload);
  if (!user) throw new Error("Registration failed");

  const result = await mailer(
    user.email,
    "User Signup",
    "User registered Successfully"
  );
  if (result) return "User Registered";
  return result;
};

///////////////////////LOGIN/////////////////////

const login = async (payload) => {
  const { email, password } = payload;
  if (!email || !password) throw new Error("email or password is missing");
  //checks if user exists or not using email
  const user = await userModel
    .findOne({ email, isActive: true })
    .select("+password");
  if (!user) throw new Error("User doesn't exists");
  //if user exist get the hashed password
  const { password: hashed } = user;
  //compare the passowrd.
  const result = comparePassword(password, hashed);
  //if password match,then login into the system
  if (!result) throw new Error("email or password mismatched.try again  ");
  //return access token
  const userPayload = { name: user.name, email: user.email, role: user.roles };
  const token = await signJWT(userPayload);
  return token;
};

const getById = (_id) => {
  return userModel.findOne({ _id });
};

const getAll = async (search, page = 1, limit = 20) => {
  const query = [];
  if (search?.name) {
    query.push({
      $match: {
        name: new RegExp(search?.name, "gi"),
      },
    });
  }
  if (search?.email) {
    query.push({
      $match: {
        name: new RegExp(search?.email, "gi"),
      },
    });
  }

  query.push(
    {
      $facet: {
        metadata: [
          {
            $count: "total",
          },
        ],
        data: [
          {
            $skip: (+page - 1) * +limit,
          },
          {
            $limit: +limit,
          },
        ],
      },
    },
    {
      $addFields: {
        total: {
          $arrayElemAt: ["$metadata.total", 0],
        },
      },
    },
    {
      $project: {
        metadata: 0,
      },
    }
  );

  //searching,sorting and filter with pagination
  const result = await userModel.aggregate(query);

  return {
    data: result[0].data,
    total: result[0].total || 0,
    page: +page,
    limit: +limit,
  };
};

const updateById = (_id, payload) => {
  return userModel.updateOne({ _id }, payload);
};

//////////////////////GENERATE TOKEN////////////////////

const generatefpToken = async (payload) => {
  /*
    1. in req.body (email)
    2. check if user exist or not using email
    3. send the email with recovery token 
    4. store the token in the server as well
    5. send the email to the user with token
    5.compare the token
    6. If token matches , ask for new password
    7. hash the passworduser 
    8. update the database passeord for that email
    */
  const { email } = payload;
  if (!email) throw new Error("email is missing");
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("user doesnot exists");
  const randomToken = generateRandomToken(); //generating the token
  await userModel.updateOne({ email }, { token: randomToken }); //store it to the database
  const isEmailSent = await mailer(
    user.email,
    "Forget Password",
    `Your token is ${randomToken}`
  );
  if (isEmailSent) return "forget password token sent successfully";
};

////////////////////VERIFY TOKEN//////////////////

const verifyFpToken = async (payload) => {
  const { token, email, password } = payload;
  if (!token || !email || !password) throw new Error("Something is missing");
  const user = await userModel.findOne({ email });
  if (!user) throw new Error("user doesnot exists");
  const { token: verifyToken } = user;
  if (token !== verifyToken) throw new Error("Invalid Token");
  const updateUser = await userModel.updateOne(
    { email },
    { password: hashedPassword(password), token: "" }
  );
  return "Password updated Successfully";
};

//admin
///////////////////RESET PASSWORD///////////////////////////

const resetPassword = (payload) => {
  const { userId, password } = payload;
  if (!userId || !password) throw new Error("UserId or Password id required");

  return userModel.updateOne(
    { _id: userId },
    { password: hashedPassword(password) }
  );
};

///////////////////////CHANGE PASSWORD//////////////////////////

const changePassowrd = async (payload) => {
  const { email, oldpassword, newpassword } = payload;
  if ((!email || !oldpassword, !newpassword))
    throw new Error("Something is missing");
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) throw new Error("user doesnot exists");
  const isValidOldPassword = comparePassword(oldpassword, user.password);
  if (!isValidOldPassword) throw new Error("Password didnot match");
  const newHashPw = hashedPassword(newpassword);
  await userModel.updateOne({ password: newHashPw });
  return "Password Updated Successfully";
};

/////////////////////////////FOR ADMIN/////////////////////

const create = async (payload) => {
  return userModel.create(payload);
};
const getProfile = async (_id) => {
  return userModel.findOne({ _id });
};
const updateProfile = async (_id, payload) => {
  return userModel.updateOne({ _id }, payload);
};

const blockUser = async (_id) => {
  const user = await userModel.findOne({ _id });
  if (!user) throw new Error("User not found");
  const payload = { isActive: !user.isActive };
  return userModel.updateOne({ _id }, payload);
};

module.exports = {
  create,
  getProfile,
  updateProfile,
  blockUser,
  register,
  login,
  getById,
  getAll,
  updateById,
  generatefpToken,
  verifyFpToken,
  resetPassword,
  changePassowrd,
};