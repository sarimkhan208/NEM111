const { query } = require("express");
const express = require("express");
const fieldsAnalyzer = require("../middlewares/fieldsAnalyzer");
const record = require("../middlewares/record");
const { movieModel } = require("../models/model");
const movieRoute = express.Router();
//post route and fieldAnalyzer middleware
movieRoute.post("/", fieldsAnalyzer, async (req, res) => {
  try {
    const data = new movieModel(req.body);
    await data.save();
    res.status(200).json({
      msg: "Movie with the following data has been added to the Database",
      data: req.body,
    });
  } catch (error) {
    res.status(400).json({
      err: "Unable to Post Movie , Something went wrong!",
      Error_msg: error,
    });
  }
});

//get route 
movieRoute.get("/", async (req, res) => {

  //getting min and max rating from query
  const minrating = +req.query.minrating;
  const maxrating = +req.query.maxrating;

  //getting genre from query
  const genre = req.query.genre;

  //getting year of release from query
  const year_of_release = +req.query.year_of_release;

  //setting page and limit
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 5;

  const skip = (page - 1) * limit;
  let data = movieModel.find();

  try {
    //if genre query exist then only filter it by genre
    if (genre) {
      data.find({ genre: genre });
    }
 //if year query exist then only filter it by year
    if (year_of_release) {
      data.find({ year_of_release: year_of_release });
    }

    //min max exist then only fiter
    if (minrating && maxrating) {
      data.find({
        $and: [
          { rating: { $gte: minrating } },
          { rating: { $lte: maxrating } },
        ],
      });
    }

    const total = await movieModel.countDocuments(data);
    const moviesData = await data.skip(skip).limit(limit).exec();
    res.status(200).json(moviesData);
  } catch (error) {
    res.status(400).json({
      err: "Unable to get Movies , Something went wrong!",
      Error_msg: error,
    });
  }
});

//get route for particular movie
movieRoute.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await movieModel.find({ _id: id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({
      err: "Unable to get Movies , Something went wrong!",
      Error_msg: error,
    });
  }
});


//delete Route for particular movies
movieRoute.delete("/:id", record, async (req, res) => {
  const id = req.params.id;
  try {
    await movieModel.findByIdAndDelete({ _id: id });
    res.status(200).json({
      success: "Movie has been deleted",
    });
  } catch (error) {
    res.status(400).json({
      err: "Unable to delete Movies , Something went wrong!",
      Error_msg: error,
    });
  }
});

//patch route for updating movie
movieRoute.patch("/:id", record, async (req, res) => {
  const id = req.params.id;
  try {
    await movieModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({
      success: "Movie has been updated",
    });
  } catch (error) {
    res.status(400).json({
      err: "Unable to Update Movie , Something went wrong!",
      Error_msg: error,
    });
  }
});

module.exports = { movieRoute };
