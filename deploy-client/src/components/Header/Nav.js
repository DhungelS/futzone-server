import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Nav.css';
import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';

class Nav extends Component {
  renderAuthStatus() {
    switch (this.props.auth) {
      case null:
        return;
      case false: 
        return (<li className="right"><a className="nav-item active" href="/auth/google">Login With Google</a></li>);
      default:
        return (<li className="right"><a className="nav-item active" href="api/logout">Logout</a></li>);
}
  }

  render() {
    return (
      <ul className="nav">
        <li>
          <Link to={this.props.auth ? '/fixtures' : '/'} 
          className="nav-item" 
          >
            <img className="logo" src={logo} alt="soccer silhouette"></img>
          </Link>
        </li>
        <li>
          <Link to='/'className="nav-item">
            Home
          </Link>
        </li>
        {this.renderAuthStatus()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return { auth: state.auth.userData };
}

export default connect(mapStateToProps)(Nav);
