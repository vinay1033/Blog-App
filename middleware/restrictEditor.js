module.exports= (req, res, next) => {
    if (req.session.user && req.session.user.role === "editor") {
        return next();
    }
    res.redirect("/home");
  }