// TODO: create a router variable import the Router Engine from Express
const router = require("express").Router();
// create an api endpoint that will work for localhost:4000/practice/hello-world
router.get("/hello-world", (req, res) => {
  // req = request & res = response

  res.send("Hello World");
});
// ? Create the endpoint of localhost:4000/practice/greeting/
// ? Request type: post request
// ? send back a "Good Afternoon"
router.post("/greeting", (req, res) => {
  // req = request & res = response
  console.log(req.body.firstName);
  const {firstName} = req.body
  res.send("Good Afternoon "+ firstName);
});

// If the route doesn't exist
// ? If the route doesn't exist
router.get("*", (req, res) => {
  res.status(404).send("I couldn't find what you were looking for")
})


module.exports = router;
