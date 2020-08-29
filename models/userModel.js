const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, dropDups: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
    preferedType: { type: String }

});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;