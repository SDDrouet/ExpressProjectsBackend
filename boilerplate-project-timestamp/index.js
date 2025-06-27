// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {
  const dateString = req.params.date;

  let date;

  // Si es un número válido, trata como timestamp (en milisegundos o segundos)
  if (!isNaN(dateString)) {
    const timestamp = parseInt(dateString);
    // Si tiene 10 dígitos, es segundos → multiplica por 1000
    date = new Date(dateString.length === 13 ? timestamp : timestamp * 1000);
  } else {
    date = new Date(dateString); // intenta parsear cualquier string válida
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString(),
  });
});

app.get("/api/", function (req, res) {
    let date = new Date();
    const dateFormat = date.toUTCString();
    const unix = date.getTime();
    res.json({unix, utc: dateFormat});
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
