export const createReceipt = (receiptData, userID, budgetID) => dispatch => {
  fetch("http://localhost:8000/api/owners/" + userID + "/budgets/" + budgetID + "/receipts/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": "Token " + sessionStorage.Token
    },
    body: JSON.stringify(receiptData)
  })
  .then(res => res.json())
  .then(newReceipt => dispatch({
    type: "CREATE_RECEIPT",
    payload: newReceipt
  }))
}


export const fetchReceipts = (userID, budgetID) => dispatch => {
  fetch("http://localhost:8000/api/owners/" + userID + "/budgets/" + budgetID + "/receipts/", {
    method: "GET",
    headers: {
      "Authorization": "Token " + sessionStorage.Token
    }
  })
  .then(res => res.json())
  .then(receiptData => dispatch({
    type: "FETCH_RECEIPTS",
    payload: receiptData
  }))
}

export const editReceipt = (receiptData, userID, budgetID, receiptID) => dispatch => {
  fetch("http://localhost:8000/api/owners/" + userID + "/budgets/" + budgetID + "/receipts/" + receiptID + "/", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "Authorization": "Token " + sessionStorage.Token
    },
    body: JSON.stringify(receiptData)
  })
  .then(res => res.json())
  .then(editedReceipt => dispatch({
    type: "EDIT_RECEIPT",
    payload: editedReceipt
  }))
}

export const deleteReceipt = (userID, budgetID, receiptID) => dispatch => {
  fetch("http://localhost:8000/api/owners/" + userID + "/budgets/" + budgetID + "/receipts/" + receiptID + "/", {
    method: "DELETE",
    headers: {
      "Authorization": "Token " + sessionStorage.Token
    }
  })
  .then(res => dispatch({
    type: "DELETE_RECEIPT",
    payload: receiptID
  }))
}
