const saveReqParser = (req,i)=>{
    return {
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
      }
}

module.exports = saveReqParser;