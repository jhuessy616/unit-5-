function logTime(req, res, next) {
  let date = new Date()
  console.log(date.toLocaleDateString())
}

// Now the middleware decides when this is used. 
app.use(logTime)