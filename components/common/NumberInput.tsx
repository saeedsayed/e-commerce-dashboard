import React from "react";
import { NumberInput as ChakraNumberInput, Field } from "@chakra-ui/react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";

interface NumberInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  err?: boolean;
  errMes?: string;
  width?: string | number;
}

function NumberInput<T extends FieldValues>({
  name,
  control,
  label,
  defaultValue = 0,
  min,
  max,
  step = 1,
  err,
  errMes,
  width = "100%",
}: NumberInputProps<T>) {
  return (
    <Field.Root invalid={err}>
      {label && <Field.Label>{label}</Field.Label>}

      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue as any}
        render={({ field }) => (
          <ChakraNumberInput.Root
            width={width}
            min={min}
            max={max}
            step={step}
            value={field.value ?? ""}
            onValueChange={(details) => {
              field.onChange(details.value === "" ? "" : Number(details.value));
            }}
          >
            <ChakraNumberInput.Control />
            <ChakraNumberInput.Input onBlur={field.onBlur} />
          </ChakraNumberInput.Root>
        )}
      />

      {errMes && <Field.ErrorText>{errMes}</Field.ErrorText>}
    </Field.Root>
  );
}

export default NumberInput;
