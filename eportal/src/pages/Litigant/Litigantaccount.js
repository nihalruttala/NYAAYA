

import React, { useState } from 'react';
import Navbar4 from '../../Components/Navbar4';
import CaseDocuments from './CaseDocuments';
import CaseTrackbox from './CaseTrackbox';
import LawyerPortfolio from './LawyerPortfolio';
import './Litigantaccount.css';
import Litigantsidebar from './Litigantsidebar';
import Userinfo from './Userinfo';

const Litigantaccount = () => {
  const components = [Userinfo, CaseTrackbox,CaseDocuments,LawyerPortfolio];
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

  const switchComponent = (index) => {
    setCurrentComponentIndex(index);
  };

  const CurrentComponent = components[currentComponentIndex];

  return (
    <div>
      <Navbar4 />
      <div className='Laccountbox'>
        <Litigantsidebar switchComponent={switchComponent} />
        <CurrentComponent />
      </div>
    </div>
  );
};

export default Litigantaccount;