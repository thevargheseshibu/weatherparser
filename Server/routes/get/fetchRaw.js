
const systemSchema = require("../../schema/system");

const fetchRaw = (app)=>{
    app.get('/FetchRaw', async (req, res) => {


        const systems = await systemSchema.find();
        res.send(systems)
      })
}

module.exports = fetchRaw;