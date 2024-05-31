const express = require('express');
const router = express.Router();
const connection = require('./db');



router.post('/', (req, res) => {
 WinRate=0;
  const { UserName, Email, Password } = req.body;
  const userData = { WinRate,UserName, Email, Password };
 

 
 userData.WinRate = 0; 
 
 connection.query('INSERT INTO player ( WinRate, UserName, Email, Password) VALUES ( ?, ?, ?, ?)', 
                  [ userData.WinRate, userData.UserName, userData.Email, userData.Password], 
                  (error, results) => {

    if (error) throw error;
    console.log('User added to database');
    res.redirect('/game.html');; 
  });
});

module.exports = router;
