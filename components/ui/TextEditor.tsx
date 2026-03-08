import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import TextAlign from "@tiptap/extension-text-align";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Control, RichTextEditor } from "./rich-text-editor";
import { useState } from "react";
import { Box } from "@chakra-ui/react";
import { CharacterCount } from "@tiptap/extensions/character-count";
import { Placeholder } from "@tiptap/extensions";
import Highlight from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import { TextStyleKit } from "@tiptap/extension-text-style";
import Link from "@tiptap/extension-link";
import TextEditorInsertImage from "./TextEditorInsertImage";

type Props = {
  onChange?: (v: string) => void;
  defaultValue: string;
};

const TextEditor = ({ onChange, defaultValue }: Props) => {
  const [content, setContent] = useState<string>(defaultValue || "");

  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ link: { openOnClick: false } }),
      Subscript,
      Superscript,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ["paragraph", "heading"] }),
      Highlight.configure({
        multicolor: true,
      }),
      Placeholder.configure({
        placeholder: "Start typing your content here...",
      }),
      Image,
      CharacterCount.configure({
        limit: 20000,
        mode: "textSize",
      }),
      TextStyleKit,
    ],
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) return null;

  const charCount = editor.storage.characterCount.characters();
  const wordCount = editor.storage.characterCount.words();
  return (
    <>
      <RichTextEditor.Root editor={editor} position={"relative"}>
        <RichTextEditor.Toolbar position={"sticky"} top={0} zIndex={10}>
          <RichTextEditor.ControlGroup>
            <Control.FontFamily />
            <Control.FontSize />
          </RichTextEditor.ControlGroup>

          <RichTextEditor.ControlGroup>
            <Control.Bold />
            <Control.Italic />
            <Control.Underline />
            <Control.Strikethrough />
            <Control.Code />
          </RichTextEditor.ControlGroup>

          <RichTextEditor.ControlGroup>
            <Control.H1 />
            <Control.H2 />
            <Control.H3 />
            <Control.H4 />
          </RichTextEditor.ControlGroup>
          <RichTextEditor.ControlGroup>
            <Control.Highlight />
          </RichTextEditor.ControlGroup>
          <RichTextEditor.ControlGroup>
            <Control.AlignLeft />
            <Control.AlignCenter />
            <Control.AlignRight />
          </RichTextEditor.ControlGroup>
          <RichTextEditor.ControlGroup>
            <Control.BulletList />
            <Control.OrderedList />
          </RichTextEditor.ControlGroup>
          <RichTextEditor.ControlGroup>
            <TextEditorInsertImage />
          </RichTextEditor.ControlGroup>
          <RichTextEditor.ControlGroup>
            <Control.Undo />
            <Control.Redo />
          </RichTextEditor.ControlGroup>
        </RichTextEditor.Toolbar>

        <RichTextEditor.Content />
        <RichTextEditor.Footer justify="flex-end" textStyle="xs">
          <Box fontVariantNumeric="tabular-nums">Characters: {charCount}</Box>
          <Box fontVariantNumeric="tabular-nums">Words: {wordCount}</Box>
        </RichTextEditor.Footer>
      </RichTextEditor.Root>
    </>
  );
};

export default TextEditor;
