const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const { SECRET } = process.env;

router.post('/register', async (req, res) => {
  try {
  } catch (error) {
    return res.redirect("/register");
  }

  db.execute('SELECT * FROM users WHERE email = ?', [req.body.email], function(err, results) {
    if (err) {
      res.json({status: "error", message: err});
      return;
    }
    if (results.length > 0) {
      res.render("register.hbs" ,{message: "Email already exists!"});
      return;
    } else {
      bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if (err) {
          res.json({status: "error", message: err});
          return;
        }
        db.execute(
          'INSERT INTO users (email, username, fname, lname, password) VALUES (?, ?, ?, ?, ?)',
          [req.body.email, req.body.username, req.body.fname, req.body.lname, hash],
          function(err, results, fields) {
            if (err) {
              res.json({status: "error", message: err});
              return;
            }
            res.redirect("/login");
          }
        );
      });
    }
  });
});

router.get('/register', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.redirect('/dashboard');
  } else {
    res.render('register.hbs');
  }
});

router.get('/login', (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res.redirect('/dashboard');
  } else {
    res.render("login.hbs", {layout: false});
  }
});

router.post('/login', async (req, res) => {
  try {
      db.execute('SELECT * FROM users WHERE username=?', [req.body.username], function(err, users, fields) {
          if (err || users.length == 0) {
              return res.render("login.hbs", {layout: false, emailMessage: "Username does not exist" });
          }

          bcrypt.compare(req.body.password, users[0].password, function(err, isLogin) {
              if (err) {
                  return res.render("login.hbs", {layout: false, passwordMessage: "Error occurred. Try again." });
              }

              if (isLogin) {
                  const token = jwt.sign({
                      id: users[0].id,
                      email: users[0].email,
                      username: users[0].username
                  }, SECRET, { expiresIn: '1h' });

                  return res.cookie('token', token, { httpOnly: true }).redirect('/dashboard');
              } else {
                  return res.render("login.hbs", {layout: false, passwordMessage: "Wrong password" });
              }
          });
      });
  } catch (error) {
      return res.redirect("/login");
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

module.exports = router;
