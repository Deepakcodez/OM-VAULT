import React from "react";
import { cn } from "../../libs/utils";

type InputProps = {
  placeholder?: string;
  type?: string;
  value?: string | number ;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: string;
  label?: string;
  name?:string
};

const Input: React.FC<InputProps> = ({
  placeholder = "Enter text here",
  type = "text",
  value, 
  name,   
  onChange,
  label ,
  style,
}) => {

  return (
    <div className=" w-full flex flex-col">
        {
            label && <label>{label}</label>
        }
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        className={cn(
          "focus:outline-none focus:ring-0 border-0 border-b bg-zinc-800 border-gray-300 py-2  text-white placeholder:text-gray-500 px-2 rounded-sm",
          style
        )}
      />
    </div>
  );
};

export default Input;
