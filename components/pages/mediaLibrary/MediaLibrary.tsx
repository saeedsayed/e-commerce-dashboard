"use client";
import React, { useState } from "react";
import CreateFolder from "./CreateFolder";
import FolderList from "./FolderList";
import FolderMedia from "./FolderMedia";
import { IFile, IFolder } from "@/types";

type Props = {
  isPortal?: boolean;
  onChoseMedia?: (media: IFile[]) => void;
  choseMediaMode?: "multiple" | "single";
};

const MediaLibrary = ({ onChoseMedia, choseMediaMode }: Props) => {
  const [selectedFolder, setSelectedFolder] = useState<IFolder | null>(null);
  return (
    <div className="flex h-[calc(100%+2rem)] -my-4">
      <div className="border-e w-fit min-w-52 py-4 overflow-hidden">
        <CreateFolder />
        <FolderList
          onSelectFolder={(folder: IFolder) => setSelectedFolder(folder)}
          selectedFolder={selectedFolder}
        />
      </div>
      <div className="p-4 flex-1 min-w-md h-full overflow-auto">
        {!!selectedFolder ? (
          <FolderMedia
            folderId={selectedFolder?._id}
            onSelectFile={onChoseMedia}
            selectMode={choseMediaMode}
          />
        ) : (
          <p>select folder at first</p>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
