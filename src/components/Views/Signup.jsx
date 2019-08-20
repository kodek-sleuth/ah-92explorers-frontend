import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Validator from '../../utils/signupValidation';
import { signUp } from '../../redux/actions/actionCreators/signup';


export class Signup extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    emailError: '',
    usernameError: '',
    passwordError: '',
    redirecting: false,
  };

  handleOnChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const {
      email, username, password,
    } = this.state;
    this.clearErrors();
    const emailError = Validator.validateEmail({ email });
    const usernameError = Validator.validateUsername({ username });
    const passwordError = Validator.validatePassoword({ password });
    if (emailError) {
      return this.displayError(emailError, 'emailError');
    }
    if (usernameError) {
      return this.displayError(usernameError, 'usernameError');
    }
    if (passwordError) {
      return this.displayError(passwordError, 'passwordError');
    }

    const signupData = {
      email,
      username,
      password,
    };
    this.props.signUp(signupData);
  };

  displayError = (error, key) => {
    this.setState({ [key]: error });
  };

  clearErrors = () => this.setState(prevState => ({
    ...prevState,
    emailError: '',
    usernameError: '',
    passwordError: '',
  }))

  render() {
    const {
      email, username, password, emailError, usernameError, passwordError,
    } = this.state;

    const successMsg = this.props.signUpSuccess;
    const failedMsg = this.props.signUpFailure;

    if (successMsg) {
      setTimeout(() => this.setState({
        redirecting: true,
      }), 3000);
    }

    if (this.state.redirecting) {
      return <Redirect to="/login" />;
    }

    const backgrdImage = {
      backgroundImage: `url(${'https://cdn.dribbble.com/users/992274/screenshots/6206904/office_kit8-net.png'})`,
    };
    return (
      <Fragment>
        <div className="d-flex">
          <div className="form-wrap d-flex">
            <div className="align-self-center">
              <div className="form-wrap-inner align-self-center h-100">
                <a href="index.html" className="logo">
                  <img src={require('../../assets/images/logo.png')} alt="" />
                </a>
                <h3 className="mb-4">SignUp to...</h3>
                <p className="mb-5">Foster inspiration and innovation by leveraging the modern web.</p>
                <form className="signup-form form mb-5" onSubmit={this.handleSubmit}>
                  <div>
                    { successMsg ? (
                      <div className="success">
                        successfully registered
                        {' '}
                        <br />
Please check your email to verify your account
                      </div>
                    ) : false}
                  </div>
                  <br />
                  <div>
                    {' '}
                    {emailError || usernameError || passwordError || failedMsg ? <div className="error">{emailError || usernameError || passwordError || failedMsg}</div> : false}
                  </div>
                  <div className="form-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email"
                      name="email"
                      value={email}
                      onChange={this.handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username"
                      name="username"
                      value={username}
                      onChange={this.handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      name="password"
                      value={password}
                      onChange={this.handleOnChange}
                    />
                  </div>
                  <div className="form-group">
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="img-wrap" style={backgrdImage} />
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  signUpSuccess: state.signup.userSignup.signUpSuccess,
  signUpFailure: state.signup.userSignup.signUpFailure,
});

const signUpPage = connect(mapStateToProps, { signUp })(Signup);
export default signUpPage;