export const obtainUserToken = (userInfo) => dispatch => {
  fetch("http://localhost:8000/api/owners/token/", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(userInfo)
  })
  .then(res => res.json())
  .then(data => dispatch({
    type: "AUTHENTICATE_USER",
    payload: data.token
  }))
}

export const authenticateUser = (userInfo) => dispatch => {
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
  .then(userData => dispatch({
    type: "FETCH_USER",
    payload: userData
  }))
}

export const setToken = () => dispatch => {
  dispatch({
    type: "TOKEN_ON_REFRESH",
    payload: sessionStorage.Token
  })
}

export const logoutUser = () => dispatch => {
  dispatch({
    type: "LOGOUT_USER",
    payload: ""
  })
}
