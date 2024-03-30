const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  employeeId: { type: String, required: true,  unique: true},
  courtName:{ type: String, required: true  },
  courtPlace:{ type: String, required: true},
  
}, { collection: 'Employee-IDs' });

const UserDataempid = mongoose.model('UserDataempid', userSchema);

module.exports=UserDataempid;

