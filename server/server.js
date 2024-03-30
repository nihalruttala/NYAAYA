
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors=require('cors');
const multer = require('multer');
const app = express();
const PORT = 3001;
const mongoose=require('mongoose');
const UserData=require('./models/data1');
const UserData2=require('./models/data2');
const UserData3=require('./models/data3');
const File = require('./models/file');
const Detail = require('./models/Detail'); 
const UserDatabar = require('./models/barnumbers');
const UserDataempid=require('./models/Employeeid');
const rating=require('./models/rating');
const Case= require('./models/caseMain');
// const fs = require('fs');
const pdf = require('html-pdf');




app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// for mongo Compass {offline}
// mongoose.connect('mongodb://localhost:27017/Nyaaaya', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB connected');
// }).catch((err) => {
//   console.error('MongoDB connection error:', err);
// });
// for mongo Atlas { AWS cloud Service}

mongoose.connect("mongodb+srv://nyaaya160:I98ky9zZvdaRmuzo@cluster0.ocnwsoc.mongodb.net/NYAAYA?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});


//// Advocate signup
app.post('/signup/advocate', async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ status: 'error', message: 'Password and Confirm Password do not match' });
    }
    
    
    
    const isBarNumberExists = await UserData.exists({ barRegistrationNumber: req.body.barRegistrationNumber });

if (isBarNumberExists) {
  return res.status(400).json({ status: 'error', message: 'Bar Registration Number already exists' });
}
    await UserData.create({
      name: req.body.name,
      state: req.body.state,
      gender: req.body.gender,
      dob: req.body.dob,
      barRegistrationNumber: req.body.barRegistrationNumber,
      lawyertype:req.body.lawyertype,
      experience:req.body.experience,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      profileurl: req.body.profileurl,
      education: req.body.education,
      nalsa: req.body.nalsa,

     
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nyaaya160@gmail.com', 
        pass: 'olhf wjag bphj zucq', 
      },
    });

    const mailOptions = {
      from: 'nyaaya160@gmail.com',
      to: req.body.email,
      subject: 'Registration Successful',
      html:'<p>Thank you for registering!</p>',
      html:'<p>welcome to Nyaaaya</p>,'
    };

    await transporter.sendMail(mailOptions);

    
    res.json({ status: 'ok', message: 'Form submitted successfully'});

    

  } catch (err) {
    if(err.code=== 11000)
    {
     if(err.keyPattern.email){
      res.status(400).json({status: 'error',message: " Email already exists" });}
      

    else {
      
      res.status(500).json({ status: 'error', error: err.message });
   }}
   else{
    res.status(500).json({ status: 'error', error: err.message });}
   }
});


///////// Advocate login
app.post('/login/advocate', async (req, res) => {
  console.log(req.body);
  console.log('Received login request:', req.body);
  try {
    const { email, password } = req.body;
    const user = await UserData.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    if (password !== user.password) {
      return res.status(401).json({ status: 'error', message: 'Invalid password' });
    }
    res.json({ status: 'ok', user });

  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

////// Litigant signup
app.post('/signup/litigant', async (req, res) => {
  console.log(req.body);
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ status: 'error', message: 'Password and Confirm Password do not match' });
    }
    

    await UserData2.create({
    name: req.body.name, 
    state:req.body.state,
    gender: req.body.gender,
    dob: req.body.dob,
    
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
 

    });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nyaaya160@gmail.com', 
        pass: 'olhf wjag bphj zucq', 
      },
    });

    const mailOptions = {
      from: 'nyaaya160@gmail.com',
      to: req.body.email,
      subject: 'Registration Successful',
      html:'<p>Thank you for registering!</p>',
      
      html:req.body.name,
      
    };

    await transporter.sendMail(mailOptions);

    
    res.json({ status: 'ok', message: 'Form submitted successfully'});
  } catch (err) {
    if(err.code=== 11000)
    {
     if(err.keyPattern.email){
      res.status(400).json({status: 'error',message: " Email already exists" });}
      

    else {
      
      res.status(500).json({ status: 'error', error: err.message });
   }}
   else{
    res.status(500).json({ status: 'error', error: err.message });}
   }
});


//// Litigant login

