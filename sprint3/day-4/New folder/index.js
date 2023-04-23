const express = require("express");
const cors = require("cors");
const { connection } = require("./connection/connection");
const { movieRoute } = require("./routes/movieRoute");
require("dotenv").config();
const app = express();
 
//Middlewares
app.use(express.json());
app.use(cors());
app.use("/movies",movieRoute)

//starting the server
app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to MongoDB Atlas");
    console.log(`Server running on PORT ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
