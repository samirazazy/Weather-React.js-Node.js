const express = require('express');

const app = express();

const bodyParser = require('body-parser');

app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());

const router = require('./router');

app.use('/weather', router);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.json({ data: 'data' });
  console.log('get');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, '127.0.0.1', () =>
  console.log(`server started successfully at ${PORT}✨✨✨`)
);
