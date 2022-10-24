const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const serve = require("./serve")
const dotenv = require('dotenv');
const urlsRouter = require('./routers/shortUrlRouter')
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(serve)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.listen(PORT, () => {
  console.log("Ready on http://localhost:" + PORT);
});