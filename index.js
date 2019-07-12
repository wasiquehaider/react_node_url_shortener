const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const app = express();

// connect to DATABASE
connectDB();

app.use(express.json({ extended: false }));

// Define Routes

app.use("/", cors(), require("./routes/index"));
app.use("/api/url", require("./routes/url"));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server Started on Port: ${PORT}`));
