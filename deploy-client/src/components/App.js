import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions'

import Header from './Header/Nav';
import Banner from './Landing/Landing';
import Fixtures from './Fixtures/Fixtures';


class App extends Component {

  componentDidMount(){
    this.props.fetchUser();
    }

  render() {
  

    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Banner} />
            {/* <Route exact path="/reviews" component={Reviews} /> */}
            <Route exact path="/fixtures" component={Fixtures} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}


export default connect(null, actions) (App);
