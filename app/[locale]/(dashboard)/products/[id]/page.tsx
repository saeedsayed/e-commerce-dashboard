import React from "react";

type Props = {
  params: { id: string };
};

const page = async ({ params }: Props) => {
  const { id } = await params;
  return <div>page {id}</div>;
};

export default page;
