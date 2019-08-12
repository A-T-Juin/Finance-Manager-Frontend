import React from "react";
import Login from "./Login";
import Register from "./Register";

const UserSelector = ({ typeOfUser }) => {

  const registeredUser = (
    <Login />
  );

  const newUser = (
    <Register />
  );

  return (
    <div>
      {typeOfUser === "REGISTERED_USER" ? registeredUser : newUser}
    </div>
  )

}

export default UserSelector;
