const categoryObjectAccessor = categoryObject => {
  return categoryObject.total;
}

const biggestCategory = allCategories => {
  let biggestCategory = allCategories[0];
  for (var i = 0; i < allCategories.length; i++){
    if (categoryObjectAccessor(biggestCategory) > categoryObjectAccessor(allCategories[i])){
      null;
    } else {
      biggestCategory = allCategories[i]
    }
  }
  if (categoryObjectAccessor(biggestCategory) === 0){
    return "Add receipts to get summarized data"
  } else {
    return biggestCategory.receiptCategory;
  }
}

export default biggestCategory;
