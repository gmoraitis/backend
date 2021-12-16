import express from 'express';
import getData from './services';

const app = express();
const port = 3000


app.use(express.static('public'));

app.get('/', (_, res) => {
  res.sendFile('index.html');
  // res.send('Hello World!')
});

app.get('/test', async (_, res) => {
  try {
    res.json(await getData());
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    res.status(500).json({ message: 'Server error, please try again later' });
  }
});


app.listen(port, () => console.log(`Running on port ${port}`));