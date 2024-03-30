const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    //Initial Details
    state: { type: String, required: true },
    district: { type: String, required: true },
    establishment: { type: String, required: true },
    establishmentemail: { type: String, required: true },
   caseType: { type: String, enum: ['Civil', 'Criminal'], required: true },
    reliefSought: { type: String, required: true },

    appellantRespondant: { type: String, required: true },
    mobileNo: { type: Number, required: true },

    //Litigant Details
    litigantType: { type: String, enum: ['Appellant', 'Respondent'], required: true },

    accused: { type: String, required: true },
     name: { type: String,  required: true },
    Relation: { type: String },
    age: { type: Number, required: true },
    dob: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    caste: { type: String, required: true },
    differentlyAble: { type: Boolean, default: false,required: false },

    email: { type: String, required: true },
    phone: { type: Number, required: true },
    occupation: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },

    litigantState: { type: String, required: true },
    litigantDistrict: { type: String, required: true },
    taluka: { type: String, required: true },
    village: { type: String, required: true },

    //Legal Heir
    partyName: { type: String, required: true },

    heirType: { type: String, enum: ['Plaintiff', 'Defendent'], required: true },
    heirName: { type: String, required: true },
    name2: { type: String,required: true  },
    relation2: { type: String,required: true  },
    heirDob: { type: String, required: true },
    heirAge: { type: Number, required: true },

    heirGender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    heirCaste: { type: String, required: true },
    heirDifferentlyAble: { type: Boolean, default: false ,required: false },

    heirEmail: { type: String, required: true},
    heirPhone: { type: Number, required: true },
    heirOccupation: { type: String, required: true },
    heirAddress: { type: String, required: true },
    heirPincode: { type: String, required: true },

    heirState: { type: String, required: true },
    heirDistrict: { type: String, required: true },
    heirTaluka: { type: String, required: true },
    heirVillage: { type: String, required: true },

    // //Fact Details
    factDate: { type: String, required: false },
    factTime: { type: String, required: false },
    fact: { type: String, required: false },

    //Case Datils
    actionCause: { type: String, required: true },
    reason: { type: String, required: true },
    actionDate: { type: String, required: true },

    disputeState: { type: String, required: true },
    disputeDistrict: { type: String, required: true },
    disputeTaluka: { type: String, required: true },
    disputeVillage: { type: String, required: true },

    act: { type: String, required: true },
    section: { type: String, required: true },
    CnrNumber: {type: String, required: true},
    uniqueCode: {type: String, required: true},


}, { collection: 'Case Filing' });

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;