const initialState = {
  listOfBudgets: [],
  selectedBudget: null,
  budgetAmount: null
}

export default function(state=initialState, action){

  switch(action.type){
    case "FETCH_BUDGETS_ON_REFRESH":
      return {...state, listOfBudgets: action.payload}
    case "BUDGET_SELECTOR":
      return {...state, selectedBudget: action.payload}
    case "BUDGET_AMOUNT_SELECTOR":
      return {...state, budgetAmount: action.payload}
    case "FETCH_BUDGETS":
      return {...state, listOfBudgets: action.payload}
    case "FETCH_BUDGET_LOGIN":
      return {...state, listOfBudgets: action.payload}
    case "CREATE_BUDGET":
      let listWithNewItem = [];
      for (var budgetIndex = 0; budgetIndex < state.listOfBudgets.length; budgetIndex ++){
        listWithNewItem.push(state.listOfBudgets[budgetIndex])
      }
      listWithNewItem.push(action.payload)
      return {...state, listOfBudgets: listWithNewItem}
    case "EDIT_BUDGET":
      let editedArray = [];
      let editedInstance = state.listOfBudgets.find(instance => instance.id === action.payload.id)
      editedInstance.title = action.payload.title
      editedInstance.description = action.payload.description
      editedInstance.endDate = action.payload.endDate
      editedInstance.budgetGoal = action.payload.budgetGoal
      for (var budgetIndex = 0; budgetIndex < state.listOfBudgets.length; budgetIndex ++){
        if (state.listOfBudgets[budgetIndex].id !== action.payload.id){
          editedArray.push(state.listOfBudgets[budgetIndex])
        } else {
          editedArray.push(editedInstance)
        }
      }
      return {...state, listOfBudgets: editedArray}
    case "DELETE_BUDGET":
      let deletedBudgetArray = [];
      for (var budgetIndex = 0; budgetIndex < state.listOfBudgets.length; budgetIndex ++){
        if (state.listOfBudgets[budgetIndex].id !== action.payload){
          deletedBudgetArray.push(state.listOfBudgets[budgetIndex])
        }
      }
      return {...state, listOfBudgets: deletedBudgetArray}
    default:
      return state
  }
}
