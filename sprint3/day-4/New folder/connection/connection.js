const mongoose = require("mongoose");
require("dotenv").config();

//setting up connection b/w MongoDB atlas
const connection = mongoose.connect(process.env.MONGO_DB_ATLAS_URL);
module.exports = { connection };
