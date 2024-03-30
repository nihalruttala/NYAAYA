
import React from 'react';
import Usernav from '../../Components/Navigatingcards/Usernav'




const LoginPage = () => {
  

  return (
   <>
   <Usernav
        advocatePath="/login/advocate"
        litigantPath="/login/litigant"
        adminPath="/login/administrator"
        buttonLabel="LOGIN"
      />   
   </>
  )
};

export default LoginPage