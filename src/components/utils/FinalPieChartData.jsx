const categoryModifier = categoryInstance => {
    switch(categoryInstance.receiptCategory){
      case "misc":
        return {...categoryInstance, receiptCategory: "Miscellaneous Expenditures"}
      case "food":
        return {...categoryInstance, receiptCategory: "Food and Drinks"}
      case "cons":
        return {...categoryInstance, receiptCategory: "Consumer Goods"}
      case "bill":
        return {...categoryInstance, receiptCategory: "Bills"}
      case "Remaining Budget":
        return {...categoryInstance, receiptCategory: "Remaining Budget"}
    }
}

const CategoryConverter = listOfCategoryInstances => {
  const shallowCopy = listOfCategoryInstances;
  const finalData = [];
  for (var i = 0; i < shallowCopy.length; i++){
    finalData.push(categoryModifier(shallowCopy[i]))
  }
  return finalData;
}

export default CategoryConverter;
