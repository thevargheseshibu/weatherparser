//Imports
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const systemSchema = require("./schema/system");
const headingSchema = require("./schema/heading");
const Agenda = require("agenda");
const saveReqParser = require("./utils/serverUtil");
const selectedRangeFetch = require("./routes/get/selectedRangeFetch");
const saveRawData = require("./routes/post/saveRawData");
const fetchRaw = require("./routes/get/fetchRaw");
const retrieveHeading = require("./routes/get/retrieveHeading");


var cors = require("cors");
const PORT = 5000;

// app configuration

app.use(express.json());

app.use(cors());
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "100mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "100mb",
    parameterLimit: 50000,
    extended: true,
  })
);
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb" }));

// mongoose connection

mongoose.connect("mongodb://localhost:27017/weather-parser", {
  useNewUrlParser: "true",
});
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});

const mongoConnectionString = "mongodb://localhost:27017/weather-parser";

const agenda = new Agenda({
  db: { address: "localhost:27017/weather-parser", collection: "agendaJobs" },
});

// agenda

agenda.define("save data from month jan to feb", async (job) => {
  const data = await systemSchema.find({ m: { $in: [01, 02] } });
  const fs = require("fs");

  fs.appendFile("./weatherSavedData.txt", JSON.stringify(data), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!",(new Date()).toISOString());
  });
});

(async function () {
  // IIFE to give access to async/await
  await agenda.start();
  await agenda.every("10 seconds", "save data from month jan to feb");
})();

//Routes

saveRawData(app);

fetchRaw(app);

retrieveHeading(app);

selectedRangeFetch(app);

app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`);
});
