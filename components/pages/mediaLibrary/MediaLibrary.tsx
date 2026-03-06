"use client";
import React, { useState } from "react";
import CreateFolder from "./CreateFolder";
import FolderList from "./FolderList";
import FolderMedia from "./FolderMedia";
import { IFile, IFolder } from "@/types";
import { Grid, GridItem, Text } from "@chakra-ui/react";

type Props = {
  isPortal?: boolean;
  onChoseMedia?: (media: IFile[]) => void;
  choseMediaMode?: "multiple" | "single";
};

const MediaLibrary = ({ onChoseMedia, choseMediaMode }: Props) => {
  const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);
  return (
    <Grid h={"full"} templateColumns={"minmax(auto, 280px) 1fr"} gap={4}>
      <GridItem
        overflow={"hidden"}
        borderEnd={"1px solid"}
        borderColor={"border.emphasized"}
        py={5}
        my={-4}
        ms={-5}
      >
        <CreateFolder />
        <FolderList
          onSelectFolder={(folder: IFolder) => setSelectedFolder(folder)}
          selectedFolder={selectedFolder}
        />
      </GridItem>
      <GridItem overflow={"hidden"} me={-6}>
        {!!selectedFolder ? (
          <FolderMedia
            folderId={selectedFolder?._id}
            onSelectFile={onChoseMedia}
            selectMode={choseMediaMode}
          />
        ) : (
          <Text>select folder at first</Text>
        )}
      </GridItem>
    </Grid>
  );
};

export default MediaLibrary;
