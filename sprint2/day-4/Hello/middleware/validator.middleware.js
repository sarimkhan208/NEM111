// write the logic for validation middleware.

function validator(req, res, next) {
  if (req.method == "DELETE" || req.method == "PATCH") {
    if (
      (req.query.role == "admin" || req.query.role == "instructor") &&
      req.query.pass == "7877"
    ) {
      next();
    } else {
      res.send("You are not authorised to do this operation");
    }
  }
}

module.exports = validator;
