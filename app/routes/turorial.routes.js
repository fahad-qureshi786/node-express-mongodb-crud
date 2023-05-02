module.exports = app => {
  const tutorials = require("../controllers/tutorial.controller.js");

  let router = require("express").Router();

  // Create a new Tutorial
  router.post("/", tutorials.generateDocument);

  app.use("/api/generateDocument", router);
};
