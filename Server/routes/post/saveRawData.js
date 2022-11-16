const headingSchema = require("../../schema/heading");
const saveReqParser = require("../../utils/serverUtil");
const systemSchema = require("../../schema/system");

const fetchRaw = (app) => {
  app.post("/saveRawData", (req, res) => {
    const heading = new headingSchema(saveReqParser(req, 0));

    heading.save(function (err, msg) {
      if (err) {
        console.log("Handled Error :", err.stack);
      } else {
        console.log("saving done...", msg);
      }
    });

    for (let i = 1; i <= req.body.length - 1; i++) {
      const user = new systemSchema(saveReqParser(req, i));

      user.save(function (err, msg) {
        if (err) {
          console.log("Handled Error :", err.stack);
        } else {
          console.log("saving done. Line", i);
        }
      });
    }

    res.send("req");
  });
};

module.exports = fetchRaw;
