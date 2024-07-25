require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// app.post('/api/shorturl', function(req, res) {
//   const url = req.body.url;
//   res.json({ original_url: url, short_url: url.length });
// }); 

// app.get('/api/shorturl/:url', function(req, res) {
//   const url = req.params.url;
//   res.json({ original_url: url, short_url: url.length });
// });

app.post('/api/shorturl', function(req, res) {
  const url = req.body.url;
  res.json({ original_url: url, short_url: url.length });

});
app.get('/api/shorturl/:url', function(req, res) {
  const url = req.params.url;
  res.json({ original_url: url, short_url: url.length });
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
