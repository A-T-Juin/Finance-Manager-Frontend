const categoryModifier = categoryInstance => {
    switch(categoryInstance.receiptCategory){
      case "misc":
        return {...categoryInstance, receiptCategory: "Miscellaneous"}
      case "food":
        return {...categoryInstance, receiptCategory: "Food and Drinks"}
      case "cons":
        return {...categoryInstance, receiptCategory: "Consumer Goods"}
      case "bill":
        return {...categoryInstance, receiptCategory: "Bills"}
    }
}

const toFinalBarChartArray = categorizedReceipts => {
  const shallowCopy = categorizedReceipts;
  const finalArray = [];
  for (var i = 0; i < shallowCopy.length; i ++){
    let tempArray = [];
    for (var j = 0; j < shallowCopy[i].length; j++){
      tempArray.push(categoryModifier(shallowCopy[i][j]));
    }
    finalArray.push(tempArray);
  }
  return finalArray;
}

export default toFinalBarChartArray;
