import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, CardBody } from "reactstrap";
import { typeOfUserIdentifier } from "../actions/ApplicationActions";
import UserSelector from "./UserSelector";


class TypeOfUser extends Component {
  constructor(){
    super();
    this.onUserSelectorClick = this.onUserSelectorClick.bind(this)
  }

  onUserSelectorClick(typeOfUser){
    this.props.typeOfUserIdentifier(typeOfUser)
  }

  render(){
    return(
      <CardBody>
        <Button color="primary" onClick={() => this.onUserSelectorClick("REGISTERED_USER")}>Registered User</Button>
        <Button color="secondary" onClick={() => this.onUserSelectorClick("NEW_USER")}>New User</Button>
        <UserSelector typeOfUser={this.props.application} />
      </CardBody>
    )
  }
}

const mapStateToProps = state => ({
  application: state.Application.typeOfUser,
})

export default connect(mapStateToProps, {
  typeOfUserIdentifier
})(TypeOfUser);
