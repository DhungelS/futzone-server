import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Nav.css';
import { Link } from 'react-router-dom';
import { clearAuth } from '../../actions/actionTypes';
import { clearAuthToken } from '../../local-storage';

import { Menu } from 'antd';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 'mail'
    };
  }

  handleClick = e => {

    this.setState({
      current: e.key
    });
  };

  logOut = () => {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  };

  renderAuthStatus = () => {
    switch (this.props.loggedIn) {
      case true:
        return (
          <Link className="right" to="/" onClick={this.logOut}>
            Logout
          </Link>
        );
      default:
        return (
          <Link className="right" to="/register">
            Get Started
          </Link>
        );
    }
  };

  render() {
    return (
      // <nav>
      //   <ul className="nav">
      //     <li>
      //       <Link to="/" className="nav-item">
      //         Home
      //       </Link>
      //     </li>
      //     <li>
      // <Link to="/fixtures" className="nav-item">
      //   Fixtures
      // </Link>
      //     </li>
      //     <li>
      //       <Link
      //         to={this.props.loggedIn ? '/reviews' : '/'}
      //         className="nav-item"
      //         style={{ display: this.props.loggedIn ? 'block' : 'none' }}
      //       >
      //         Reviews
      //       </Link>
      //     </li>
      //     {this.renderAuthStatus()}
      //   </ul>
      // </nav>

      <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme="dark"
      >
        <Menu.Item key="home">
          <Link to="/" className="nav-item">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="fixtures">
          <Link to="/fixtures" className="nav-item">
            Fixtures
          </Link>
        </Menu.Item>
        <Menu.Item key="reviews">
          <Link
            to={this.props.loggedIn ? '/reviews' : '/'}
            className="nav-item"
            style={{ display: this.props.loggedIn ? 'block' : 'none' }}
          >
            Reviews
          </Link>
        </Menu.Item>
        <Menu.Item key="get-started" style={{ float: 'right' }}>
          {this.renderAuthStatus()}
        </Menu.Item>
      </Menu>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(Nav);
