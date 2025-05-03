import React from "react";
import { cn } from "../../libs/utils";
import {motion} from "motion/react";

type ButtonProps = {
    label? : string,
    className? : string
    onPress? : ()=>void;
    type?: "button" | "submit" | "reset";
};
const Button: React.FC<ButtonProps> = ({label = "Button",onPress, className, type="submit"}) => {
  return <motion.button 
  type={type}  
  whileTap={{scale:0.97}}
  onClick={onPress} 
  className={cn(" w-full btnColor rounded py-2 ", 
  className)}>
    {label}
  </motion.button>;
};

export default Button;
