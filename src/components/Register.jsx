import React, {Component} from "react";
import {connect} from "react-redux";
import {registerUser} from "../actions/UserActions";
import { NavLink } from "reactstrap";

class Register extends Component{
  constructor(){
    super();
    this.state = {
      notes: [],
      username: "",
      email: "",
      password: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetForm = this.resetForm.bind(this);
  }
  onChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  onSubmit(e){
    e.preventDefault();
    const newUserData = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    };
    this.props.registerUser(newUserData)
    this.resetForm();
  }

  resetForm(){
      this.setState({
        username: "",
        email: "",
        password: ""
      });
  }

  render(){
    return(
      <div>
      <h1>REGISTRATION PAGE</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.onChange}
            />
            <hr />
          </div>
          <div>
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={this.state.email}
              onChange={this.onChange}
            />
            <hr />
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
          <button type="submit">Register!</button>
        </form>
        <p>If you are a user, please <NavLink href="/Login">log-in</NavLink> here!</p>
      </div>
    )
  }
}

export default connect(null,{registerUser})(Register);
