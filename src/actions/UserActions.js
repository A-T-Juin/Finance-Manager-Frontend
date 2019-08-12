export const registerUser = (userData) => dispatch => {
  fetch("http://localhost:8000/api/owners/", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(userData)
  })
  .then(res => res.json())
  .then(newUser => dispatch({
    type: "REGISTER_USER",
    payload: newUser
  }))
}



export const getUserData = (token) => dispatch => {
  fetch("http://localhost:8000/api/owners/passtoken/", {
    method: "POST",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(token)
  })
  .then(res => res.json())
  .then(userData => {
    dispatch({
      type: "FETCH_USER",
      payload: userData
  })}
)
}


export const editUser = (userData, id) => dispatch => {
  fetch("http://localhost:8000/api/owners/" + id + "/", {
    method: "PUT",
    headers: {
      "content-type": "application/json"
    },
    body: JSON.stringify(userData)
  })
  .then(res => res.json())
  .then(newUser => dispatch({
    type: "EDIT_USER",
    payload: newUser,
    id
  }))
}

export const deleteUser = (id, loginInfo) => dispatch => {
  fetch("http://localhost:8000/api/owners/" + id + "/", {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "Authorization": "Basic " + btoa(loginInfo.username + ":" + loginInfo.password)
    }
  })
  .then(res => dispatch({
    type: "DELETE_USER",
    payload: res,
    id
  }))
}
