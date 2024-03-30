// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './LoginPage.css';
// import './Navbar.css';
// const Navbar3 = () => {
//   const [selectedOption, setSelectedOption] = useState(null);
//   const handleOptionChange = (option) => {
//     setSelectedOption(option);
//   };
//   return (    
//       <section>
//         <div class="body">
//     <div class="transparent-box">
//     <form>
//         <h1 id="font" >LOGIN</h1>
//         <h2 class="a">Login as:</h2>
//         <table>
//             <tr>
//                 <td><h4 class="options-container"><div className="options">
//                           <Link to="/login/advocate">
//                             <input
//                               type="radio"
//                               id="option1"
//                               name="radiogroup"
//                               onChange={() => handleOptionChange('advocate')}
//                               checked={selectedOption === 'advocate'}
//                             />
//                         </Link>
//                           <label htmlFor="option1">Advocate</label>
                          
//                           <br />
//                         </div></h4></td>
//                 <td><h4 class="options-container"><div className="options">
//                           <Link to="/login/litigant">
//                             <input
//                               type="radio"
//                               name="radiogroup"
//                               id="option2"
//                               onChange={() => handleOptionChange('litigant')}
//                               checked={selectedOption === 'litigant'}
//                             />
//                           </Link>
//                           <label htmlFor="option2">Litigant</label>
//                           <br />
//                         </div></h4></td>
//                 <td><h4 class="options-container"><div className="options">
//                           <Link to="/login/administrator">
//                             <input
//                               type="radio"
//                               name="radiogroup"
//                               id="option3"
//                               onChange={() => handleOptionChange('administrator')}
//                               checked={selectedOption === 'administrator'}
//                             />
//                           </Link>
//                           <label htmlFor="option3">Administrator</label>
//                           <br />
//                         </div></h4></td>
//             </tr>
//         </table>
//         {/* <table>
//         <tr>
//             <td class="b">
//                 <label for="Username"><h4 className='i'>Username:</h4></label></td>
//                <td> <h5><input  className='o' type="email" name="Username" placeholder="Email"/></h5>
//             </td>
//         </tr>
//         <tr>
//             <td class="b">
//                 <label className="y" for="Password"><h4>Password:</h4></label></td>
//               <td>  <h5><input className='o' type="password" name="Password" placeholder="Enter password"/></h5>
//             </td></tr>
//             <tr>
//             <td class="b">
//                 <label className='y' for="Otp"><h4>OTP Authentication:</h4></label></td>
//                 <td> <div className='omg'>
//                 <button  style={{height:'33px', width:'100px' }}>Send OTP</button>
//                 <h6 className='m'><input className='p' type="number" name="Otp" placeholder="Enter OTP" /></h6>
//                 </div> 
//             </td>
//             </tr>
//         </table> */}
//         {/* <div className='x'>
//        <button ><b>LOGIN</b></button>
//        </div> */}
//        <Link id="back" to='/#home'><button className='backbtn'><h6> Back</h6> </button></Link>
       
//         <div class="c">
//         <h5 >Don't have an account?</h5>
//         <Link to="/signup" ><button className='bn'><b>SIGN UP</b></button></Link>
     
//         </div>
//         </form>
//     </div>
    
//     </div>
//       </section>
//   );
// };

// export default Navbar3;