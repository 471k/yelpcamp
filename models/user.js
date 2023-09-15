const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// add on username, password, makes sure those username are unique and duplicated
// and gives us some additionsal mmethods that we can use.
UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User", UserSchema);