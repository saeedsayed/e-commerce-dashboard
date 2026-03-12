import { Box, HStack, Slider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NumberInput from "./NumberInput";

interface Props {
  minValLabel?: string;
  maxValLabel?: string;
  maxVal?: number;
  defaultValue?: number[];
  step?: number;
  onChange?: (v: number[]) => void;
  onRangeChangeEnd?: (v: number[]) => void;
}

const RangeSlider = ({
  minValLabel = "Min value",
  maxValLabel = "Max value",
  maxVal = 100,
  defaultValue = [0, maxVal],
  step = 1,
  onChange,
  onRangeChangeEnd,
  ...rest
}: Props & Slider.RootProps & React.RefAttributes<HTMLDivElement>) => {
  const [realValues, setRealValues] = useState<number[]>(defaultValue);
  const getRangeValue = (RealValues: number[]): number[] => {
    const RangeValue = RealValues.map((RV) => +((RV / maxVal) * 100).toFixed());
    return RangeValue;
  };
  const changeRangeValue = (newRangeValue: number[]) => {
    const newRealValues = newRangeValue.map(
      (RangeV) => +((RangeV / 100) * maxVal).toFixed(),
    );
    setRealValues(newRealValues);
  };
  useEffect(() => {
    onChange?.(realValues);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [realValues]);
  return (
    <Box w={"sm"}>
      <HStack mb={2}>
        <NumberInput
          flex={1}
          label={minValLabel}
          name="rangeMinVal"
          value={`${realValues[0]}`}
          onValueChange={(v) => setRealValues((pv) => [v.valueAsNumber, pv[1]])}
        />
        <NumberInput
          flex={1}
          label={maxValLabel}
          name="rangeMaxVal"
          value={`${realValues[1]}`}
          onValueChange={(v) => setRealValues((pv) => [pv[0], v.valueAsNumber])}
        />
      </HStack>
      <Slider.Root
        step={step}
        maxW="md"
        value={getRangeValue(realValues)}
        onValueChange={(v) => changeRangeValue(v.value)}
        onValueChangeEnd={() => onRangeChangeEnd?.(realValues)}
        minStepsBetweenThumbs={2}
        {...rest}
      >
        {/* <Slider.ValueText /> */}
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    </Box>
  );
};

export default RangeSlider;
