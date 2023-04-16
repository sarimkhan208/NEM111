const fs = require("fs");
// write the logic for logger middleware and export it.

function logger(req, res, next) {
  console.log(req)
  fs.appendFile(
    "logs.txt",
    `Method:${req.method},Route:${req.url}\n`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );
  
  next();
}

module.exports = logger;
