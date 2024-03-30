import React, { useState } from 'react';
import Administratorsidebar from './Administratorsidebar';
// import './Litigant/Litigantaccount.css';
import Navbar4 from '../../Components/Navbar4';
import Updatedetails from './Updatedetails';
import Uploaddocs from './Uploaddocs';
import AdminuserInfo from './AdminuserInfo';
const Administratoraccount= () => {
  const components = [AdminuserInfo, Uploaddocs,Updatedetails];
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

  const switchComponent = (index) => {
    setCurrentComponentIndex(index);
  };

  const CurrentComponent = components[currentComponentIndex];

  return (
    <div>
      <Navbar4 />
      <div className='Laccountbox'>
        <Administratorsidebar switchComponent={switchComponent} />
        <CurrentComponent />
      </div>
    </div>
  );
};
export default Administratoraccount;