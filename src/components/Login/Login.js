import React,{Component} from 'react';
import { withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import { login } from '../../actions/';
import { Form, Icon, Input, Button} from 'antd';
import './login.css';
const FormItem = Form.Item;

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
	    return
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
        
				<FormItem>
        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
							value={this.state.username}
	            onChange={this.handleUserNameInput}
              required/>
							
              </FormItem>
    
							<FormItem>
              <Input
							prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password"
							value={this.state.pass}
	            onChange={this.handlePassInput}
              required/>
						</FormItem>
              <Button className="login-btn" htmlType="submit">login</Button>
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