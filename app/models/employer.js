// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
var employerSchema = mongoose.Schema({
    local: {
        employerName: String,
        companyName: String,
        industryCode: String,
        address1: String,
        address2: String,
        city: String,
        state: String,
        zipCode: String,
        primaryContact: String,
        phoneNumber: String,
        email: String,
        password: String

    }
    // ,
    // facebook         : {
    // id           : String,
    // token        : String,
    // email        : String,
    // name         : String
    // },
    // twitter          : {
    // id           : String,
    // token        : String,
    // displayName  : String,
    // username     : String
    // },
    // google           : {
    // id           : String,
    // token        : String,
    // email        : String,
    // name         : String
    // }

});

// methods ======================
// generating a hash
employerSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
employerSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Employer', employerSchema);