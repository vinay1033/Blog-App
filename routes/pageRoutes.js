const express = require("express");
const pagesController = require("../controllers/PagesController");
const isAuth = require("../middleware/isAuth");
const restrictViewerRoutes = require("../middleware/restrictViewer");
const restrictAdminRoutes = require("../middleware/restrictAdmin");
const restrictEditorRoutes = require("../middleware/restrictEditor");

const router = express.Router();

router.get("/signup", pagesController.getSignupUser);
router.get("/", pagesController.getLoginUser);
router.get("/home", isAuth, pagesController.getHome);
router.get("/add-blog", isAuth, restrictEditorRoutes, pagesController.getAddBlog);
router.get("/manage-users", isAuth, restrictAdminRoutes, pagesController.getUsers);

module.exports = router;
