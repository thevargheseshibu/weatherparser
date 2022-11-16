const headingSchema = require("../../schema/heading");

const retrieveHeading = (app)=>{
    app.get('/retrieveHeading', async (req, res) => {


        const systems = await headingSchema.find();
        res.send(systems)
      })
      
}

module.exports = retrieveHeading;