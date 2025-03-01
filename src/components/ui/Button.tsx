import React from "react";
import { cn } from "../../libs/utils";

type ButtonProps = {
    label? : string,
    className? : string
    onPress? : ()=>void;
};
const Button: React.FC<ButtonProps> = ({label = "Button",onPress, className}) => {
  return <button onClick={onPress} className={cn(" w-full btnColor rounded py-2 ", className)}>
    {label}
  </button>;
};

export default Button;
