import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
 } from "reactstrap";
import Budgets from "./Budgets";
import About from "./About";
import { fetchBudgetsOnRefresh } from "../actions/BudgetActions";
import { setToken } from "../actions/AuthActions";
import { getUserData } from "../actions/UserActions";


class Dashboard extends Component {
  constructor(){
    super();
    this.state = {
      navBarOpenStatus: false,
    }
  }


  componentWillMount(){
    if (!sessionStorage.Token){
      return <Redirect to="/login" />
    } else {
      this.props.setToken();
      this.props.fetchBudgetsOnRefresh();
      this.props.getUserData(sessionStorage.Token);
    }
  }

  scrollToReceipts(e){
    var click = e
    console.log("e from click: ", e)
  }

  toggleNavbar(){
    this.setState({
      navBarOpenStatus: !this.state.navBarOpenStatus
    });
  }

  render(){
    if (!sessionStorage.Token){
      return <Redirect to="/login" />
    }
    return(
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand>Finance Manager</NavbarBrand>
          <NavbarToggler onClick={(e) => this.toggleNavbar()} />
          <Collapse isOpen={this.state.navBarOpenStatus} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink disabled="true">Welcome, {this.props.userData.username}</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Parts
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Option 1
                  </DropdownItem>
                  <DropdownItem>
                    Option 2
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                    Option 3
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
        <About />
        <Budgets />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  token: state.Auth.token,
  userData: state.User.userInfo,
  budget: state.Budget.listOfBudgets,
});

export default connect(mapStateToProps, {
  fetchBudgetsOnRefresh,
  setToken,
  getUserData,

})(Dashboard);
