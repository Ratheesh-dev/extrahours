// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
//var User = require('../app/models/user');
var util = require('util');
var http = require('http');
var Employer = require('../app/models/employer');

// expose this function to our app using module.exports
module.exports = function (passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function (employer, done) {
        done(null, employer.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        Employer.findById(id, function (err, employer) {
            done(err, employer);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('employer-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
//            function (req, employerName, companyName, industryCode, address1, address2, city, state, zipCode, primaryContact, phoneNumber, email, password, done) {
               function (req, email, password, done) {
    process.nextTick(function () {
                    Employer.findOne({'local.email': email}, function (err, employer) {
                        // if there are any errors, return the error
                       
                        if (err)
                            return done(err);
                        if (employer) {
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        } else {
                            //req.params = {acc_status:1};
                            // if there is no Employer with that email
                            // create the Employer
                            var newEmployer = new Employer();
                            // set the Employer's local credentials
                            newEmployer.local.email = email;
                            newEmployer.local.password = newEmployer.generateHash(password);
                            newEmployer.local.employerName = req.query.employerName;
                            newEmployer.local.companyName = req.query.companyName;
                            newEmployer.local.industryCode = req.query.industryCode;
                            newEmployer.local.address1 = req.query.address1;
                            newEmployer.local.address2 = req.query.address2;
                            newEmployer.local.city = req.query.city;
                            newEmployer.local.state = req.query.state;
                            newEmployer.local.zipCode = req.query.zipCode;
                            newEmployer.local.primaryContact = req.query.primaryContact;
                            newEmployer.local.phoneNumber = req.query.phoneNumber;


                            // save the Employer
                            newEmployer.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newEmployer);
                            });
                        }

                    });
                });
            }
    ));



    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
            function (req, email, password, done) {

                // asynchronous
                // User.findOne wont fire unless data is sent back
                process.nextTick(function () {

                    // find a user whose email is the same as the forms email
                    // we are checking to see if the user trying to login already exists
                    User.findOne({'local.email': email}, function (err, user) {
                        // if there are any errors, return the error
                        if (err)
                            return done(err);

                        // check to see if theres already a user with that email
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        } else {

                            // if there is no user with that email
                            // create the user
                            var newUser = new User();

                            // set the user's local credentials
                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(password);

                            // save the user
                            newUser.save(function (err) {
                                if (err)
                                    throw err;
                                return done(null, newUser);
                            });
                        }

                    });

                });

            }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback
    },
            function (req, email, password, done) { // callback with email and password from our form

                // find a user whose email is the same as the forms email
                // we are checking to see if the user trying to login already exists
                User.findOne({'local.email': email}, function (err, user) {
                    // if there are any errors, return the error before anything else
                    if (err)
                        return done(err);

                    // if no user is found, return the message
                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                    // if the user is found but the password is wrong
                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    return done(null, user);
                });

            }));

};