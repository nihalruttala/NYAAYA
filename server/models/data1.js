const { link } = require('fs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: String, required: true },
  barRegistrationNumber: { type: String, required: true, unique: true},
  lawyertype:{ type: String, required: true },
  experience:{ type: String, required: true },
  profileurl: { type: String, required: true },
  education: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  nalsa: { type: String, default: false,required: false },

  
  
}, { collection: 'Advocate' });

const UserData = mongoose.model('UserData', userSchema);

module.exports=UserData;
















