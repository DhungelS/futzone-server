import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Nav.css';
import {Link} from 'react-router-dom';


class Nav extends Component {
  renderAuthStatus() {
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <li className="right">
            <a className="nav-item active" href="/auth/google">
              Login With Google
            </a>
          </li>
        );
      default:
        return (
          <li className="right">
            <a className="nav-item active" href="api/logout">
              Logout
            </a>
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
              to={this.props.auth ? '/reviews' : '/'}
              className="nav-item"
              style={{ display: this.props.auth ? 'block' : 'none' }}
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

function mapStateToProps(state) {
  return { auth: state.auth.userData };
}

export default connect(mapStateToProps)(Nav);
