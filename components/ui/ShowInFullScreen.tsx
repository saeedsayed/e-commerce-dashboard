"use client";
import { Button } from "@chakra-ui/react";
import { Fullscreen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Tooltip } from "./tooltip";

const ShowInFullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const handleFullScreen = () => {
    setIsFullScreen((p) => !p);
  };
  useEffect(() => {
    const myDocument = document.documentElement;
    const requestFullScreen = myDocument.requestFullscreen;
    const exitFullscreen = document.exitFullscreen;
    if (isFullScreen && requestFullScreen) {
      requestFullScreen.call(myDocument);
    } else if (document.fullscreenElement) {
      exitFullscreen.call(document);
    }
  }, [isFullScreen]);
  return (
    <Tooltip content={isFullScreen?"Show in window":"Show in full screen"}>
      <Button onClick={handleFullScreen} size={"sm"} variant={"ghost"}>
        <Fullscreen />
      </Button>
    </Tooltip>
  );
};

export default ShowInFullScreen;
