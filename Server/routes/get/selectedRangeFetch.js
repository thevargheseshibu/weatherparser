const systemSchema = require("../../schema/system");

const selectedRangeFetch = (app)=>{
    app.post('/selectedRangeFetch', async (req, res) => {
        const startDate = req.body.startDate && req.body.startDate.split("-")
        const endDate = req.body.endDate && req.body.endDate.split("-")
        const systems = await systemSchema.find({ Year: { $in: [startDate[0], endDate[0]] }, m: { $in: [startDate[1], endDate[1]] } });
        res.send(systems)
      })
}

module.exports = selectedRangeFetch;