import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { Textarea as ChakraTextarea, Field } from "@chakra-ui/react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  register?: UseFormRegisterReturn;
  err?: boolean;
  errMes?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  register,
  err,
  errMes,
  ...rest
}) => {
  return (
    <Field.Root invalid={err}>
      {label && <Field.Label>{label}</Field.Label>}
      <ChakraTextarea {...register} {...rest} />
      {errMes && <Field.ErrorText>{errMes}</Field.ErrorText>}
    </Field.Root>
  );
};

export default Textarea;