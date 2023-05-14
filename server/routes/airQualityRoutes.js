import express from "express";
import AirQuality from "../models/AirQuality.js";
const router = express.Router();


router.post('/airquality', async (req, res) => {
    try {
      const airQualityData = req.body;
  
      for (const data of airQualityData) {
        const newAirQuality = new AirQuality(data);
        await newAirQuality.save();
      }
  
      res.status(201).json({ message: 'Data saved successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });



  
router.post('/api/sensor-data', async (req, res) => {
    try {
      const { aq, humidity, temperature } = req.body;
  
      const airQualityData = new AirQuality({
        aq,
        humidity,
        temperature
      });
  
      const savedData = await airQualityData.save();
  
      res.status(201).json(savedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la sauvegarde des données des capteurs.' });
    }
});
  
  
  

router.get('/airquality', async (req, res) => {
  try {
    const airQualityList = await AirQuality.find();
    res.json(airQualityList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
