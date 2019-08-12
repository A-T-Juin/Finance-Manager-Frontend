const sortToEachCategory = (formattedReceipts) => {
  let sortedArray = [];
  const categories = ["misc", "food", "bill", "cons"];
  for (var i = 0; i < categories.length; i ++){
    let receiptCategory = [];
    for (var j = 0; j < formattedReceipts.length; j++){
      if (categories[i] === formattedReceipts[j].receiptCategory){
        receiptCategory.push(formattedReceipts[j]);
      }
    }
    sortedArray.push(receiptCategory);
  }
  return sortedArray;
}

export default sortToEachCategory;
