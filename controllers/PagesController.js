const Item = require("../models/all_blogs");
const Users = require("../models/users");

//signup
exports.getSignupUser = (req, res) => {
    res.render("signup", { message: null });
  };
  
  // Display Login Page
  exports.getLoginUser = (req, res) => {
    res.render("login", { message: null });
  };

  
  exports.getHome = async (req, res) => {
    try {
      const items = await Item.findAll();
  
      res.status(200).render("Home", { blogs: items, user: req.session.user,role:req.session.role});
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).send("Internal Server Error");
    }
  };
  

  exports.getAddBlog=(req,res)=>{
    res.render("addblog",{user:req.session.user})
  }
  

  exports.getUsers=async (req, res) => {
    try {
      const users = await Users.findAll();
  
      res.render("Manage-Users", { users: users, user: req.session.user});
    } catch (error) {
      console.error("Error fetching blogs:", error);
      res.status(500).send("Internal Server Error");
    }
  };