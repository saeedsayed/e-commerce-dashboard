import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface IInputProps {
  label?: string;
  id: string;
  type?: string;
  register?: UseFormRegisterReturn<string>;
  err?: boolean;
  errMes?: string | undefined;
  required?: boolean;
}

const Input = ({
  label,
  id,
  type,
  register,
  err,
  errMes,
  required,
  ...rest
}: IInputProps & React.InputHTMLAttributes<HTMLInputElement>) => {
  const [isShow, setIsShow] = useState(false);
  const inputStyle = `mt-1 block w-full rounded-md bg-white/5 border px-3 py-2 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
    !!err && "border-[#df1b41]!"
  } `;
  const checkboxStyle = "h-4! w-4! rounded! bg-white/5 cursor-pointer";
  return (
    <div
      className={`relative flex-1 [&:has(:disabled)]:opacity-40 ${type === "checkbox" ? "flex flex-row-reverse items-center gap-2" : ""}`}
    >
      {label && (
        <label
          className="text-sm  first-letter:capitalize"
          htmlFor={id}
        >
          {label} {required && "*"}{" "}
          <span className="text-[#df1b41] font-bold">{errMes}</span>
        </label>
      )}
      <div className="relative">
        {!!register ? (
          <input
            className={`${type === "checkbox" ? checkboxStyle : inputStyle}`}
            placeholder={label}
            id={id}
            type={isShow ? "text" : type}
            {...register}
            {...rest}
          />
        ) : (
          <input
            className={`${type === "checkbox" ? checkboxStyle : inputStyle}`}
            placeholder={label}
            id={id}
            type={isShow ? "text" : type}
            {...rest}
          />
        )}

        {type == "password" && (
          <button
            onClick={() => setIsShow((p: boolean) => !p)}
            type="button"
            className={`absolute end-3 top-1/2 p-2 -translate-y-1/2`}
          >
            {isShow ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
