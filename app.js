const express = require("express");
const session = require("express-session"); 
const app = express();
const PORT = 3000;

const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes.js");
const pageRoutes = require("./routes/pageRoutes.js");
const sequelize = require("./util/database");

app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware for parsing request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'mysecret',   
  resave: false,               
  saveUninitialized: false,   
  cookie: { secure: false }    
}));



// Use the routes
app.use(userRoutes);
app.use(blogRoutes);
app.use(pageRoutes);

app.use((req,res)=>{
    res.status(404).render("404Page")
})

sequelize
  .sync({ force: false })  
  .then(() => {
    console.log("Database synced.");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error(err));
