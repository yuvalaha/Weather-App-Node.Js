const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("../src/utils/geocode");
const forecast = require("../src/utils/forecast");

const app = express();
const port = 3000;

// Define paths for express config
const publicDirectory = path.join(__dirname, "public");
const viewsPathDirectory = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPathDirectory);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

// Setup the routes
app.get("", (req, res) => {
  res.render("index", {
    name: "Yuval Aharon",
    title: "Weather App",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Yuval Aharon",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help I Need Somebody!",
    name: "Yuval Aharon",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You must provide an address.",
    });
  }
  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error)
        return res.send({
          error: error,
        });
      res.send({
        forecast: forecastData,
        location,
        address: address,
      });
    });
  });
});


// Catch anything after /help
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yuval Aharon",
    errorMessage: "Help article not found.",
  });
});

// Any other route (404 page)
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Yuval Aharon",
    errorMessage: "Page Not Found.",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
