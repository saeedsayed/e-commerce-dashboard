import { Slider, SliderValueChangeDetails } from "@chakra-ui/react";
import React from "react";

type Props = {
  onChange?: (v: SliderValueChangeDetails) => void;
  defaultValue?: [number, number] | [number];
};

const RangeSlider = ({ defaultValue = [0, 100], onChange }: Props) => {
  return (
    <Slider.Root
      maxW="md"
      defaultValue={defaultValue}
      onValueChange={(v) => onChange?.(v)}
      minStepsBetweenThumbs={8}
    >
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumbs />
      </Slider.Control>
    </Slider.Root>
  );
};

export default RangeSlider;
