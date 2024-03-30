import React ,{useState} from 'react';
import Navbar4 from '../../Components/Navbar4';
import Advocatesidebar from './Advocatesidebar';
import AdvuserInfo from './AdvuserInfo';
import AdvCaseDocuments from './AdvCaseDocuments';
import CaseFiling from './CaseFiling';


const Advocateaccount = () => {
  const components = [AdvuserInfo,AdvCaseDocuments,CaseFiling];
  const [currentComponentIndex, setCurrentComponentIndex] = useState(0);

  const switchComponent = (index) => {
    setCurrentComponentIndex(index);
  };
  const CurrentComponent = components[currentComponentIndex];

  return (
    <div>
      <Navbar4/>
      <div className='Laccountbox'>
        <Advocatesidebar switchComponent={switchComponent} />
        <CurrentComponent />
      </div>
    </div>
  );
};

export default Advocateaccount;