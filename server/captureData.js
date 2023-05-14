import { SerialPort } from 'serialport';
import mongoose from 'mongoose';
import { ReadlineParser } from '@serialport/parser-readline'
import dotenv from "dotenv";
import AirQuality from "./models/AirQuality.js";

dotenv.config();
// Récupération de l'URL de connexion à MongoDB depuis la variable d'environnement
const mongoUrl = process.env.MONGO_URL;

// Connexion à la base de données MongoDB avec Mongoose
mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch(error => console.error('Erreur de connexion à la base de données:', error));


// Configuration du port série pour lire les données de l'Arduino
const port = new SerialPort({
    path:"COM12",
    baudRate:9600,
  });

  port.on('error', function(err) { console.log('Error: ', err.message); })

const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }))


// Lorsque des données sont reçues depuis l'Arduino
parser.on('data', async (data) => {
  try {
    const [aq, humidity, temperature] = data.split('\t');

    const airQualityData = new AirQuality({
      aq: parseFloat(aq),
      humidity: parseFloat(humidity),
      temperature: parseFloat(temperature)
    });

    await airQualityData.save();

    console.log('Données capturées enregistrées avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données capturées:', error);
  }
});
