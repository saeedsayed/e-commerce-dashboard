import { Link } from "@/i18n/navigation";
import {
  AbsoluteCenter,
  Box,
  Button,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <AbsoluteCenter>
      <VStack>
        <Heading
          as="h1"
          fontSize={"5xl"}
          fontWeight={"bold"}
          lineHeight={"unset"}
          className="bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent"
        >
          404 Not Found
        </Heading>
        <Box className="h-px w-80 rounded bg-linear-to-r from-gray-400 to-gray-800 my-5 md:my-7"></Box>
        <Text className="md:text-xl text-gray-400 max-w-lg text-center">
          The page you are looking for does not exist or has been moved.
        </Text>
        <Link href="/">
          <Button>
            Back to Home
            <MoveRight />
          </Button>
        </Link>
      </VStack>
    </AbsoluteCenter>
  );
}
