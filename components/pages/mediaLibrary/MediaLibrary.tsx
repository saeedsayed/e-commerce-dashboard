"use client";
import  { useState } from "react";
import CreateFolder from "./CreateFolder";
import FolderList from "./FolderList";
import FolderMedia from "./FolderMedia";
import { IFile, IFolder } from "@/types";
import { Center, Splitter } from "@chakra-ui/react";
// import { useLocale } from "next-intl";

type Props = {
  isPortal?: boolean;
  onChoseMedia?: (media: IFile[]) => void;
  choseMediaMode?: "multiple" | "single";
};

const MediaLibrary = ({ onChoseMedia, choseMediaMode }: Props) => {
  const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);
  // const local = useLocale();
  return (
    <>
      <Splitter.Root
        panels={[{ id: "a" }, { id: "b" }]}
        defaultSize={[15, 85]}
        overflow={"visible"}
        // dir={local === "ar" ? "rtl" : "ltr"}
      >
        <Splitter.Panel id="a" ps={2} py={4}>
          {/* <Box boxSize="full"> */}
          <CreateFolder />
          <FolderList
            onSelectFolder={(folder: IFolder) => setSelectedFolder(folder)}
            selectedFolder={selectedFolder}
          />
          {/* </Box> */}
        </Splitter.Panel>
        <Splitter.ResizeTrigger id="a:b" />
        <Splitter.Panel id="b" ps={2} pt={4}>
          {!!selectedFolder ? (
            <FolderMedia
              folderId={selectedFolder?._id}
              onSelectFile={onChoseMedia}
              selectMode={choseMediaMode}
            />
          ) : (
            <Center boxSize="full" textStyle="2xl">
              select folder at first
            </Center>
          )}
        </Splitter.Panel>
      </Splitter.Root>
    </>
  );
};

export default MediaLibrary;
