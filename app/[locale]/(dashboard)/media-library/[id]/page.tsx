import FolderMedia from "@/components/pages/mediaLibrary/FolderMedia";

type Props = {
  params: {
    id: string;
  };
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  return <FolderMedia folderId={id} />;
};

export default page;
