import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

const Loading: React.FC = () => {
  return (
    <Center h="100vh">
      <Spinner size="xl" thickness="4px" speed="0.65s" emptyColor="gray.200" />
    </Center>
  );
};

export default Loading;
