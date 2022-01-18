import React from "react";
import cls from './MyInput.module.css'

const MyInput = (props) => {

  return (
    <input {...props} 
      className = {cls.my_input} 
    />
	)
}

export default MyInput;