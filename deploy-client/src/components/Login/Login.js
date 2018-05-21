import React,{Component} from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { login } from '../../actions/';
import './login.css'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'demo',
      pass: 'demo'
    };
  }
	loginHandler = e => {
	  e.preventDefault();
	  const { dispatch } = this.props;
	  dispatch(
	    login({
	      username: this.state.username,
	      password: this.state.pass
	    })
	  )
	    .then(() => {
	      this.props.history.push('/fixtures');
	    })
	    .catch(err => {
	    console.log(err)
	    });
	};



	handleUserNameInput = e => {
	  this.setState({ username: e.target.value });
	};

	handlePassInput = e => {
	  this.setState({ pass: e.target.value });
	};
  render(){
    return(
      <div className="login-container">
			<div className="login">
        <h1>Login</h1>
        <form className="login-form" onSubmit={this.loginHandler}>
        <label htmlFor="username-input">Username: </label>
        <input type="text"
	            id="username-input"
							name="username"
							value="demo"
	            onChange={this.handleUserNameInput}
              required/>
              <br/>
              <label htmlFor="pass-input">Password: </label>
              <input type="password"
	            id="pass-input"
							name="password"
							value="demo"
	            onChange={this.handlePassInput}
              required/>
              <button className="login-btn" type="submit">login</button>
              </form>
							</div>
        </div>
				
    )
  }
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken
  };
};


export default connect(mapStateToProps)(withRouter(Login));