app.post('/login/litigant', async (req, res) => {
  console.log(req.body);
  console.log('Received login request:', req.body);
  try {
    const { email, password } = req.body;
    const user = await UserData2.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    if (password !== user.password) {
      return res.status(401).json({ status: 'error', message: 'Invalid password' });
    }
    res.json({ status: 'ok', user });

  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});



///// Administrator signup
app.post('/signup/administrator', async (req, res) => {
  console.log(req.body);
  try {
    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ status: 'error', message: 'Password and Confirm Password do not match' });
    }

    const isEmployeeidExists = await UserData3.exists({ employeeid: req.body.employeeid });

if (isEmployeeidExists) {
  return res.status(400).json({ status: 'error', message: 'Employee ID already exists' });
}

    await UserData3.create({
    name: req.body.name, 
    employeeid: req.body.employeeid,
    
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
   

    });
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nyaaya160@gmail.com', 
        pass: 'olhf wjag bphj zucq', 
      },
    });

    const mailOptions = {
      from: 'nyaaya160@gmail.com',
      to: req.body.email,
      subject: 'Registration Successful',
      html:'<p>Thank you for registering!</p>',
      html:'<p>welcome to Nyaaaya</p>',
      
    };

    await transporter.sendMail(mailOptions);

    
    res.json({ status: 'ok', message: 'Form submitted successfully'});

   
  } catch (err) {
    if(err.code=== 11000)
    {
     if(err.keyPattern.email){
      res.status(400).json({status: 'error',message: " Email already exists" });}

    else {
      
      res.status(500).json({ status: 'error', error: err.message });
  }}
    
    else{
    res.status(500).json({ status: 'error', error: err.message });}
  
    
  }
});
//////////// Adminstrator login

