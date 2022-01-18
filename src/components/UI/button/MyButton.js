import React from "react";
import cls from './MyButton.module.css'

const MyButton = ({ children, ...props }) => {

  return (
    <button {...props} 
      className = {cls.my_btn + ' ' + props.className}
    >
        { children }
    </button>
	)
}

export default MyButton;