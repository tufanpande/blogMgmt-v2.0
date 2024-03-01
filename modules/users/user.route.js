const multer =require("multer");
const router = require("express").Router();
const userController = require("./user.controller");
const { checkRole } = require("../../utils/sessionManager");

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,"./public/images/user");
  },
  filename: function (req, file, cb){
    cd(
      null,
      file.fieldname +
      "-" +
      Date.now() +
      "."+
      file.organialname.split(".").pop()
    );
  },
});

//HW: pmg,jpg,jpeg
//HW : 1MB

const upload = multer({storage:storage});



router.post(
  "/register",
  upload.single("profilePic"),
   async (req, res, next) => {
  try {
    if(req.file){
      req.body.profilePic = req.file.path.replace("public", "");

    }
    const result = await userController.register(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.post("/generate-fp-token", async (req, res, next) => {
  try {
    const result = await userController.generatefpToken(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.post("/validate-fp-token", async (req, res, next) => {
  try {
    const result = await userController.verifyFpToken(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

// router.post("/reset-pass", checkRole(["admin"]), async (req, res, next) => {
//   try {
//     const result = await userController.resetPassword(req.body);
//     res.json({ msg: result });
//   } catch (e) {
//     next(e);
//   }
// });

router.post("/change-pass", async (req, res, next) => {
  try {
    const result = await userController.changePassowrd(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.post("/", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.create(req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.get("/get-profile", checkRole(["user"]), async (req, res, next) => {
  try {
    const result = await userController.getProfile(req.currentUser);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});
router.get("/", checkRole(["admin"]), async (req, res, next) => {
  try {
    const { name, page, limit } = req.query;
    const search = { name };
    const result = await userController.getAll(search, page, limit);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.put("/update-profile", checkRole(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.updateProfile(
      req.currentUser,
      req.body
    );
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", async (req, res, next) => {
  try {
    const result = await userController.getById(req.params.id);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const result = await userController.updateById(req.params.id, req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;