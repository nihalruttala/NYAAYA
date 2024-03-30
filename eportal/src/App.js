import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Homepage/Home';


import Signup from './pages/Signup/Signup';
import AdvocateForm from './pages/Signup/AdvocateForm';
import LitigantForm from './pages/Signup/LitigantForm';
import AdministratorForm from './pages/Signup/AdministratorForm';


import LoginPage from './pages/Login/LoginPage';
import AdvocateLogin from './pages/Login/Advocatelogin';
import LitigantLogin from './pages/Login/LitigantLogin';
import AdministratorLogin from './pages/Login/AdministratorLogin';

import Advocateaccount from './pages/Advocate/Advocateaccount';
import Litigantaccount from './pages/Litigant/Litigantaccount';






import Administratoraccount from './pages/Administrator/Adminstratoraccount';
import AdvCaseDocinfo from './pages/Advocate/AdvCaseDocinfo';
import CaseFiling from './pages/Advocate/CaseFiling';

import CaseLegalform from './Components/CaseLegalform';
import ChangePassword1 from './Components/ChangePassword1';
import ChangePassword2 from './Components/ChangePassword2';
import ChangePassword3 from './Components/ChangePassword3';

import EditProfile from './pages/Litigant/EditProfile';
import CaseDocinfo from './pages/Litigant/CaseDocinfo';
import Casetracking from './pages/Litigant/Casetracking';
import RequestForm from './Components/Litigant/RequestForm';
import Rating from './Components/Litigant/rating';
import PasswordReset from './Components/PasswordReset';
import PasswordReset2 from './Components/PasswordReset2';
import PasswordReset3 from './Components/PasswordReset3';
import EditProfile2 from './pages/Advocate/EditProfile2';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/signup" element={<Signup/>}/>
        <Route path="/signup/advocate" element={<AdvocateForm/>}/>
        <Route path="/signup/litigant" element={<LitigantForm/>}/>
        <Route path="/signup/administrator" element={<AdministratorForm/>}/>


      <Route path="/login" element={<LoginPage />} />
        <Route path='/login/advocate' element={<AdvocateLogin/>}/>
        <Route path="/login/litigant" element={<LitigantLogin/>}/>
        <Route path="/login/administrator" element={<AdministratorLogin/>}/> 

 
      <Route path="/Advocateaccount" element={<Advocateaccount/>}/>
      <Route path="/Adminstratoraccount" element={<Administratoraccount/>}/>
      <Route path="/litigantaccount" element={<Litigantaccount/>}/>


    
        <Route path="/casetracking" element={<Casetracking/>}/>
        <Route path="/passwordreset" element={<PasswordReset/>}/>
        <Route path="/passwordreset2" element={<PasswordReset2/>}/>
        <Route path="/passwordreset3" element={<PasswordReset3/>}/>
        <Route path="/casefiling" element={<CaseFiling/>}/>
        <Route path ="/advocatecasedocuments" element={<AdvCaseDocinfo/>}/>
        <Route path ="/litigantcasedocuments" element={<CaseDocinfo/>}/>
        <Route path='/caselegalform' element={<CaseLegalform/>}/>
        <Route path="/requestform" element={<RequestForm/>}/>
        <Route path='/ChangePassword1' element={<ChangePassword1/>}/>
        <Route path='/ChangePassword2' element={<ChangePassword2/>}/>
        <Route path='/ChangePassword3' element={<ChangePassword3/>}/>
        <Route path="/edit-profile" element={<EditProfile/>}/>
        <Route path="/edit-profile2" element={<EditProfile2/>}/>
        <Route path="/Rating" element={<Rating/>}/>
      </Routes>
    </Router>
  );
}

export default App;