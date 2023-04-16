// write the routes for /students end poient and add middlewares.
const fs = require("fs");
const express = require("express");
const validator = require("../middleware/validator.middleware");
const studentRouter = express.Router();

studentRouter.post("/addstudent", (req, res) => {
  let obj;
  if (!req.body.student_code) {
    obj = {
      student_code: Date.now(),
      ...req.body,
    };
  } else {
    obj = req.body;
  }

  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let updated_Data = { ...data, students: [...data.students, obj] };
  fs.writeFileSync("./db.json", JSON.stringify(updated_Data));
  res.send("Student has been added");
});

studentRouter.get("/", (req, res) => {
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  res.json(data.students);
});

studentRouter.get("/:studentCode", (req, res) => {

  let id = +req.params.studentCode;

  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let filtered_Data = data.students.filter((el) => el.student_code == id);
  res.json(filtered_Data[0]);
});

studentRouter.use(validator)

studentRouter.patch("/:studentCode", (req, res) => {
  let id = req.params.studentCode;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let new_Data = data.students.map((el) => {
    if (el.student_code == id) {
      return {
        ...el,
        ...req.body,
      };
    }
    return el;
  });
  fs.writeFileSync(
    "./db.json",
    JSON.stringify({ ...data, students: new_Data })
  );
  res.json("Patched Student Details");
});


studentRouter.delete("/:studentCode", (req, res) => {
  let id = +req.params.studentCode;
  let data = JSON.parse(fs.readFileSync("./db.json", "utf-8"));
  let new_Data = data.students.filter((el) => el.student_code!==id);
  fs.writeFileSync(
    "./db.json",
    JSON.stringify({ ...data, students: new_Data })
  );
  res.json("Deleted Student Details");
});

module.exports = { studentRouter };
