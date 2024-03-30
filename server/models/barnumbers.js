const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  barnumber: { type: String, required: true,  unique: true},
  
}, { collection: 'Bar-Numbers' });

const UserDatabar = mongoose.model('UserDatabar', userSchema);

module.exports=UserDatabar;

