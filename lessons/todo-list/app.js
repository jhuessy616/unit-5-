const express = require("express");
const app = express();
const PORT = 4000;
const practiceController = require("./controllers/practice.controller");
const auth = require("./controllers/auth")
const routes = require("./controllers/routes")
const cors = require("cors")

// Paul Added a function to show it getting stuck because can't move on to next .use 
function logTime(req, res, next) {
  let date = new Date()
  console.log(date.toLocaleDateString())
  //  console.log(req.url)
  next()
}

app.use(express.json());
// Access from a form, extra thing paul did
// TODO extra paul thing 
{app.use(express.urlencoded({extended:true}));}
// addding in cors
app.use(cors())
// This will serve the static html page that is inside the public folder
app.use(express.static(`${__dirname}/public`));

// ! any traffic coming in that is has the practice in the url ex: localhost:4000/practice will go to the practiceController for more routing options.
// Will get stuck here and can't move onto next. Because we haven't told it in can go further. just add next to function
app.use(logTime);




app.use("/auth", auth)
app.use("/todo", routes);
app.use("/practice", practiceController);
console.log(__dirname);
app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});