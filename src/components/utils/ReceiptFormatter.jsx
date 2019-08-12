
const receiptFormatter = (receipts) => {
  let formattedArray = [];
  for (var i = 0; i < receipts.length; i ++){
    formattedArray.push({
      ...receipts[i],
      receiptAmount: Number(receipts[i].receiptAmount)
    });
  };
  return formattedArray;
}


export default receiptFormatter;
