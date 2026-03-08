import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";

import { FileImage } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import MediaLibrary from "../mediaLibrary/MediaLibrary";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  Button,
  Field,
  FieldRoot,
  Grid,
  TagsInput,
  Text,
} from "@chakra-ui/react";
import createBlogSchema, { TCreateBlogSchema } from "@/schemas/createBlog";
import TextEditor from "@/components/ui/TextEditor";

type Props = {
  onSubmit: SubmitHandler<TCreateBlogSchema>;
  isSubmitting: boolean;
  initialValues?: TCreateBlogSchema;
  formId: string;
};

const BlogForm = ({ onSubmit, isSubmitting, initialValues, formId }: Props) => {
  // state
  const [choseFileModalIsOpen, setChoseFileModalIsOpen] =
    useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  // form controller
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createBlogSchema),
    defaultValues: initialValues || {},
  });

  // handle open File modal
  const handleFileModal = () => setChoseFileModalIsOpen((p) => !p);
  return (
    <>
      {/* create product form modal */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        id={formId}
        className="flex flex-col gap-2 w-full"
      >
        <Grid templateColumns={"repeat(3, 1fr)"} gap={8} alignItems={"end"}>
          <Input
            id="title"
            label={"blog title"}
            placeholder={"enter the blog title"}
            err={!!errors.title}
            errMes={errors.title?.message}
            register={register("title")}
            disabled={isSubmitting}
          />
          {/* thumbnail */}
          <Box>
            <div className="flex items-center gap-1.5 flex-wrap">
              <h4>Thumbnail* :</h4>
              {!!getValues("thumbnail") ? (
                <div className="size-32 relative">
                  {" "}
                  <Image
                    src={getValues("thumbnail")}
                    alt="thumbnail"
                    fill
                    className="object-contain"
                  />
                </div>
              ) : (
                <p>Select Thumbnail 👇</p>
              )}
            </div>
            {/* select thumbnail button */}
            <Button
              className="btn"
              onClick={() => handleFileModal()}
              type="button"
              border={"2px solid"}
              w={"full"}
              borderColor={errors?.thumbnail ? "red.border" : ""}
            >
              Chose thumbnail <FileImage />
            </Button>{" "}
            {!!errors?.thumbnail && (
              <Text color={"red.border"} fontSize={"sm"}>
                {errors.thumbnail?.message}
              </Text>
            )}
          </Box>
          {/* tags input */}
          <FieldRoot invalid={!!errors.tags}>
            <TagsInput.Root
              value={getValues("tags")}
              onValueChange={(details) => {
                setValue("tags", details.value);
                if (!!details.value.length) clearErrors("tags");
              }}
            >
              <TagsInput.Label>Tags</TagsInput.Label>
              <TagsInput.Control>
                <TagsInput.Items />
                <TagsInput.Input placeholder="Add tags then press enter" />
                <TagsInput.ClearTrigger />
              </TagsInput.Control>
            </TagsInput.Root>
            {!!errors.tags && (
              <Field.ErrorText>{errors.tags?.message}</Field.ErrorText>
            )}
          </FieldRoot>
        </Grid>
        {/* text editor field */}
        <TextEditor
          defaultValue={getValues("content")}
          onChange={(v) => {
            setValue("content", v);
            if (!!v) clearErrors("content");
          }}
        />
        <FieldRoot invalid={!!errors?.content}>
          {!!errors.content && (
            <Field.ErrorText>{errors.content?.message}</Field.ErrorText>
          )}
        </FieldRoot>
      </form>
      {/* select thumbnail from media library modal */}
      <Modal
        isOpen={choseFileModalIsOpen}
        onCancel={() => handleFileModal()}
        onConfirm={() => {
          // if (!choseFileMode) return;
          if (!!selectedFiles.length) clearErrors("thumbnail");
          setValue("thumbnail", selectedFiles[0]);
          handleFileModal();
        }}
        title="select product thumbnail"
        size="cover"
      >
        <div className="h-full">
          <MediaLibrary
            choseMediaMode={"single"}
            onChoseMedia={(media) => {
              setSelectedFiles(media.map((m) => m.fileUrl));
            }}
          />
        </div>
      </Modal>
    </>
  );
};

export default BlogForm;
