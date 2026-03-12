import React, { HTMLInputTypeAttribute } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import {
  Input as ChakraInput,
  Field,
  ConditionalValue,
  InputProps,
} from "@chakra-ui/react";
import { PasswordInput } from "./password-input";

interface IInputProps extends Omit<
  InputProps & React.RefAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  register?: UseFormRegisterReturn;
  err?: boolean;
  errMes?: string;
  type?: HTMLInputTypeAttribute;
  size?: ConditionalValue<"sm" | "md" | "lg" | "xl" | "2xl" | "2xs" | "xs">;
}

const Input: React.FC<IInputProps> = ({
  label,
  type = "text",
  register,
  err,
  errMes,
  size,
  ...rest
}) => {
  const inputElement =
    type === "password" ? (
      <PasswordInput {...register} {...rest} />
    ) : (
      <ChakraInput type={type} size={size} {...register} {...rest} />
    );

  return (
    <Field.Root invalid={err}>
      {label && <Field.Label>{label}</Field.Label>}
      {inputElement}
      {errMes && <Field.ErrorText>{errMes}</Field.ErrorText>}
    </Field.Root>
  );
};

export default Input;
