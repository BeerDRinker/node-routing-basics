const express = require('express');
const {
  mongoose
} = require('./app/db/mongoose');
const bodyParser = require('body-parser');

const User = require('./app/models/user');


let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// const router = express.Router();

app.use((req, res, next) => {
  console.log('Hello I am middleware');
  next();
});

app.get('/', (req, res) => {
  res.json({
    message: 'hooray! welcome to our api!'
  });
});


// ******** Creating user ********
app.post('/users', async(req, res) => {
  let user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  await user.save((err) => {
    if (err) {
      res.send(err);
    } else {
      res.json({
        message: 'User created'
      });
    }
  });
});

// ******** Getting all user ********
app.get('/users', async(req, res) => {
  await User.find((err, users) => {
    if (err) {
      res.send(err);
    } else {
      res.json(users);
    }
  });
});

// ******** Getting user ********
app.get('/users/:user_id', async(req, res) => {
  await User.findById(req.params.user_id, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      res.json(user);
    }
  });
});

// ******** Updating user ********
app.put('/users/:user_id', async(req, res) => {
  await User.findById(req.params.user_id, (err, user) => {
    if (err) {
      res.send(err)
    } else {
      user.name = req.body.name;
      user.save((err) => {
        if (err) {
          res.send(err);
        } else {
          res.json({
            message: 'User updated'
          });
        }
      });
    }
  });
});

// ******** Deleting user ********
app.delete('/users/:user_id', async(req, res) => {
  await User.findByIdAndRemove({
    _id: req.params.user_id
  }, (err, user) => {
    if (err) {
      res.send(err);
    } else {
      res.json({ message: 'Successfully deleted' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server runs on port ${port}...`);
});