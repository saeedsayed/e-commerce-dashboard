"use client";

import {
  DatePicker as ChakraDatePicker,
  Field,
  parseDate,
  Portal,
} from "@chakra-ui/react";
import { CalendarRangeIcon } from "lucide-react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

interface DatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  err?: boolean;
  errMsg?: string;
  selectionMode?: "single" | "range";
  label?: string;
}

function DatePicker<T extends FieldValues>({
  control,
  name,
  err,
  errMsg,
  selectionMode = "single",
  label = selectionMode === "range" ? "Select date range" : "Select date",
}: DatePickerProps<T>) {
  const normalizedValue = (value: string | string[] | undefined) => {
    if (!value) return [];

    try {
      if (selectionMode === "range") {
        return Array.isArray(value)
          ? value.filter(Boolean).map((v: string) => parseDate(v))
          : [];
      }

      return typeof value === "string" ? [parseDate(value)] : [];
    } catch {
      return [];
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Field.Root invalid={err}>
          <ChakraDatePicker.Root
            selectionMode={selectionMode}
            value={normalizedValue(field.value)}
            onValueChange={(e) => {
              if (!e?.value) {
                field.onChange(selectionMode === "single" ? "" : []);
                return;
              }

              if (selectionMode === "single") {
                field.onChange(e.value[0]?.toString() ?? "");
              } else {
                field.onChange(
                  Array.isArray(e.value)
                    ? e.value.map((v) => v?.toString()).filter(Boolean)
                    : [],
                );
              }
            }}
            invalid={err}
          >
            <ChakraDatePicker.Label>{label}</ChakraDatePicker.Label>
            <ChakraDatePicker.Control>
              <ChakraDatePicker.Input index={0} />
              {selectionMode === "range" && (
                <ChakraDatePicker.Input index={1} />
              )}

              <ChakraDatePicker.IndicatorGroup>
                <ChakraDatePicker.Trigger>
                  <CalendarRangeIcon />
                </ChakraDatePicker.Trigger>
              </ChakraDatePicker.IndicatorGroup>
            </ChakraDatePicker.Control>

            <Portal>
              <ChakraDatePicker.Positioner>
                <ChakraDatePicker.Content>
                  <ChakraDatePicker.View view="day">
                    <ChakraDatePicker.Header />
                    <ChakraDatePicker.DayTable />
                  </ChakraDatePicker.View>

                  <ChakraDatePicker.View view="month">
                    <ChakraDatePicker.Header />
                    <ChakraDatePicker.MonthTable />
                  </ChakraDatePicker.View>

                  <ChakraDatePicker.View view="year">
                    <ChakraDatePicker.Header />
                    <ChakraDatePicker.YearTable />
                  </ChakraDatePicker.View>
                </ChakraDatePicker.Content>
              </ChakraDatePicker.Positioner>
            </Portal>
          </ChakraDatePicker.Root>

          {err && <Field.ErrorText>{errMsg}</Field.ErrorText>}
        </Field.Root>
      )}
    />
  );
}

export default DatePicker;
