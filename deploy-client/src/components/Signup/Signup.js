import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleSignUp = (e) => {
    e.preventDefault();
    this.props.postUserLocal({username: this.state.username, password: this.state.password});
   
  };

  render() {
    return (
      <form onSubmit={(e) => this.handleSignUp(e)}>
        <label>
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          onChange={(e) => this.setState({
            username: e.target.value
          })}
          required
        />
        <label>
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          required
          onChange={(e) => this.setState({
            password: e.target.value
          })}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth.localUserData
});

export default connect(mapStateToProps, actions)(SignUp);