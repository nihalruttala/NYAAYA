// Trackbox.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import './TrackBox.css'; // Include the CSS file

const Trackbox = ({ step, setStep }) => {
    const location = useLocation();

    const showPersonalDetailsOption = () => {
        return location.pathname === '/signup/litigant' || location.pathname === '/signup/administrator';
    };
    
    return (
        <div className="advocLeftbox">
            <div className="tracking">
                <input type="radio" id='t1' checked={step >= 1} onChange={() => setStep(1)} />
                <label htmlFor="t1">{showPersonalDetailsOption() ? 'Personal Details' : 'Bar Registration'}</label>
            </div>

            {showPersonalDetailsOption() ? null : (
                <div className="tracking">
                    <input type="radio" id='t2' checked={step >= 2} onChange={() => setStep(2)} disabled/>
                    <label htmlFor="t2">Profile Details</label>
                </div>
            )}

            <div className="tracking">
                <input type="radio" id='t3' checked={step >= 3} onChange={() => setStep(3)} disabled />
                <label htmlFor="t3">Contact Details</label>
            </div>

            <div className="tracking">
                <input type="radio" id='t4' checked={step >= 4} onChange={() => setStep(4)} disabled />
                <label htmlFor="t4">Create Password <br /> & OTP Verification</label>
            </div>
        </div>
    );
};

export default Trackbox;
