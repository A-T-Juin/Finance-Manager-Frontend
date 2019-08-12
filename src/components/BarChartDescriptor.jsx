import React, { Component } from "react";
import { connect } from "react-redux";
import receiptFormatter from "./utils/ReceiptFormatter";
import sortReceiptCategory from "./utils/SortReceiptCategory";
import CategoryConverter from "./utils/FinalPieChartData";
import sortToEachCategory from "./utils/SortToEachCategory";

class BarChartDescriptor extends Component {
  constructor(){
    super();
  }
  render(){
    const formattedReceipts = receiptFormatter(this.props.receipts);
    const categoricalData = sortReceiptCategory(formattedReceipts);
    console.log("categoricalData: ", categoricalData);
    const individualizedReceiptsInCategories = sortToEachCategory(formattedReceipts);
    console.log("individualizedReceiptsInCategories: ", individualizedReceiptsInCategories);
    const totalExpenditures = (categoricalData.reduce((x,y) => ({total: x.total + y.total}))).total
    const remainingBudget = this.props.budgetGoal - totalExpenditures
    const dataInCategories = categoricalData.concat([{receiptCategory: "Remaining Budget", total: remainingBudget}])
    return(
      <div>
        <p>
          Bar Chart Descriptor
        </p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  receipts: state.Receipt.listOfReceipts,
  budgetGoal: state.Budget.budgetAmount,
  userData: state.User.userInfo
})

export default connect(mapStateToProps, {})(BarChartDescriptor);
