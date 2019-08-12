import React, { Component } from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {authenticateUser, logoutUser, obtainUserToken} from "../actions/AuthActions";
import {getUserData} from "../actions/UserActions";
import {fetchBudgetLI} from "../actions/BudgetActions";


class Login extends Component {
  constructor(){
    super();
    this.state = {
      username: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    const loginData = {
      username: this.state.username,
      password: this.state.password
    };
    this.props.obtainUserToken(loginData);
    this.props.authenticateUser(loginData);
    this.props.fetchBudgetLI(loginData);
    this.resetForm();
  }

  resetForm(){
    this.setState({
      username: "",
      password: ""
    })
  }

  render(){
    if (sessionStorage.Token){
      return <Redirect to="/Dashboard" />
    }
    return(
      <div>
        <h1>Login</h1>
        <form onSubmit={(info) => this.onSubmit(info)}>
          <div>
            <label>Username: </label>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onChange}
              />
            <br />
            </div>
            <div>
              <label>Password: </label>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onChange}
              />
            </div>
            <button type="submit">Login!</button>
          </form>
          <br />
        </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.Auth.token,
  userData: state.User.userInfo,
})

export default connect(mapStateToProps, {
  authenticateUser,
  logoutUser,
  getUserData,
  obtainUserToken,
  fetchBudgetLI,
})(Login)