app.post('/login/administrator', async (req, res) => {
  console.log(req.body);
  console.log('Received login request:', req.body);
  try {
    const { email, password } = req.body;
    const user = await UserData3.findOne({ email });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    if (password !== user.password) {
      return res.status(401).json({ status: 'error', message: 'Invalid password' });
    }
    res.json({ status: 'ok', user });

  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

/// updating  case details by adminstrator

app.post('/details', async (req, res) => {
  try {
    const { cnr,title, date, description } = req.body;

    const caseExists = await Case.findOne({ CnrNumber: cnr });
    if (!caseExists) {
      return res.status(400).json({ error: 'Invalid CNR' });
    }

    if (!cnr || !title || !date || !description) {
      return res.status(400).json({ error: 'Please provide all details.' });
    }
    const detail = new Detail({
      cnr,
      title,
      date,
      description,
    });
    const savedDetail = await detail.save();

    res.status(201).json({ message: 'Details stored successfully.', detail: savedDetail });
  } catch (error) {
    console.error('Error saving detail:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

/// Admin user info

app.get('/api/user', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await UserData3.findOne({ email });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

/// litigant user info

app.get('/api/user1', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await UserData2.findOne({ email });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

////  advocate user info 

app.get('/api/user2', async (req, res) => {
  const { email } = req.query;

  try {
    const user = await UserData.findOne({ email });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ status: 'error', message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// case details for given crn to tack 

app.get('/api/cd', async (req, res) => {
  const { cnr } = req.query;

  try {
    const users = await Detail.find({ cnr });

    if (users && users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ status: 'error', message: 'No users found for the given CNR' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

// case tracking by crn 

app.post('/api/checkCNR', async (req, res) => {
  console.log(req.body);
  
  try {
    const { cnr} = req.body;
    const user = await Detail.findOne({ cnr });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    
    res.json({ status: 'ok', user });

  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

//// to upload docs




const storage = multer.memoryStorage();
const upload = multer({ storage: storage,limits: {
  fileSize: 5 * 1024 * 1024, 
}, });


app.post('/upload', upload.array('fileUpload'), async (req, res) => {


  
  try {
   
    const currentDate = new Date().toLocaleDateString();
    const fileName = req.body.fileName;
    const cnr = req.body.cnr;
     
    const cnrExists = await Case.findOne({ CnrNumber: cnr });
    if (!cnrExists) {
      return res.status(400).json({ error: 'Invalid CNR' });
    }
    
    for (let i = 0; i < req.files.length; i++) {
      const file = new File({
        date: currentDate,
        name: fileName,
        cnr: cnr,
        filename: req.files[i].originalname,
        content: req.files[i].buffer.toString("base64"),
        fileType: req.files[i].mimetype.split('/')[0],
      });
      await file.save();
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
////

/// uploading files 

app.get('/files', async (req, res) => {
  try {
    const cnr = req.query.cnr;
    console.log('Received CNR:', cnr);
    const files = await File.find({ cnr: cnr });
    
    res.json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// accessibg  case documents
app.get('/files/:filename', async (req, res) => {
  try {
    const filename = req.params.filename;
    
    const file = await File.findOne({ filename });

    if (file && file.content) {
      res.send(file.content.toString());
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
// validating cnr number and uniquecode
app.post('/validate-cnr&uniquecode', async (req, res) => {
  console.log(req.body);

  
  try {
    const { CnrNumber,uniqueCode} = req.body;
    const user = await Case.findOne({ CnrNumber,uniqueCode });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    if (uniqueCode !== user.uniqueCode) {
      return res.status(401).json({ status: 'error', message: 'Invalid details' });
    }

    // Successful login
    res.json({ status: 'ok', user });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ status: 'error', message: 'An error occurred during login. Please try again.' });
  }
});

/// lawyer profiles 
app.get('/api/lawyers', async (req, res) => {
  try {
    const User = await UserData.find();
    res.json(User);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


/// Advocate password reset

app.post('/resetpassword-Advocate', async (req, res) => {
  const { email, dob, phone, newPassword } = req.body;
  console.log('Request Body:', req.body);

  try {
    const user = await UserData.findOne({ email, dob, phone });
    if (!user) {
      return res.status(404).json({ error: 'User not found or details are incorrect.' });
    }
    user.password = newPassword;
    user.confirmPassword=newPassword;
    await user.save();
    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});

///// Litigant password reset

app.post('/resetpassword-Litigant', async (req, res) => {
  const { email, dob, phone, newPassword } = req.body;
  console.log('Request Body:', req.body);

  try {
    const user = await UserData2.findOne({ email, dob, phone });

    if (!user) {
      return res.status(404).json({ error: 'User not found or details are incorrect.' });
    }
    user.password = newPassword;
    user.confirmPassword=newPassword;
    await user.save();

    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});

///// Adminstrator  password reset

app.post('/resetpassword-Adminstrator', async (req, res) => {
  const { email, employeeid, phone, newPassword } = req.body;
  console.log('Request Body:', req.body);
  try {
    const user = await UserData3.findOne({ email, employeeid, phone });
    if (!user) {
      return res.status(404).json({ error: 'User not found or details are incorrect.' });
    }

    user.password = newPassword;
    user.confirmPassword=newPassword;
    await user.save();

    res.json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error during password reset:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});

/// change password
/// Advocate Change Password

app.post('/ChangePassword1-Advocate', async (req, res) => {
  const { email, password, newPassword } = req.body;
  console.log('Request Body:', req.body);

  try {

    const { newPassword, confirmnewPassword } = req.body;

    
    const user = await UserData.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: 'User not found or details are incorrect.' });
    }
    else if (newPassword !== confirmnewPassword) {
      return res.status(400).json({ status: 'error', message: 'Password and Confirm Password do not match' });
    }
    user.password = newPassword;
    user.confirmPassword=newPassword;
    await user.save();
    res.json({ message: 'Password change successful.' });
  } catch (error) {
    
    console.error('Error during password change:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});


//// To verify  Bar Registration Number for Advocate


app.post('/verify', async (req, res) => {
  console.log(req.body);
  
  try {
    const { barRegistrationNumber } = req.body; 
    const user = await UserDatabar.findOne({ barnumber: barRegistrationNumber });


    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    if (barRegistrationNumber !== user.barnumber) {
      return res.status(401).json({ status: 'error', message: 'Invalid password' });
    }
    res.json({ status: 'ok', user });

  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});

////
app.post('/verifyid', async (req, res) => {
  console.log(req.body);
  
  try {
    const { employeeid }  = req.body; 
    const user = await UserDataempid.findOne({ employeeId: employeeid  });


    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    if (employeeid !== user.employeeId) {
      return res.status(401).json({ status: 'error', message: 'Invalid id' });
    }
    res.json({ status: 'ok', user });

  } catch (err) {
    res.status(500).json({ status: 'error', error: err.message });
  }
});


///// OTP ---- Code

const otpStorage = {};

//  generate a random numeric OTP
const generateNumericOTP = () => Math.floor(100000 + Math.random() * 900000);



// to send otp to Email
app.post('/send-otp', (req, res) => {
  const { email } = req.body;

  const otp = generateNumericOTP();
  otpStorage[email] = otp;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {

            user: "nyaaya160@gmail.com", 
             pass: "olhf wjag bphj zucq", 
    },
  });

  

 
  const mailOptions = {
    from: 'nyaaya160@gmail.com',
    to: email,
    subject: 'OTP Verification',
    text: `Your OTP for verification is: ${otp}`,
  };

///  transporting otp to mail

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ status: 'error', message: 'Failed to send OTP' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ status: 'ok', message: 'OTP sent successfully' });
    }
  });
});

// to verify otp 

app.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  if (otpStorage[email] && otpStorage[email] === otp) {
    res.json({ status: 'ok', message: 'OTP verification successful' });
  } else {
    res.status(400).json({ status: 'error', message: 'Invalid OTP' });
  }
});


//// case filing

app.post('/api/casefiling', async (req, res) => {
  console.log("hello vinnu",req.body);
  try {
    
    await Case.create({
    
    state: req.body.state,
    district: req.body.district,
    establishment: req.body.establishment,
    establishmentemail: req.body.establishmentemail,
    caseType: req.body.caseType,
    reliefSought: req.body.reliefSought,
    appellantRespondant: req.body.appellantRespondant,
    mobileNo: req.body.mobileNo,

    litigantType: req.body.litigantType,
    accused: req.body.accused,
    name: req.body.name,
    Relation: req.body.Relation,
    age: req.body.age,
    dob: req.body.dob,
    gender: req.body.gender,
    caste: req.body.caste,
    differentlyAble: req.body.differentlyAble,
    email: req.body.email,
    phone: req.body.phone,
    occupation: req.body.occupation,
    address: req.body.address,
    pincode: req.body.pincode,
    litigantState: req.body.litigantState,
    litigantDistrict: req.body.litigantDistrict,
    taluka: req.body.taluka,
    village: req.body.village,

    partyName: req.body.partyName,
    heirType: req.body.heirType,
    heirName: req.body.heirName,
    name2: req.body.name2,
    relation2: req.body.relation2,
    heirDob: req.body.heirDob,
    heirAge: req.body.heirAge,
    heirGender: req.body.heirGender,
    heirCaste: req.body.heirCaste,
    heirDifferentlyAble: req.body.heirDifferentlyAble,
    heirEmail: req.body.heirEmail,
    heirPhone: req.body.heirPhone,
    heirOccupation: req.body.heirOccupation,
    heirAddress: req.body.heirAddress,
    heirPincode: req.body.heirPincode,
    heirState: req.body.heirState,
    heirDistrict: req.body.heirDistrict,
    heirTaluka: req.body.heirTaluka,
    heirVillage: req.body.heirVillage,

    factDate: req.body.factDate,
    factTime: req.body.factTime,
    fact: req.body.fact,

    actionCause: req.body.actionCause,
    reason: req.body.reason,
    actionDate: req.body.actionDate,
    disputeState: req.body.disputeState,
    disputeDistrict: req.body.disputeDistrict,
    disputeTaluka: req.body.disputeTaluka,
    disputeVillage: req.body.disputeVillage,
    act: req.body.act,
    section: req.body.section,
    CnrNumber: req.body.CnrNumber,
    uniqueCode: req.body.uniqueCode

    }
    
    );

    res.status(200).json({ message: 'Case filed successfully' });
  } catch (error) {
    console.error('Error submitting case:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/submit-form', async(req, res) => {
  const {formData,email} = req.body;
    sendEmail(formData);

 
  res.status(200).json({ message: 'Email sent successfully' });

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nyaaya160@gmail.com', 
      pass: 'olhf wjag bphj zucq', 
    },
  });
  const mailOptions = {
    from: 'nyaaya160@gmail.com',
    to:[ formData.email,email],
    subject: 'Unique Code For Accesing Case Documents',
    html:`unique code: ${formData.uniqueCode} for CaseNumber ${formData.CnrNumber}`,
   
  };

  

  await transporter.sendMail(mailOptions);
});

function sendEmail(formData) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nyaaya160@gmail.com', 
      pass: 'olhf wjag bphj zucq', 
    },
  });

  const htmlContent = generateHTML(formData);

  // Convert HTML to PDF
  pdf.create(htmlContent).toBuffer((err, buffer) => {
    if (err) {
      console.error('Error creating PDF:', err);
      return;
    }

    const mailOptions = {
      from: 'nyaaya160@gmail.com',
      to: formData.establishmentemail,
      subject: 'New Form Submission',
      attachments: [
        {
          filename: 'form_data.pdf',
          content: buffer,
        },
      ],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  });
}




function generateHTML(formData) {

  const htmlContent = `
  <!DOCTYPE html>
  <html>
  <head></head>
  <body>
  <center>
  <table border="3">
    <tr>
      <td colspan="2" style="text-align: center;"><h1 id='csHeading'>CASE FILE</h1></td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: center;"><h3 id='cfilingCNR'>CNR : ${formData.CnrNumber}</h3></td>
    </tr>
    <tr>
      <td colspan="2" style="background-color: #C1B192; text-align: center;"><b>ESTABLISHMENT</b></td>
    </tr>
    <tr>
      <td><b>STATE:</b> ${formData.state}</td>
      <td><b>DISTRICT:</b> ${formData.district}</td>
    </tr>
    <tr>
      <td><b>ESTABLISHMENT:</b> ${formData.establishment}</td>
      <td><b>CASE TYPE:</b> ${formData.caseType}</td>
    </tr>
    <tr>
      <td><b>RELIEF SOUGHT:</b> ${formData.reliefSought}</td>
      <td><b>APPELLANT / RESPONDANT:</b> ${formData.appellantRespondant}</td>
    </tr>
    </tr>
    <tr>
      <td colspan="2" style="text-align: left; padding: 3px;"><b>MOBILE NO.:</b>${formData.mobileNo}</td>
    </tr>
    
    
    <tr>
      <td colspan="2" style="background-color: #C1B192; text-align: center;"><b>LITIGANT DETAILS</b></td>
    </tr>
    <tr>
      <td><b>ACCUSED:</b> ${formData.accused}</td>
      <td><b>NAME:</b> ${formData.name}</td>
    </tr>
    <tr>
      <td><b>RELATION:</b> ${formData.relation}</td>
      <td><b>AGE:</b> ${formData.age}</td>
    </tr>    
    <tr>
      <td><b>DOB:</b> ${formData.dob}</td>
      <td><b>GENDER:</b> ${formData.gender}</td>
    </tr>    
    <tr>
      <td><b>CASTE:</b> ${formData.caste}</td>
      <td><b>DIFFERENTLY ABLED:</b> ${formData.differentlyAble}</td>
    </tr>    
    <tr>
      <td><b>EMAIL:</b>${formData.email}</td>
      <td><b>MOBILE NUMBER:</b>${formData.phone}</b></td>
    </tr>    
    <tr>
      <td><b>OCCUPATION:</b> ${formData.occupation}</td>
      <td><b>PIN CODE:</b> ${formData.pincode}</td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: left;"><b>ADDRESS:</b>${formData.address}</td>
    </tr>
    <tr>
      <td><b>TALUKA:</b> ${formData.taluka}</td>
      <td><b>VILLAGE:</b> ${formData.village}</td>
    </tr>
    <tr>
      <td><b>STATE:</b> ${formData.litigantState}</td>
      <td><b>DISTRICT:</b> ${formData.litigantDistrict}</td>
    </tr>
    
    
    <tr>
      <td colspan="2" style="background-color: #C1B192; text-align: center;"><b>CASE DETAILS</b></td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: left;"><b>DATE OF CAUSE OF ACTION:</b> ${formData.actionDate}</td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: left;"><b>CAUSE OF ACTION:</b>${formData.disputeState}</td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: left;"><b>IMPORTANT INFORMATION / SUBJECT / REASON :</b>${formData.reason}</td>
    </tr>
    <tr>
      <td><b>STATE:</b> ${formData.disputeState}</td>
      <td><b>DISTRICT:</b> ${formData.disputeDistrict}</td>
    </tr>
    <tr>
      <td><b>TALUKA:</b> ${formData.disputeTaluka}</td>
      <td><b>VILLAGE:</b> ${formData.disputeVillage}</td>
    </tr>
    <tr>
      <td><b>ACT :</b>${formData.act}</td>
      <td><b>SECTION :</b>${formData.act}</td>
    </tr>
    
    
    <tr>
      <td colspan="2" style="background-color: #C1B192; text-align: center;"><b>LEGAL HEIR</b></td>
    </tr>
    <tr>
      <td><b>PARTY NAME:</b> ${formData.partyName}</td>
      <td><b>TYPE:</b> ${formData.heirType}</td>
    </tr>
    <tr>
      <td><b>LEGAL HEIR NAME:</b> ${formData.heirName}</td>
      <td><b>NAME:</b> ${formData.partyName}</td>
    </tr>
    <tr>
      <td><b>RELATION:</b> ${formData.name2}</td>
      <td><b>AGE:</b> ${formData.heirAge}</td>
    </tr>
    <tr>
      <td><b>DOB:</b> ${formData.heirDob}</td>
      <td><b>GENDER:</b> ${formData.heirGender}</td>
    </tr>
    <tr>
      <td><b>CASTE:</b> ${formData.heirCaste}</td>
      <td><b>DIFFERENTLY ABLED:</b> ${formData.heirDifferentlyAble}</td>
    </tr>
    <tr>
      <td><b>EMAIL:</b> ${formData.heirEmail}</td>
      <td><b>OCCUPATION:</b> ${formData.heirOccupation}</td>
    </tr>
    <tr>
      <td><b>MOBILE:</b> ${formData.heirPhone}</td>
      <td><b>PIN CODE:</b> ${formData.heirPincode}</td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: left;"><b>ADDRESS:</b>${formData.heirAddress}</td>
    </tr>
    <tr>
      <td><b>STATE:</b> ${formData.disputeState}</td>
      <td><b>DISTRICT:</b> ${formData.disputeDistrict}</td>
    </tr>
    <tr>
      <td><b>TALUKA:</b> ${formData.disputeTaluka}</td>
      <td><b>VILLAGE:</b> ${formData.disputeVillage}</td>
    </tr>
    
    
    
    <tr>
      <td colspan="2" style="background-color: #C1B192; text-align: center;"><b>FACT DETAILS</b></td>
    </tr>
    <tr>
      <td><b>FACT DATE:</b> ${formData.factDate}</td>
      <td><b>FACT TIME:</b> ${formData.factTime}</td>
    </tr>
    <tr>
      <td colspan="2" style="text-align: left;"><b>FACT:</b>${formData.fact}</td>
    </tr>
  </table>
</center>
  </body>
</html>
`;
  
  
  
  
    return htmlContent;
  }

  
  
  
//////////
app.post('/api/send-email', (req, res) => {
  const { to, subject, html } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nyaaya160@gmail.com', 
      pass: 'olhf wjag bphj zucq', 
    },
  });

  const mailOptions = {
    from: 'nyaaya160@gmail.com',
    to,
    subject,
    html,
   
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }

    res.status(200).send('Email sent: ' + info.response);
  });
});

app.post('/ChangePassword1-Advocate', async (req, res) => {
  const { email, password, newPassword } = req.body;
  console.log('Request Body:', req.body);

  try {

    const { newPassword, confirmnewPassword } = req.body;

    
    const user = await UserData.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: 'User not found or details are incorrect.' });
    }
    else if (newPassword !== confirmnewPassword) {
      return res.status(400).json({ status: 'error', message: 'Password and Confirm Password do not match' });
    }
    user.password = newPassword;
    user.confirmPassword=newPassword;
    await user.save();
    res.json({ message: 'Password change successful.' });
  } catch (error) {
    
    console.error('Error during password change:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});
app.post('/ChangePassword2-Litigant', async (req, res) => {
  const { email, password, newPassword } = req.body;
  console.log('Request Body:', req.body);

  try {

    const { newPassword, confirmnewPassword } = req.body;

    
    const user = await UserData2.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: 'User not found or details are incorrect.' });
    }
    else if (newPassword !== confirmnewPassword) {
      return res.status(400).json({ status: 'error', message: 'Password and Confirm Password do not match' });
    }
    user.password = newPassword;
    user.confirmPassword=newPassword;
    await user.save();
    res.json({ message: 'Password change successful.' });
  } catch (error) {
    
    console.error('Error during password change:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});
/// Administrator Change Password
app.post('/ChangePassword3-Administrator', async (req, res) => {
  const { email, password, newPassword } = req.body;
  console.log('Request Body:', req.body);

  try {

    const { newPassword, confirmnewPassword } = req.body;

    
    const user = await UserData3.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: 'User not found or details are incorrect.' });
    }
    else if (newPassword !== confirmnewPassword) {
      return res.status(400).json({ status: 'error', message: 'Password and Confirm Password do not match' });
    }
    user.password = newPassword;
    user.confirmPassword=newPassword;
    await user.save();
    res.json({ message: 'Password change successful.' });
  } catch (error) {
    
    console.error('Error during password change:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});
app.post('/ChangePassword3-Administrator', async (req, res) => {
  const { email, password, newPassword } = req.body;
  console.log('Request Body:', req.body);

  try {

    const { newPassword, confirmnewPassword } = req.body;

    
    const user = await UserData3.findOne({ email, password });
    if (!user) {
      return res.status(404).json({ error: 'User not found or details are incorrect.' });
    }
    else if (newPassword !== confirmnewPassword) {
      return res.status(400).json({ status: 'error', message: 'Password and Confirm Password do not match' });
    }
    user.password = newPassword;
    user.confirmPassword=newPassword;
    await user.save();
    res.json({ message: 'Password change successful.' });
  } catch (error) {
    
    console.error('Error during password change:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});
app.post('/api/updateProfile', async (req, res) => {
  const { email, newname, newphone,newpropic } = req.body;
  console.log('Request Body:', req.body);

  try {
  const user = await UserData.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found or details are incorrect.' });
    }
    
    user.name = newname;
    user.phone = newphone;
    user.propic = newpropic;
    await user.save();
    res.json({ message: 'Profile change successful.' });
  } catch (error) {
    
    console.error('Error during Profile change:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});
app.post('/api/updateProfile2', async (req, res) => {
  const { email, newname, newphone,newpropic } = req.body;
  console.log('Request Body:', req.body);

  try {
  const user = await UserData2.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found or details are incorrect.' });
    }
    
    user.name = newname;
    user.phone = newphone;
    user.propic = newpropic;
    await user.save();
    res.json({ message: 'Profile change successful.' });
  } catch (error) {
    
    console.error('Error during Profile change:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});


app.post('/api/ratings', async (req, res) => {
  const { email, cnrNumber, rate } = req.body;

  try {
      // Check if the CNR number exists
      const existingCase = await Case.findOne({ CnrNumber: cnrNumber });
      if (!existingCase) {
          return res.status(404).json({ error: 'CNR number not found' });
      }

      // Check if the user has already rated this CNR number
      const existingRating = await rating.findOne({ email, cnrNumber });
      if (existingRating) {
          return res.status(400).json({ error: 'Rating already submitted for this CNR number' });
      }

  
      await rating.create({
            email,
            cnrNumber,
            rate
      });

      res.status(201).json({ message: 'Rating submitted successfully' });
  } catch (error) {
      console.error('Error submitting rating:', error);
      res.status(500).json({ error: 'Failed to submit rating' });
  }
});




app.get('/ratings/average/:email', async (req, res) => {
try {
  const email = req.params.email;
  const ratings = await rating.find({ email });
  
  if (ratings.length === 0) {
    return res.json({ averageRating: 0 });
  }
  
  const totalSum = ratings.reduce((acc, rating) => acc + rating.rate, 0);
  const averageRating = Math.round(totalSum / ratings.length); // Round off to 0 decimal places
  res.json({ averageRating });
} catch (error) {
  console.error('Error calculating average rating:', error);
  res.status(500).json({ error: 'Failed to calculate average rating' });
}
});





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});