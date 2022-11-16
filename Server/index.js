//Imports
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const systemSchema = require("./schema/system");
const headingSchema = require("./schema/heading");
const Agenda = require("agenda");
const saveReqParser = require("./utils/serverUtil")

const PORT = 5000
var cors = require('cors')

// create application/json parser

app.use(express.json());




app.use(cors())
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', parameterLimit: 50000, extended: true }));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb' }));

mongoose.connect("mongodb://localhost:27017/weather-parser", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

const mongoConnectionString = "mongodb://localhost:27017/weather-parser";

const agenda = new Agenda({
  db: { address: "localhost:27017/weather-parser", collection: "agendaJobs" },
});

console.log("exec 1")

agenda.define("save data from month jan to feb", async (job) => {
 const data =  await systemSchema.find({ m: { $in: [01, 02] } });
 console.log("data",JSON.stringify(data));
  const fs = require('fs');
  console.log("exec 12")
  fs.appendFile("./weatherSavedData.txt", JSON.stringify(data), function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
});

(async function () {
  console.log("exec 123")
  // IIFE to give access to async/await
  await agenda.start();
  console.log("exec 1234")

  await agenda.every("10 minutes", "delete old users");


})();

app.post('/saveRawData', (req, res) => {


  console.log("Req", req.body.length, req.body[0][0])


  const heading = new headingSchema(saveReqParser(req,0));

  heading.save(function (err, msg) {
    if (err) {
      console.log("Handled Error :", err.stack);
    } else {
      console.log("saving done...", msg);
    }
  });




  for (let i = 1; i <= req.body.length - 1; i++) {



    const user = new systemSchema(saveReqParser(req,i));


    user.save(function (err, msg) {
      if (err) {
        console.log("Handled Error :", err.stack);
      } else {
        console.log("saving done...", msg);
      }
    });

  }



  res.send("req")
})

app.get('/FetchRaw', async (req, res) => {


  const systems = await systemSchema.find();
  res.send(systems)
})



app.get('/retrieveHeading', async (req, res) => {


  const systems = await headingSchema.find();
  res.send(systems)
})



app.post('/selectedRangeFetch', async (req, res) => {
  console.log('sdd', req.body)

  const startDate = req.body.startDate && req.body.startDate.split("-")
  const endDate = req.body.endDate && req.body.endDate.split("-")
  const systems = await systemSchema.find({ Year: { $in: [startDate[0], endDate[0]] }, m: { $in: [startDate[1], endDate[1]] } });
  res.send(systems)
})


app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`)
})