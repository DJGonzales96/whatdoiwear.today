var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('index', { user: req.user });
  }
  else {
    res.render('index');
  }
});

/* DELETE home page (logout).*/
router.delete('/logout', (req, res, next) => {
  req.logOut();
  res.redirect('/');
});

module.exports = router;