import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions'

import Header from './Header/Nav';
import Banner from './Landing/Landing';
import Fixtures from './Fixtures/Fixtures';
import PreviousReviews from './PreviousReviews/PreviousReviews'


class App extends Component {

  componentDidMount(){
    this.props.fetchGoogleUser();
    }

  render() {
  

    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Banner} />
            <Route path="/fixtures" component={Fixtures} />
            <Route path="/reviews" component={PreviousReviews} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default connect(null, actions) (App);
