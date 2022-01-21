const { model, Schema } = require('mongoose')
// TODO : add admin prop
const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    type: String // = User -> normal user 
                 // = Admin -> Same as normal user but with the ability to see all the writes to the database 
});
module.exports = model('User', userSchema)