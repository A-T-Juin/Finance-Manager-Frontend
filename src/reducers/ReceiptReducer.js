const initialState = {
  listOfReceipts: [],
}

export default function(state=initialState, action){

  switch(action.type){
    case "FETCH_RECEIPTS":
      return {...state, listOfReceipts: action.payload}
    case "FETCH_NOTES_LOGIN":
      return {...state, listOfReceipts: action.payload}
    case "CREATE_RECEIPT":
      let listWithNewItem = [];
      for (var receiptIndex = 0; receiptIndex < state.listOfReceipts.length; receiptIndex ++){
        listWithNewItem.push(state.listOfReceipts[receiptIndex])
      }
      listWithNewItem.push(action.payload)
      return {...state, listOfReceipts: listWithNewItem}
    case "EDIT_RECEIPT":
      let editedArray = [];
      let editedInstance = state.listOfReceipts.find(instance => instance.id === action.payload.id)
      editedInstance.receiptName = action.payload.receiptName
      editedInstance.receiptAmount = action.payload.receiptAmount
      editedInstance.receiptDate = action.payload.receiptDate
      editedInstance.receiptDescription = action.payload.receiptDescription
      for (var receiptIndex = 0; receiptIndex < state.listOfReceipts.length; receiptIndex ++){
        if (state.listOfReceipts[receiptIndex].id !== action.payload.id){
          editedArray.push(state.listOfReceipts[receiptIndex])
        } else {
          editedArray.push(editedInstance)
        }
      }
      return {...state, listOfReceipts: editedArray}
    case "DELETE_RECEIPT":
      let deletedReceiptArray = [];
      for (var receiptIndex = 0; receiptIndex < state.listOfReceipts.length; receiptIndex ++){
        if (state.listOfReceipts[receiptIndex].id !== action.payload){
          deletedReceiptArray.push(state.listOfReceipts[receiptIndex])
        }
      }
      return {...state, listOfReceipts: deletedReceiptArray}
    default:
      return state
  }
}
