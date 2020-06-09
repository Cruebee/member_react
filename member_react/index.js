const express = require('express'),
  morgan = require('morgan');

const app = express();

var myLogger = function (req, res, next) {
  console.log(req.url + 'URL has been logged.');
  next();
};

let userEvents = [
  {
  title: 'Event to member',
  completed: false,
  important: true,
  travel_event: false
  },
  {
    title: 'Newest thing',
    completed: false,
    important: false,
    travel_event: false
  },
  {
    title: 'Travel Event',
    completed: false,
    important: true,
    travel_event: true
  },
  {
    title: 'doctor appt',
    completed: true,
    important: true,
    travel_event: false
  }
]

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Welcome to the Member app!');
});

app.get('/documentation', (req, res) => {
  res.sendFile('public/documentation.html', { root: __dirname });
});

app.get('/userEvents', function(req, res) {
  res.json(userEvents);
});

app.listen(8080, () => {
  console.log('This app is listening on Port 8080');
});
