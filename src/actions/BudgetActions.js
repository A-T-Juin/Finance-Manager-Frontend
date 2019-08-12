export const budgetSelector = (budgetIndex) => dispatch => {
  dispatch({
    type: "BUDGET_SELECTOR",
    payload: budgetIndex
  })
};

export const budgetAmountSelector = (userID, budgetID) => dispatch => {
  fetch("http://localhost:8000/api/owners/" + userID + "/budgets/" + budgetID + "/", {
    method: "GET",
    headers: {
      "Authorization": "Token " + sessionStorage.Token
    }})
  .then(res => res.json())
  .then(budget => dispatch({
    type: "BUDGET_AMOUNT_SELECTOR",
    payload: budget.budgetGoal
  }))
};

export const createBudget = (budgetData, userID) => dispatch => {
  fetch("http://localhost:8000/api/owners/" + userID + "/budgets/", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Authorization": "Token " + sessionStorage.Token
    },
    body: JSON.stringify(budgetData)
  })
  .then(res => res.json())
  .then(newBudget => dispatch({
    type: "CREATE_BUDGET",
    payload: newBudget
  }))
};

export const editBudget = (budgetData, userID, budgetID) => dispatch => {
  fetch("http://localhost:8000/api/owners/" + userID + "/budgets/" + budgetID + "/", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "Authorization": "Token " + sessionStorage.Token
    },
    body: JSON.stringify(budgetData)
  })
  .then(res => res.json())
  .then(editedBudget => dispatch({
    type: "EDIT_BUDGET",
    payload: editedBudget
  }))
};

export const deleteBudget = (userID, budgetID) => dispatch => {
  fetch("http://localhost:8000/api/owners/" + userID + "/budgets/" + budgetID + "/", {
    method: "DELETE",
    headers: {
      "Authorization": "Token " + sessionStorage.Token
    }
  })
  .then(res => dispatch({
    type: "DELETE_BUDGET",
    payload: budgetID
  }))
};

export const fetchBudgetLI = (userInfo) => dispatch => {
  fetch("http://localhost:8000/api/owners/token/", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(userInfo)
  })
  .then(res => res.json())
  .then(data =>
    fetch("http://localhost:8000/api/owners/passtoken/", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data.token)
    })
  )
  .then(res => res.json())
  .then(userData =>
    fetch("http://localhost:8000/api/owners/" + userData.id + "/budgets/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": "Token " + sessionStorage.Token
      }
    })
  )
  .then(res => res.json())
  .then(budgets => dispatch({
    type: "FETCH_BUDGET_LOGIN",
    payload: budgets
  }))
};

export const fetchBudgetsOnRefresh = () => dispatch => {
  fetch("http://localhost:8000/api/owners/passtoken/" , {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(sessionStorage.Token)
  })
  .then(res => res.json())
  .then(userData =>
    fetch("http://localhost:8000/api/owners/" + userData.id +"/budgets/", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Authorization": "Token " + sessionStorage.Token
      }
    })
  )
  .then(res => res.json())
  .then(budgets => dispatch({
    type: "FETCH_BUDGETS_ON_REFRESH",
    payload: budgets
  }))
}
