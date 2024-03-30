// LocationDropdowns.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const LocationDropdowns = () => {
  const [states, setStates] = useState([]);

  const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    ckey: 'NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA=='
  };

  useEffect(() => {
    loadStates('IN'); 
  }, []);

  const loadStates = (selectedCountryCode) => {
    axios.get(`${config.cUrl}/${selectedCountryCode}/states`, { headers: { "X-CSCAPI-KEY": config.ckey } })
      .then(response => {
        setStates(response.data);
      })
      .catch(error => console.error('Error loading states:', error));
  };

  return (
    <div>
      <select className="state">
        <option value="">Select State</option>
        {states.map(state => (
          <option key={state.iso2} value={state.iso2}>{state.name}</option>
        ))}
      </select>
    </div>
  );
};

export default LocationDropdowns;