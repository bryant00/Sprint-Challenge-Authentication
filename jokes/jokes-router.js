const axios = require("axios");
const authenticate = require("../auth/authenticate-middleware.js");
const Joke = require("../database/models/Joke");
const User = require("../database/models/User");
const { transaction } = require("objection");

//app.use("/api/jokes", authenticate, jokesRouter);
module.exports = router => {
  //get jokes via axios api call
  router.get("/", (req, res) => {
    const requestOptions = {
      headers: { accept: "application/json" }
    };
    axios
      .get("https://icanhazdadjoke.com/search", requestOptions)
      .then(response => {
        res.status(200).json(response.data.results);
      })
      .catch(err => {
        res.status(500).json({ message: "Error Fetching Jokes", error: err });
      });
  });

  //get table of jokes
  router.get("/all", async (req, res) => {
    try {
      const jokes = await Joke.query();
      res.send(jokes);
    } catch (err) {
      console.log(err instanceof objection.ValidationError);
      console.log(err.data);
    }
  });
  //get joke by id
  router.get("/:id", async (req, res) => {
    const joke = await Joke.query().findById(req.params.id);
    if (!joke) {
      throw createStatusCodeError(404);
    }
    res.send(joke);
  });
};
