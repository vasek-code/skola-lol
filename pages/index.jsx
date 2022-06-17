import React, { useState } from "react";
import {
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";
import Background from "../components/Background";

export default function PlayerIndex() {
  const [player, setPlayer] = useState("");

  function handleSearch() {
    window.location.replace(`/player/${player}`);
  }

  return (
    <>
      <Flex w="100%" h="100vh" background="#0c0c0c" position="absolute">
        <Background />
        <Flex
          w="100%"
          h="100vh"
          pl="63px"
          pt="60px"
          justify="center"
          align="center"
          pb="20px"
          position="relative"
        >
          <Flex
            flexDir="column"
            maxW="700px"
            w="100%"
            justify="center"
            align="center"
            gap="20px"
          >
            <Flex w="100%" pos="relative" align="center" pl="15px">
              <div
                style={{
                  marginLeft: "10px",
                  content: '""',
                  position: "absolute",
                  left: "0",
                  width: "3px",
                  height: "30px",
                  borderRadius: "2px",
                  backgroundColor: "#3273fa",
                }}
              ></div>
              <Text
                color="white"
                fontWeight="semibold"
                fontSize="2xl"
                ml="10px"
              >
                Vyhledej hráče
              </Text>
            </Flex>

            <InputGroup h="50px" w="100%">
              <Input
                background="white"
                color="black"
                fontWeight="semibold"
                fontSize="lg"
                borderRadius="30px 30px 30px 30px"
                w="100%"
                h="100%"
                placeholder="Vyhledej Hráče"
                value={player}
                onChange={(e) => {
                  setPlayer(e.target.value);
                }}
              />
              <InputRightElement
                cursor="pointer"
                onClick={handleSearch}
                h="100%"
                w="10%"
              >
                <AiOutlineSearch size="30px" color="black" />
              </InputRightElement>
            </InputGroup>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
