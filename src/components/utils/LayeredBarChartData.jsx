export const numMostReceiptsInCategory = receipts => {
  const categories = ["misc", "food", "bill", "cons"];
  let comparisonNumber = 0;
  for (var i = 0; i < categories.length; i ++){
    if (receipts.filter((receipt) => receipt.receiptCategory === categories[i]).length > comparisonNumber){
      comparisonNumber = receipts.filter((receipt) => receipt.receiptCategory === categories[i]).length;
    }
  }
  return comparisonNumber;
}

export const sortReceiptToCategory = receipts => {
  const receiptsInCategories = {};
  const categories = ["misc", "food", "bill", "cons"];
  for (var i = 0; i < categories.length; i ++){
    receiptsInCategories[categories[i]] = receipts.filter((receipt) => receipt.receiptCategory === categories[i])
  }
  return receiptsInCategories;
}

export const layeredBarChartData = receipts => {
  let receiptsInCategories = sortReceiptToCategory(receipts);
  const receiptCategoryKeys = Object.keys(receiptsInCategories);
  const numberOfLayers = numMostReceiptsInCategory(receipts);
  for (var i = 0; i < receiptCategoryKeys.length; i ++){
    for (var j = 0; j < (numberOfLayers - receiptsInCategories[receiptCategoryKeys[i]].length); j ++){
      receiptsInCategories[receiptCategoryKeys[i]].push(
        {receiptName: "Space Filler", receiptAmount: 0, receiptCategory: "Filler", receiptDescription: "Filler"}
      )
    }
  }
  return receiptsInCategories;
}

export const toFinalArray = sortedReceipts => {
  const finalArrayForChart = [];
  let receiptsInCategories = sortReceiptToCategory(sortedReceipts);
  const receiptCategoryKeys = Object.keys(receiptsInCategories);
  const numberOfLayers = numMostReceiptsInCategory(sortedReceipts);
  for (var i = 0; i < numberOfLayers; i++){
    let tempArray = [];
    for (var j = 0; j < receiptCategoryKeys.length; j++){
      if(receiptsInCategories[receiptCategoryKeys[j]][i] === undefined){
        tempArray = tempArray.concat({receiptCategory: receiptCategoryKeys[j], receiptAmount:0, receiptDescription:"filler"})
      } else {
        tempArray = tempArray.concat(receiptsInCategories[receiptCategoryKeys[j]][i])
      }
    }
    finalArrayForChart.push(tempArray)
  }
  return numberFixer(finalArrayForChart);
}

const numberFixer = finalReceipt => {
  const FinalArray = [];
  for (var i = 0; i < finalReceipt.length; i ++){
    let tempArray = [];
    for (var j = 0; j < finalReceipt[i].length; j ++){
      const receipt = {
        ...finalReceipt[i][j],
        receiptAmount: Number(finalReceipt[i][j].receiptAmount)
      };
      tempArray.push(receipt);
    }
    FinalArray.push(tempArray)
  }
  return FinalArray;
}
