const express = require('express');
const router = express.Router();
const connection = require('./db');


// request
router.post('/', (req, res) => {
 
  const { UserName,  Password } = req.body;
  const userData = { UserName, Password };
 

 connection.query('Select * from player WHERE UserName = ? AND Password = ?', 
                  [ userData.UserName,  userData.Password], 
                 
                  (error, results) => {

    if (error) {
      
    }
    if(results == 0){
        res.redirect('/signin.html')
       
    } else {

    
    console.log('User logged in!');
    res.redirect('/game.html');
     
    }
  });

});

module.exports = router;