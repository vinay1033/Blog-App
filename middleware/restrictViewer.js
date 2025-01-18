
module.exports= (req, res, next) => {
    if (req.session.user && req.session.user.role === "viewer") {
        return next();
    
    }
    res.redirect("/home");
  }