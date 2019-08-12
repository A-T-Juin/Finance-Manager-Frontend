export const typeOfUserIdentifier = (userType) => dispatch => {
  dispatch({
    type: "USER_SELECTOR",
    payload: userType
  })
};
