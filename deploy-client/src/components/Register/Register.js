import React, { Component } from 'react';
import { registerUser } from '../../actions/';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './register.css';
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      pass: ''
    };
  }
  registerHandler = e => {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(
      registerUser({
        username: this.state.username,
        password: this.state.pass
      })
    )
      // .then(() => {
      //   this.props.history.push('/dashboard');
      // })
      .catch(err => {
        console.log(err);
      });
  };

  handleUserNameInput = e => {
    this.setState({ username: e.target.value });
  };

  handlePassInput = e => {
    this.setState({ pass: e.target.value });
  };
  render() {
    return (
      <div className="register-container">
      <div className="register">
        <form className="register-form" onSubmit={this.registerHandler}>
          <h1>Register</h1>
          <label htmlFor="username-input">Username: </label>
          <input
            type="text"
            id="username-input"
            name="username"
            onChange={this.handleUserNameInput}
            required
          />
          <br />
          <label htmlFor="pass-input">Password: </label>
          <input
            type="password"
            id="pass-input"
            name="password"
            onChange={this.handlePassInput}
            required
          />
          <br/>
          <button type="submit">Sign Up</button>
        </form>
        <div className="prev-acc">
        <h2>Already have an account?</h2>

        <Link
          style={{ textAlign: 'center' }}
          className="login-link"
          to="/login"
        >
          Login
        </Link>
        </div>
      </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken
  };
};

export default connect(mapStateToProps)(withRouter(Register));
