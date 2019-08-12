const initialState = {
  token: ""
}

export default function(state=initialState, action){

  switch(action.type){
    case "TOKEN_ON_REFRESH":
      return {...state, token: action.payload}
    case "AUTHENTICATE_USER":
      sessionStorage.setItem('Token', action.payload);
      return {...state, token: action.payload}
    case "LOGOUT_USER":
      if (sessionStorage.Token){
        sessionStorage.removeItem('Token');
      }
      return {...state, token: action.payload}
    default:
      return state
  }
}
