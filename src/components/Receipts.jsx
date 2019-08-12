import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Table,
  Row,
  Container,
  Col,
  Card,
  CardTitle,
  CardText,
  Jumbotron
} from "reactstrap";

import {
  createReceipt,
  editReceipt,
  fetchReceipts,
  deleteReceipt
} from "../actions/ReceiptActions";
import ReceiptPieChart from "./ReceiptPieChart";
import ReceiptBarChart from "./ReceiptBarChart";

class Receipts extends Component {
  constructor(){
    super();
  }

  componentDidUpdate(prevProps){
    if (this.props.budgetSelected !== prevProps.budgetSelected){
      this.props.fetchReceipts(this.props.userData.id, this.props.budgetSelected)
    }
  }

  componentWillMount(){
    this.props.fetchReceipts(this.props.userData.id, this.props.budgetSelected);
  }

  render(){
    return(
      <div>
        <h1>Receipts</h1>
          <ReceiptPieChart/>
          <ReceiptBarChart />
      </div>
    )
  }
}


const mapStateToProps = state => ({
  userData: state.User.userInfo,
  budgets: state.Budget.listOfBudgets,
  budgetSelected: state.Budget.selectedBudget,
  receipts: state.Receipt.listOfReceipts,
  budgetGoal: state.Budget.budgetAmount,
})

export default connect(mapStateToProps, {
  createReceipt,
  deleteReceipt,
  editReceipt,
  fetchReceipts,
})(Receipts);
