const bcrypt = require("bcrypt");
const User = require("../models/users");


exports.signupUser = async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.render("signup", { message: "All fields are required." });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.render("signup", { message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword, role });

    res.render("login", { message: "Signup successful! Please login." });
  } catch (error) {
    console.error("Error creating user:", error);
    res.render("signup", { message: "Internal server error. Please try again." });
  }
};





exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("login", { message: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.render("signup", { message: "Signup first." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.render("login", { message: "Invalid email or password." });
    }

    req.session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    res.redirect("/home");
  } catch (error) {
    console.error("Error during login:", error);
    res.render("login", { message: "Internal server error. Please try again." });
  }
};






exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      return res.status(500).send("Could not log out. Please try again.");
    }

    res.clearCookie("connect.sid", { path: "/" });
    res.redirect("/");
  });
};
