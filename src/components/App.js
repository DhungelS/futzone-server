import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../actions'
import 'antd/dist/antd.css';

import Header from './Header/Nav';
import Banner from './Landing/Landing';
import Fixtures from './Fixtures/Fixtures';
import PreviousReviews from './PreviousReviews/PreviousReviews'
import Register from './Register/Register'
import Login from './Login/Login'
import {refreshAuthToken} from '../actions';

class App extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.loggedIn && !this.props.loggedIn) {
        // When we are logged in, refresh the auth token periodically
        this.startPeriodicRefresh();
    } else if (!nextProps.loggedIn && this.props.loggedIn) {
        // Stop refreshing when we log out
        this.stopPeriodicRefresh();
    }
}

componentWillUnmount() {
    this.stopPeriodicRefresh();
}

startPeriodicRefresh() {
    this.refreshInterval = setInterval(
        () => this.props.dispatch(refreshAuthToken()),
        60 * 60 * 1000 // One hour
    );
}

stopPeriodicRefresh() {
    if (!this.refreshInterval) {
        return;
    }

    clearInterval(this.refreshInterval);
}


  render() {
  

    return (
      <div>
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/" component={Banner} />
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route path="/fixtures" component={Fixtures} />
            <Route path="/reviews" component={PreviousReviews} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hasAuthToken: state.auth.authToken !== null,
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps, actions) (App);
