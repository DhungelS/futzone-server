import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Nav.css';
import { Link } from 'react-router-dom';
import {clearAuth} from '../../actions/actionTypes';
import {clearAuthToken} from '../../local-storage';

class Nav extends Component {

  logOut = () => {
    this.props.dispatch(clearAuth());
    clearAuthToken();
}

  renderAuthStatus = () => {
    switch (this.props.loggedIn) {
      case true:
        return (
          <li className="right">
            <Link className="nav-item active" to="/" onClick={this.logOut}>
              Logout
            </Link>
          </li>
        )
      default: 
      return (
        <li className="right">
        <Link className="nav-item active" to="/register">
          Get Started
        </Link>
      </li>
      );
    }
  }

  render() {
    
    return (
      <nav>
        <ul className="nav">
          <li>
            <Link to="/" className="nav-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/fixtures" className="nav-item">
              Fixtures
            </Link>
          </li>
          <li>
            <Link
              to={this.props.loggedIn ? '/reviews' : '/'}
              className="nav-item"
              style={{ display: this.props.loggedIn ? 'block' : 'none' }}
            >
              Reviews
            </Link>
          </li>
          {this.renderAuthStatus()}
        </ul>
      </nav>
    );
  }
}

const mapStateToProps = (state)  => ({
  loggedIn : state.auth.currentUser !== null
})

export default connect(mapStateToProps)(Nav);
