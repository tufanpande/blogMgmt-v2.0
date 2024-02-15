const router = require("express").Router();
const userController = require("./user.controller");

router.get("/:id", async (req, res, next) => {
  try {
    const result = await userController.getById(req.params.id);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const result = await userController.register(req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const result = await userController.login(req.body);
    res.json({ msg: "Successfully Loggedin" });
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

router.put("/:id", async (req, res, next) => {
  try {
    const result = await userController.updateById(req.params.id, req.body);
    res.json({ msg: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;