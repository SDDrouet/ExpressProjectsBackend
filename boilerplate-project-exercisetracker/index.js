const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');

// import controllers
const userController = require('./controllers/UserController');
const exerciseController = require('./controllers/ExerciceController');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI);

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.use(bodyParser.urlencoded({ extended: false }));

// User routes
app.post('/api/users', userController.createUser);
app.get('/api/users', userController.getAllUsers);
app.get('/api/users/:id', userController.getUserById);

// Exercise routes
app.post('/api/users/:id/exercises', exerciseController.createExercise);
app.get('/api/users/:id/logs', exerciseController.usersExercisesLogs);


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
