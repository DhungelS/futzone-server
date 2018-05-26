import React from 'react';
import './Landing.css';
import stepOne from '../../images/step-one.JPG';
export default function Banner() {
  return (
    <React.Fragment>
      <header className="landing" role="banner">
        <div className="banner">
          <h1 className="heading-text">Futzone</h1>
        </div>
      </header>
      <section>
        <div className="info-landing">

          <h1>Welcome to Futzone!</h1>

          <div className="info-progression">
              <div className="f-pg">
                <i className="fa fa-futbol-o fa-5x" />
                <p>Discover</p>
              </div>

              <div className="f-pg">
                <i className="fa fa fa-tv fa-5x" />
                <p>Watch</p>
              </div>

              <div className="f-pg">
                <i className="fa fa-user-plus fa-5x" />
                <p>Review</p>
              </div>
             
            </div>

          <p>
            Futzone is an interactive full-stack web application that allows
            users to have access to wide variety of information on the latest
            soccer matches.
          </p>
          <ul>
            <li>
              {' '}
              Users have the ability to select from a collection of notable
              leagues, teams, and matches from around the world. Need to find
              the scorline on a champions league match that you didn't catch
              yesterday? It's there.
            </li>
            <li>
              Or maybe, you are just tired of scrambling through youtube to find
              the highlight videos on your favorite matches?{' '}
            </li>

            <li>
              You can leave reviews, and ratings on matches depending on the
              quality of the match.
            </li>
          </ul>
          <p>
            To get started either register a user account or login with the demo
            account:
          </p>

          <img className="step" src={stepOne} alt="login" />

          {/* <p>
            Once logged in you have the ability to leave reviews for matches. 
            </p>
            <img className="step" src={stepTwo} alt="select a team" /> */}
          {/* <p>After you have selected a league you will be able to select the teams from that league: </p>
            <img className="step" src={stepThree} alt="select a league"/>
            <p>Once you have selected a team you will be able to view the last four matches along with information: </p>
            <img className="step" src={stepFour}  alt="view the matches"/> */}
        </div>
      </section>
    </React.Fragment>
  );
}
