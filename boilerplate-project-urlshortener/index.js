require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const bodyParser = require('body-parser');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

// Middleware global para parsear x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

let encodedUrls = [];

app.post('/api/shorturl', (req, res) => {
  const regex = /^[a-zA-Z]+:\/\/[^\s/$.?#].[^\s]*$/;
  let original_url = req.body.url;
  console.log(original_url);
  if(regex.test(original_url)) {
    short_url = encodedUrls.length;
    encodedUrls.push(original_url);

    res.json({original_url, short_url});
  } else {
    res.json({ error: 'invalid url' });
  }  
});

app.get('/api/shorturl/:urlId', (req, res) => {
  try {
    const index = Number.parseInt(req.params.urlId);

    if (!encodedUrls[index]) {
      return res.json({ error: "No short URL found for the given input" });
    }

    res.redirect(encodedUrls[index]); // redirige al navegador
  } catch (error) {
    res.json({ error: "No short URL found for the given input" });
  } 
});



app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
