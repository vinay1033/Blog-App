const express = require("express");
const isAuth = require("../middleware/isAuth");
const restrictViewerRoutes = require("../middleware/restrictViewer");
const restrictAdminRoutes = require("../middleware/restrictAdmin");
const restrictEditorRoutes = require("../middleware/restrictEditor");
const {
  getBlog,
  createBlog,
  deleteBlogById,
  updateBlog,
  deleteUser,
  getBlogById
} = require("../controllers/blogController");

const router = express.Router();

router.post("/post", isAuth, restrictEditorRoutes, createBlog);
router.get("/delete-blog/:id", isAuth, restrictEditorRoutes, deleteBlogById);
router.get("/blog/:id",isAuth,getBlog)
router.get("/edit-blog/:id", isAuth, restrictEditorRoutes, getBlogById);
router.post("/edit/:id", isAuth, restrictEditorRoutes, updateBlog);
router.post("/delete-user/:id", isAuth, restrictAdminRoutes, deleteUser);

module.exports = router;
