// app/routes.js


module.exports = function (app, passport, util, http) {

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
// app.get('/api/signup',
//            passport.authenticate('local-signup'),
//            function (req, res) {
//                //res.writeHead(200, { "Content-Type": "text/plain" });
//                //res.end(util.inspect(req.user));
//                res.json({
//                    success: true,
//                    message: 'success',
//                   name:req.user.local.email
//                });
//            });
    app.get('/api/employer/signup',
            passport.authenticate('employer-signup'),
            function (req, res) {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end(util.inspect(req));
                res.json({
                    success: true,
                    message: 'success',
                    employerName: req.user.local.employerName
                });
            });
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
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
