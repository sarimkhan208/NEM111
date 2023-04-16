const fs = require("fs");
const express = require("express");
const instructorRouter = express.Router();

instructorRouter.post("/addinstructor", (req, res) => {
  let obj;
  if (!req.body.emp_id) {
    obj = {
        emp_id: Date.now(),
      ...req.body,
    };
  } else {
    obj = req.body;
  }

  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let updated_Data = { ...data, instructors: [...data.instructors, obj] };
  fs.writeFileSync("./db.json", JSON.stringify(updated_Data));
  res.send("Instructor has been added");
});

instructorRouter.get("/", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  res.json(data.instructors);
});

instructorRouter.get("/:empID", (req, res) => {
  let id = req.params.empID;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let filtered_Data = data.instructors.filter((el) => el.emp_id == id);
  res.json(filtered_Data[0]);
});

module.exports = { instructorRouter };
