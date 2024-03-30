

import React from 'react'
import Usernav from '../../Components/Navigatingcards/Usernav'

const Signup = () => {
  return (
    <div>
      <Usernav
        advocatePath="/signup/advocate"
        litigantPath="/signup/litigant"
        adminPath="/signup/administrator"
        buttonLabel="SIGNUP"
      />    </div>
  )
}

export default Signup