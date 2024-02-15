const userModel = require("./user.model");
const { hashedPassword, comparePassword } = require("../../utils/bcrypt");
const { mailer } = require("../../services/mailer");
const { generateRandomToken } = require("../../utils/token");
const { verify } = require("crypto");

const register = async (payload) => {
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
  return result;
};

const getById = (_id) => {
  return userModel.findOne({ _id });
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

module.exports = {
  register,
  login,
  getById,
  updateById,
  generatefpToken,
  verifyFpToken,
  resetPassword,
  changePassowrd,
};