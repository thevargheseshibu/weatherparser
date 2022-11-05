const express = require("express")
const mongoose = require("mongoose")


const app = express()
const systemSchema = require("./system");
const headingSchema = require("./heading");
const Agenda = require("agenda");

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

mongoose.connect("mongodb://localhost:27017/testdb", {
  useNewUrlParser: "true",
})
mongoose.connection.on("error", err => {
  console.log("err", err)
})
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected")
})

const mongoConnectionString = "mongodb://localhost:27017/testdb";

const agenda = new Agenda({
  db: { address: "localhost:27017/testdb", collection: "agendaJobs" },
});

console.log("exec 1")

agenda.define("delete old users", async (job) => {
 const data =  await systemSchema.find({ m: { $in: [01, 02] } });
 console.log("data",JSON.stringify(data));
  const fs = require('fs');
  console.log("exec 12")
  fs.appendFile("./test.txt", JSON.stringify(data), function (err) {
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

  await agenda.every("3 minutes", "delete old users");


})();

app.post('/trac', (req, res) => {


  console.log("Req", req.body.length, req.body[0][0])


  const heading = new headingSchema({
    Year: req.body[0][0],
    m: req.body[0][1],
    d: req.body[0][2],
    Time: req.body[0][3],
    Timezone: req.body[0][4],
    Cloudamount: req.body[0][5],
    Pressure: req.body[0][6],
    Precipitationamount: req.body[0][7],
    Relativehumidity: req.body[0][8],
    Precipitationintensity: req.body[0][9],
    Snowdepth: req.body[0][10],
    Airtemperature: req.body[0][11],
    Dewpointtemperature: req.body[0][12],
    Horizontalvisibility: req.body[0][13],
    Winddirection: req.body[0][14],
    Gustspeed: req.body[0][15],
    Windspeed: req.body[0][16],
  });

  heading.save(function (err, msg) {
    if (err) {
      console.log("Handled Error :", err.stack);
    } else {
      console.log("saving done...", msg);
    }
  });




  for (let i = 1; i <= req.body.length - 1; i++) {



    const user = new systemSchema({
      Year: req.body[i][0],
      m: req.body[i][1],
      d: req.body[i][2],
      Time: req.body[i][3],
      Timezone: req.body[i][4],
      Cloudamount: req.body[i][5],
      Pressure: req.body[i][6],
      Precipitationamount: req.body[i][7],
      Relativehumidity: req.body[i][8],
      Precipitationintensity: req.body[i][9],
      Snowdepth: req.body[i][10],
      Airtemperature: req.body[i][11],
      Dewpointtemperature: req.body[i][12],
      Horizontalvisibility: req.body[i][13],
      Winddirection: req.body[i][14],
      Gustspeed: req.body[i][15],
      Windspeed: req.body[i][16],
    });


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

app.get('/checker', async (req, res) => {


  const systems = await systemSchema.find();
  res.send(systems)
})



app.get('/heading', async (req, res) => {


  const systems = await headingSchema.find();
  res.send(systems)
})



app.post('/date', async (req, res) => {
  console.log('sdd', req.body)

  const startDate = req.body.startDate && req.body.startDate.split("-")
  const endDate = req.body.endDate && req.body.endDate.split("-")
  const systems = await systemSchema.find({ Year: { $in: [startDate[0], endDate[0]] }, m: { $in: [startDate[1], endDate[1]] } });
  res.send(systems)
})


app.listen(PORT, () => {
  console.log(`app is listening to PORT ${PORT}`)
})