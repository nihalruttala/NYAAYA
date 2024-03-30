const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  
  phone: { type: String, required: true },
  email: { type: String, required: true,unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
 
}, { collection: 'Litigant' });

const UserData2 = mongoose.model('UserData2', userSchema);

module.exports=UserData2;
