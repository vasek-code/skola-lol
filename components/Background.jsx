import React from "react";
import { Flex, Image } from "@chakra-ui/react";

export default function Background() {
  return (
    <Flex w="100%" h="100vh" position="absolute" pl="63px" pt="60px">
      <Image src="gragas2.jpg" w="100%" h="100%" opacity="0.7" />
    </Flex>
  );
}
