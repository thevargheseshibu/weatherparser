/**
 * @class system schema
 * @description Define the model of system schema
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let systemSchema = new Schema({
   Year: { type: Number, min: 2000, max: 2030, required: false, unique: false },
   m: { type: Number, min: 1, max: 12, required: false, unique: false },
   d: { type: Number, min: 1, max: 31, required: false, unique: false },
   Time: { type: String, required: false, unique: false },
   Timezone: { type: String, required: false, unique: false },
   Cloudamount: { type: String, required: false, unique: false },
   Pressure: { type: String, required: false, unique: false },
   Precipitationamount: { type: String, required: false, unique: false },
   Relativehumidity: { type: String, required: false, unique: false },
   Precipitationintensity: { type: String, required: false, unique: false },
   Snowdepth: { type: String, required: false, unique: false },
   Airtemperature: { type: String, required: false, unique: false },
   Dewpointtemperature: { type: String, required: false, unique: false },
   Horizontalvisibility: { type: String, required: false, unique: false },
   Winddirection: { type: String, required: false, unique: false },
   Gustspeed: { type: String, required: false, unique: false },
   Windspeed: { type: String, required: false, unique: false },

});

module.exports = mongoose.model('system', systemSchema);