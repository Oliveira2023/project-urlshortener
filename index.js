require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const dns = require('dns');
const url = require('url');

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

var urlBody;
var urlCurta;
app.post('/api/shorturl', function(req, res) {
  urlBody = req.body.url;
  urlCurta = urlBody.length;
  res.json({ original_url: urlBody, short_url: urlBody.length });
});

app.get('/api/shorturl/:url', function(req, res) {
  const urlParam = req.params.url;
  const urlE = urlBody + '/' + urlParam;
  const submittedUrl = url.parse(urlE);
  const hostname = submittedUrl.hostname;

  dns.lookup(hostname, function(err, address) {
    if (err) {
      res.json({ error: 'invalid url' });
    } else {
      console.log('valid URL: ' + address);
      if (urlParam == urlCurta) {
      res.redirect(urlBody);
      }
    }
  })

  
  // if (urlParam == urlCurta) {
  //   res.redirect(url);
  // } else {
  //   res.json({ error: 'invalid URL' });
  // }

  
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
