import React from "react";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Checkbox as ChakraCheckbox, Field } from "@chakra-ui/react";

interface CheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  err?: boolean;
  errMes?: string;
}

function Checkbox<T extends FieldValues>({
  name,
  control,
  label,
  err,
  errMes,
}: CheckboxProps<T>) {
  return (
    <Field.Root invalid={err}>
      <Controller
        name={name}
        control={control}
        defaultValue={false as PathValueImpl<T, Path<T>>}
        render={({ field }) => (
          <ChakraCheckbox.Root
            checked={!!field.value}
            onCheckedChange={(details) => {
              field.onChange(!!details.checked);
            }}
          >
            <ChakraCheckbox.HiddenInput />
            <ChakraCheckbox.Control />
            {label && <ChakraCheckbox.Label>{label}</ChakraCheckbox.Label>}
          </ChakraCheckbox.Root>
        )}
      />

      {errMes && <Field.ErrorText>{errMes}</Field.ErrorText>}
    </Field.Root>
  );
}

export default Checkbox;
