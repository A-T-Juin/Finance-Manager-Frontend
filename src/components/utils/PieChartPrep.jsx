const pieChartPrep = (array) => {
  const finalArray = [];
  let tempArray = [];
  for (var i = 0; i < array.length; i ++){
    tempArray.push(array[i]);
  }
  for (var j = 0; j < tempArray.length; j++){
    tempArray[j]["pieData"]=1
    finalArray.push(tempArray[j])
  }
  return finalArray;
}

export default pieChartPrep;
