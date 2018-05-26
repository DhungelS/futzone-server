import React, { Component } from 'react';
import { registerUser } from '../../actions/';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Icon, Input, Button} from 'antd';
import './register.css';
const FormItem = Form.Item;


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
        return
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
          <FormItem>
          <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
             value={this.state.username}
            onChange={this.handleUserNameInput}
            required
          />
             </FormItem>

          	<FormItem>
          <Input
          	prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            id="pass-input"
            value={this.state.pass}
            onChange={this.handlePassInput}
            required
          />
          	</FormItem>
          <Button htmlType="submit">Sign Up</Button>
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
