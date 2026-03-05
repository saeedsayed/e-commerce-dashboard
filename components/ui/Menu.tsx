import React from "react";
import {
  Button,
  Menu as ChakraMenu,
  MenuSelectionDetails,
  Portal,
} from "@chakra-ui/react";

type Props = {
  buttonText: string | React.ReactNode;
  items: { label: string | React.ReactNode; value: string }[];
  onSelect?: (e: MenuSelectionDetails) => void;
};

const Menu = ({ buttonText, items, onSelect }: Props) => {
  return (
    <ChakraMenu.Root onSelect={onSelect}>
      <ChakraMenu.Trigger asChild>
        <Button variant="outline" size="sm">
          {buttonText}
        </Button>
      </ChakraMenu.Trigger>
      <Portal>
        <ChakraMenu.Positioner>
          <ChakraMenu.Content>
            {items.map((item) => (
              <ChakraMenu.Item key={item.value} value={item.value}>
                {item.label}
              </ChakraMenu.Item>
            ))}
          </ChakraMenu.Content>
        </ChakraMenu.Positioner>
      </Portal>
    </ChakraMenu.Root>
  );
};

export default Menu;
