import MediaLibrary from "@/components/pages/mediaLibrary/MediaLibrary";
import { Container } from "@chakra-ui/react";

const page = () => {
  return<Container h="full" fluid p={0} maxW={"2400px"}>
     <MediaLibrary />
  </Container>;
};

export default page;
