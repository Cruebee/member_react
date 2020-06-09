const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();
app.use(morgan('common'));
app.use(epress.static('public'));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

let users = [
  {
    id: 1,
    username: 'Timmy',
    password: 'password123',
    email: 'myemail@email.com'
  }
]

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

app.get('/', (req, res) => {
  res.send('Welcome to the Member app!');
});

app.get('/userEvents', function(req, res) {
  res.json(userEvents);
});

app.get('/users', (req, res) => {
  res.json(users);
});

app.post('/users', (req, res) => {
  let newUser = req.body;

  if (!newUser.name) {
    const message = 'Missing name in request body';
    res.status(400).send(message);
  }else{
    newUser.id = uuid.v4();
    users.push(newUser);
    res.status(201).send(newUser);
  }
});

app.put('/users/:Username', (req, res) => {
  let user = users.find(user => {
    return user.id === req.params.id;
  });
  res.status(201).send('User ' + req.params.Username + ' \'s information has been updated!');
});

app.delete('/users/:Username', (req, res) => {
  let user = users.find(user => {
    return user.id === req.params.id;
  });
  if (user) {
    users = users.filter(function(obj) {
      return obj.id !== req.params.id;
    });
    res.status(201).send('User ' + req.params.id + ' has been removed.');
  }
});

app.listen(8080, () => {
  console.log('This app is listening on Port 8080');
});
