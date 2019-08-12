import React from "react";
import Receipts from "./Receipts";

const ShowReceipt = ({ budgetID }) => {
  const Selected = (
    <Receipts />
  );

  const notSelected = (
    <p>Please Select a Budget, Please!</p>
  )

  return (
    <div>
      {budgetID ? Selected : notSelected}
    </div>
  )
}

export default ShowReceipt;
