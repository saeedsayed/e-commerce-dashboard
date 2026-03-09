import { Center, Heading } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("HomePage");
  return (
    <Center h={"full"}>
      <Heading size={"3xl"}>{t("title")}</Heading>
    </Center>
  );
}
