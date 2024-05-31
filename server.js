const express = require('express');
const signupRouter = require('./signupRouter');
const signinRouter = require('./signinRouter');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname + '/public')));

app.use('/signup', signupRouter);

app.use('/signin', signinRouter);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});