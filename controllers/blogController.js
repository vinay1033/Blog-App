const Item = require("../models/all_blogs");
const User = require("../models/users");



//create post
exports.createBlog = async (req, res) => {
  const { title, imageUrl, content } = req.body;
  try {
    if ( !title || !content || !imageUrl) {
      return res.status(400).send("All fields (title, imageUrl, content, and author) are required.");
    }

    await Item.create({ title, imageUrl, content, author:req.session.user.username });
    
    res.redirect("/home"); 
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Delete a blog by ID
exports.deleteBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).send("Blog not found.");
    }
    await item.destroy();

    res.status(200).redirect("/home");
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).send("Internal Server Error");
  }
};


exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send("User not found.");
    }
    await user.destroy();

    res.redirect("/manage-users");
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Render the editblog page for editing a blog
exports.getBlogById = async (req, res) => {
  const { id } = req.params; 
  try {
    const blog = await Item.findByPk(id); 
    if (!blog) {
      return res.status(404).send("Blog not found.");
    }
    res.render("editBlog", { blog:blog}); 
   
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).send("Internal Server Error");
  }
};


//get single blog
exports.getBlog= async (req, res) => {
  const { id } = req.params; 
  try {
    const blog = await Item.findByPk(id); 
    if (!blog) {
      return res.status(404).send("Blog not found.");
    }
    res.render("Blog", { blog:blog}); 
   
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).send("Internal Server Error");
  }
};


// Update a blog
exports.updateBlog = async (req, res) => {
  const { id } = req.params; 
  const { title, image, author, content } = req.body;

  try {
    const blog = await Item.findByPk(id); 
    if (!blog) {
      return res.status(404).send("Blog not found.");
    }

    blog.title = title || blog.title;
    blog.imageUrl = image || blog.imageUrl;
    blog.author = author || blog.author;
    blog.content = content || blog.content;

    await blog.save();

    res.redirect("/home");
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).send("Internal Server Error");
  }
};

// Get a blog by ID (for viewing details)
exports.getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Item.findByPk(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.render("editblog", { blog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
