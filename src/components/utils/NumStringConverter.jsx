import React from "react";

const numStringConverter = (numberString) => {
  let newNumber = Number(numberString);
  return (newNumber.toFixed(2))
}

export default numStringConverter;
