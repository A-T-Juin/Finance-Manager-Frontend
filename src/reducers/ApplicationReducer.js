const initialState = {
  typeOfUser: "",
}

export default function(state=initialState, action){
  switch (action.type){
    case "USER_SELECTOR":
      return {...state, typeOfUser: action.payload}
    default:
      return state
  }
}
