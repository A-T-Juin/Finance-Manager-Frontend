const sortReceiptCategory = (formattedReceipts) => {
  let sortedArray = [];
  const categories = ["misc", "food", "bill", "cons"];
  for (var i = 0; i < categories.length; i++){
    let total = 0;
    for (var j = 0; j < formattedReceipts.length; j++){
      if (categories[i] === formattedReceipts[j].receiptCategory){
        total = total + formattedReceipts[j].receiptAmount;
      }
    }
    sortedArray.push({
      receiptCategory: categories[i],
      total
    });
  }
  return sortedArray;
}

export default sortReceiptCategory;
