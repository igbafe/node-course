const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// connect to mongoDB
const dbURI =
  "mongodb+srv://Simon-Peter:Careful202@cluster0.3b5k6.mongodb.net/note-tuts?retryWrites=true&w=majority&appName=Cluster0";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

//  register view engine

app.set("view engine", "ejs");
app.set("views", "./basics-2/views");

// middleware & static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  //   res.send("<p>Home Page</p>");
  //   res.sendFile("./basics-2/views/about.html", { root: __dirname });
  res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

// blog routes
app.use("/blogs", blogRoutes);

// 404 page
app.use((req, res) => {
  //   res.status(404).sendFile("./basics-2/views/404.html", { root: __dirname });
  res.status(404).render("404", { title: "404" });
});
