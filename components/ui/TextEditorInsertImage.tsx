import React, { useState } from "react";
import { useRichTextEditorContext } from "./rich-text-editor-context";
import toast from "react-hot-toast";
import { Control } from "./rich-text-editor";
import { FileIcon, ImageIcon, LinkIcon } from "lucide-react";
import Modal from "./Modal";
import { Box, Tabs } from "@chakra-ui/react";
import Input from "./Input";
import MediaLibrary from "../pages/mediaLibrary/MediaLibrary";

const TextEditorInsertImage = () => {
  const { editor } = useRichTextEditorContext();
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [tabsValue, setTabsValue] = useState<"url" | "select">("url");

  const handleInsertImage = () => {
    if (!imageUrl) return toast.error("Inset an image or cancel");
    editor?.chain().focus().setImage({ src: imageUrl }).run();
    setOpen(false);
  };

  return (
    <>
      <Control.ButtonControl
        icon={<ImageIcon />}
        label="Insert Image"
        onClick={() => setOpen(true)}
        variant="ghost"
      />
      <Modal
        isOpen={open}
        onCancel={() => setOpen(false)}
        onConfirm={handleInsertImage}
        confirmText="Insert"
        size={tabsValue === "select" ? "cover" : "md"}
      >
        <Tabs.Root
          value={tabsValue}
          onValueChange={(e) => setTabsValue(e.value as "url" | "select")}
          h={"calc(100% - 1.2rem)"}
        >
          <Tabs.List>
            <Tabs.Trigger value="url">
              <LinkIcon /> Embed URL
            </Tabs.Trigger>
            <Tabs.Trigger value="select">
              <FileIcon /> Select File
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="url">
            <Box display="flex" gap="2" mt="4">
              <Input
                placeholder="Enter image URL"
                id="image-url-input"
                onChange={(e) => setImageUrl(e.target.value)}
                value={imageUrl ?? ""}
              />
            </Box>
          </Tabs.Content>
          <Tabs.Content value="select" h={"full"}>
            <Box h={"full"}>
              <MediaLibrary
                choseMediaMode="single"
                onChoseMedia={(m) => setImageUrl(m[0].fileUrl)}
              />
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </Modal>
    </>
  );
};

export default TextEditorInsertImage;
