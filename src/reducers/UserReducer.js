const initialState = {
  userInfo: {}
}

export default function(state=initialState, action){

  switch(action.type){
    case "REGISTER_USER":
      return {...state, userInfo: action.payload};
    case "FETCH_USER":
      return {...state, userInfo: action.payload}
    case "EDIT_USER":
      return {...state, userInfo: action.payload}
    case "DELETE_USER":
      return state
    default:
      return state
  }
}
