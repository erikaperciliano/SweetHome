import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom'

import '../styles/pages/landing.css';

import LogoImg from '../images/Logo.png';

function Landing(){
    return (
        <div id="page-landing">
            <div className="content-wrapper">
                <img src={LogoImg} alt="happy children" id="sweet"/>

                <main>
                <h1>Bring happiness to the world</h1>
                <p>Visit nursing homes and make your day special.</p>
                </main>

                
                <div className="location">
                <strong>Rio de Janeiro</strong>
                <span>Rio de Janeiro</span>
                </div>

                <Link to="/app" className="enter-app">
                    <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
                </Link>
            </div>
    </div>
    );
}

export default Landing;