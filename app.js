const express = require('express');
const request = require('request');
const cors = require('cors');
const bodyParser = require('body-parser');
// const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/favicon.ico', (req, res) => res.status(204));

// Server Home Route
app.get('/', (req, res) => {
  res.send('Psykologie Server');
});

// Subscribe Route
app.post('/subscribe', (req, res) => {
  const { email } = req.body;
  console.log(req.body);

  const mcData = {
    members: [
      {
        email_address: email,
        status: 'pending'
      }
    ]
  };

  const mcDataPost = JSON.stringify(mcData);

  const options = {
    url: 'https://us19.api.mailchimp.com/3.0/lists/765a2a4bab',
    method: 'POST',
    headers: {
      Authorization: 'auth 0161591f93ae6dfb1b0f819582d29768-us19'
    },
    body: mcDataPost
  };

  if (email) {
    // successful so far
    request(options, (err, response, body) => {
      if (err) {
        res.json({ error: err });
      } else {
        res.sendStatus(200);
      }
    });
  } else {
    res.status(404).send({ message: 'Failed' });
  }
});

// Port Setup
const PORT = process.env.PORT || 5000;

// Server Listen
app.listen(PORT, () => {
  console.log('Server Started!');
});
