
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const compression = require('compression');
const cors = require('cors');
const path = require('path');
const crons = require('./config/crons');
const comments = require("./Comments/comments");

require('dotenv').config();

const app = express();
app.use(compression());

require('./config/passport')(passport);

mongoose
  .connect(
    process.env.MONGO_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  )
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.static(path.join(__dirname, '/client/public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: "text/*" }));

if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use('/api/users', require('./routes/users'));
app.use('/api/course', require('./routes/course'));
app.use('/api/comment', require('./routes/comment'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} ...`);
});

comments.setupSocket(server);