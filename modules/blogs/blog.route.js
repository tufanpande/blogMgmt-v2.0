const router = require("express").Router();
const multer = require("multer");
const { checkRole } = require("../../utils/sessionManager");
const Controller = require("./blog.controller");
const { validate } = require("./blog.validate");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images/blogs");
  },
  filename: function (req, file, cb) {
    const imageName = "image".concat(
      "-",
      Date.now(),
      ".",
      file.originalname.split(".").pop()
    );
    cb(null, imageName);
  },
});

// HW file size each max 1MB
// HW file type png, jpeg, jpg
const upload = multer({ storage: storage });

router.post(
  "/",
  upload.single("pictureUrl"),
  checkRole(["user", "admin"]),
  validate,
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.pictureUrl = req.file.path.replace("public", "");
      }
      const result = await Controller.create(req.body);
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/", checkRole(["user", "admin"]), async (req, res, next) => {
  try {
    const { title, author, page, limit } = req.query;
    const search = { title, author, authorId: "" };
    if (req?.currentUser && req?.roles.includes("user"))
      search.authorId = req.currentUser;
    const result = await Controller.list(search, page, limit);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.get("/my-blogs", checkRole(["user"]), async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const result = await Controller.getAuthorBlogs(
      req.currentUser,
      page,
      limit
    );
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.get("/published-only", async (req, res, next) => {
  try {
    const { page, limit, title, author, sortBy } = req.query;
    const search = { title, author, sortBy };
    const result = await Controller.getPublishedBlogs(search, page, limit);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.get(
  "/admin/:slug",
  checkRole(["user", "admin"]),
  async (req, res, next) => {
    try {
      const { slug } = req.params;
      const payload = { slug, author: req.currentUser, roles: req.roles };
      const result = await Controller.getById(payload);
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

router.get("/:slug", async (req, res, next) => {
  try {
    const { slug } = req.params;
    const payload = { slug, author: req.currentUser };
    const result = await Controller.getBySlug(payload);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.put("/:slug", checkRole(["user", "admin"]), async (req, res, next) => {
  try {
    const { slug } = req.params;
    const payload = {
      slug,
      author: req.currentUser,
      roles: req.roles,
      ...req.body,
    };
    const result = await Controller.updateBySlug(payload);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.patch("/:slug", checkRole(["user", "admin"]), async (req, res, next) => {
  try {
    const { slug } = req.params;
    const result = await Controller.changeStatus(slug);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.delete(
  "/:slug",
  checkRole(["user", "admin"]),
  async (req, res, next) => {
    try {
      const { slug } = req.params;
      const result = await Controller.remove(slug);
      res.json({ data: result });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;