const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const shorten = require("./routes/shorten");
const reroute = require("./routes/reroute");

dotenv.config();

mongoose.connect(
    process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: process.env.DB_NAME,
    },
    (err) => {
        if (!err) {
            console.log("Database connected...");
        } else {
            console.log("Error occured");
            console.log(err);
        }
    }
);

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("", reroute);
app.use("", shorten);
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}...`);
});
