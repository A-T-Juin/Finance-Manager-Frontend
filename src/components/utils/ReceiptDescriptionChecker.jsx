import React from "react";

const receiptDescriptionChecker = (description) => {
  if (!description){
    return(<p>No description provided!</p>)
  } else {
    return(<p>{description}</p>)
  }
}

export default receiptDescriptionChecker;
