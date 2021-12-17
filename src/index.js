const express = require('express')
const getData = require('./services');


const app = express();
const port = 3000


app.use(express.static('public'));

app.get('/', (_, res) => {
  res.sendFile('index.html');
});

app.get('/test', async (_, res) => {
  try {
    res.json(await getData());
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Server error' });
  }
});


app.listen(port, () => console.log(`Running on port ${port}`));