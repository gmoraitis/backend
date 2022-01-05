const express = require('express')
const manipulateData = require('./services');


const app = express();
const port = 3001;


app.use(express.static('public'));


app.get('/', (_, res) => {
  res.sendFile('index.html');
});

app.get('/data', async (_, res) => {
  try {
    res.json(await manipulateData());
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));