const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
 
  
  employeeid:{ type: String, required: true },
  
  phone: { type: String, required: true },
  email: { type: String,required: true, unique: true  },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
 
}, { collection: 'Adminstrator' });

const UserData3 = mongoose.model('UserData3', userSchema);

module.exports=UserData3;

