//Importing custom functions
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
//Importing function to aid in creating paths
const path = require("path");
//Initialising express
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
//Importing templating engine
const hbs = require("hbs");

//Define paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlerbars engine and views location
//Standard copy and paste
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
//Setup static directory to serve
app.use(express.static(publicDirPath));
//Setting up routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "cleon",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "cleonn",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "cleonn",
    helpText: "This is some helpful text",
  });
});

//using query strings
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
