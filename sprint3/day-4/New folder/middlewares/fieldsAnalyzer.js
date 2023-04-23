function fieldsAnalyzer(req, res, next) {
  let Posted_Data = req.body;
 //checking all field are present or not
  if (
    Posted_Data.movie_name &&
    Posted_Data.genre &&
    Posted_Data.director &&
    Posted_Data.rating &&
    Posted_Data.year_of_release
  ) {
    next();
  } else {
    res.status(400).send({
      err: "Few fields are missing, cannot process the request",
    });
  }
}

module.exports = fieldsAnalyzer;
