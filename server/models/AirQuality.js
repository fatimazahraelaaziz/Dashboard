import mongoose from 'mongoose';


const airQualitySchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now
  },
  aq: {
    type: Number,
    required: true
  },
  humidity: {
    type: Number,
    required: true
  },
  temperature: {
    type: Number,
    required: true
  }
});

const AirQuality = mongoose.model('AirQuality', airQualitySchema);

export default AirQuality;
