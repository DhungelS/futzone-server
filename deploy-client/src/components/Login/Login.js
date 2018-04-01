import React, { Component } from 'react';
import { connect } from 'react-redux';
import {saveAuthToken} from '../../Utils/authStorage'
import * as actions from '../../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginAttempt: false
    };
  }

  handleLogin = e => {
    e.preventDefault();
    this.setState({ loginAttempt: true }, () =>
      this.props.postUserLocalSignIn({
        username: this.state.username,
        password: this.state.password
      }, () =>  saveAuthToken(this.props.auth.authToken) )

    );
    
   
  };


  render() {
    return (
      <form onSubmit={e => this.handleLogin(e)}>
        <label>
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          onChange={e =>
            this.setState({
              username: e.target.value
            })
          }
          required
        />
        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          onChange={e =>
            this.setState({
              password: e.target.value
            })
          }
          required
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.localUserData
});

export default connect(mapStateToProps, actions)(Login);
