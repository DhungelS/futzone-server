import React from 'react';
import './Landing.css';
import stepOne from '../../images/step-one.JPG';
import stepTwo from '../../images/step-two.JPG';
import stepThree from '../../images/step-three.JPG'
import stepFour from '../../images/step-four.JPG'
export default function Banner() {
  return (
    <React.Fragment>
      <header className="landing" role="banner">
        <div className="banner">
          <h1 className="heading-text">Futzone</h1>
        </div>
        <div className="info">
          <p>Score, highlights, and much more on the latest matches.</p>
        </div>
      </header>
      <section>
        <div className="info-landing">
          <h1>Welcome to Futzone!</h1>
          <p>
            To get started either register a user account or login with the demo
            account:
          </p>

          <img className="step" src={stepOne} alt="login" />
          <p>
            Once logged in you will be taken to the fixtures screen. You will be able to search from different leagues around the world: 
            </p>
            <img className="step" src={stepTwo} alt="select a team" />
            <p>After you have selected a league you will be able to select the teams from that league: </p>
            <img className="step" src={stepThree} alt="select a league"/>
            <p>Once you have selected a team you will be able to view the last four matches along with information: </p>
            <img className="step" src={stepFour}  alt="view the matches"/>
        </div>
      </section>
    </React.Fragment>
  );
}
