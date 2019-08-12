import React, { Component } from "react";
import { connect } from "react-redux";
import receiptFormatter from "./utils/ReceiptFormatter";
import sortReceiptToCategory from "./utils/SortReceiptCategory";
import biggestCategory from "./utils/PieChartDescriptor/BiggestCategory";

class PieChartDescriptor extends Component {
  render(){
    const categorizedReceipts = sortReceiptToCategory(receiptFormatter(this.props.receipts));
    console.log("categorizedReceipts: ", categorizedReceipts);
    const largestCategory = biggestCategory(categorizedReceipts);
    console.log("largestCategory: ", largestCategory)
    return(
      <div>
        <p>
          After deducting your bills from your budget, you have {this.props.budgetGoal - categorizedReceipts[2].total}
          Your largest area of expenditure is {largestCategory}
        </p>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  receipts: state.Receipt.listOfReceipts,
  budgetGoal: state.Budget.budgetAmount,
})

export default connect(mapStateToProps, {})(PieChartDescriptor);
