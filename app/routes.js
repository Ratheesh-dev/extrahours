// app/routes.js


module.exports = function (app, passport, util, http, jwt) {

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form

app.post('/api/employer/signup', function(req, res, next) {
    
  passport.authenticate('employer-signup', function(err, employer, info) {
      
    if (err) { 
        //return next(err); 
        res.json({
            status: false,
            message: 'failed1'
           
        });
    }
    if (employer) { 
        //return res.redirect('/login');
       var token = jwt.sign(employer, 'ilovescotchscotchyscotchscotch');
       res.json({
            status: true,
            message: 'success',
            employerName: employer.local.employerName,
            token: token
        });
    }else{
        res.json({
            status: false,
            message: 'Email already taken',
        });
    }
  })(req, res, next);
});



app.use(function(req, res, next) {
 //res.writeHead(200, { "Content-Type": "text/plain" });
//                res.end(util.inspect(req));
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];  // req.body.token

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, 'ilovescotchscotchyscotchscotch', function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

app.post('/api/test', function (req, res) {
              res.json({
                    status: false,
                    message: 'taken check'
                });
               
       });
//    app.get('/api/employer/signup',
//            passport.authenticate('employer-signup'),
//            function (req, res) {
//                res.writeHead(200, { "Content-Type": "text/plain" });
//                res.end(util.inspect(req));
//                res.json({
//                    success: true,
//                    message: 'success',
//                    employerName: req.user.local.employerName
//                });
//            });
    // app.get('/signup', function(req, res) {

    // // render the page and pass in any flash data if it exists
    // res.render('signup.ejs', { message: req.flash('signupMessage') });
    // });
//    app.get('/api/signup',
//            passport.authenticate('local-signup'),
//            function (req, res) {
//                // If this function gets called, authentication was successful.
//                // `req.user` contains the authenticated user.
//                //res.redirect('/users/' + req.user.username);
//                res.json({
//                    success: true,
//                    message: 'success',
//                    employerName: req.employer.employerName
//                });
//            });

    // process the signup form
    // app.post('/signup', passport.authenticate('local-signup', {
    // successRedirect : '/profile', // redirect to the secure profile section
    // failureRedirect : '/signup', // redirect back to the signup page if there is an error
    // failureFlash : true // allow flash messages
    // }));

    // app.post('/signup',
    // passport.authenticate('local-signup'),
    // function(req, res) {
    // // If this function gets called, authentication was successful.
    // // `req.user` contains the authenticated user.
    // //res.redirect('/users/' + req.user.username);
    // res.json({ success: true, message: 'success.' });
    // });

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
  
    // =====================================
    // LOGOUT ==============================
    // =====================================
//    app.get('/logout', function (req, res) {
//        req.logout();
//        res.redirect('/');
//    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
