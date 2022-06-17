import {
  Button,
  Container,
  Flex,
  HStack,
  Image,
  VStack,
  InputGroup,
  InputLeftAddon,
  Input,
  InputLeftElement,
  InputRightElement,
  Text,
  FormControl,
  IconButton,
} from "@chakra-ui/react";
import Router from "next/router";
import React, { useRef, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineSearch } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import { CgUserList } from "react-icons/cg";
import { IoIosMan } from "react-icons/io";

export default function Navbar() {
  const [opened, setOpened] = useState(false);
  const leftRef = useRef();
  const rightRef = useRef();
  const [player, setPlayer] = useState("");

  function handleClick() {
    setOpened(!opened);
  }

  async function handleSubmit() {
    window.location.replace(`/player/${encodeURI(player)}`);
  }

  return (
    <>
      <Flex
        h="60px"
        backgroundColor="#0c0c0c"
        position="fixed"
        zIndex="100"
        w="100%"
        justify="flex-start"
        borderBottom="1px solid #606060"
      >
        <Flex
          w={opened ? "250px" : "65px"}
          zIndex="99"
          h="100vh"
          position="absolute"
          left="0px"
          pt="60px"
        >
          <Flex
            h="100%"
            flexDirection="row"
            borderBottom="1px solid #606060"
            background="#0c0c0c"
            borderRight="1px solid #606060"
            w="100%"
          >
            <Flex py="16px" flexDirection="column" gap="30px">
              <Flex
                w="100%"
                maxH="20px"
                cursor="pointer"
                onClick={() => {
                  Router.push("/leaderboards");
                }}
              >
                <Flex w="63px" align="center" justify="center">
                  <CgUserList color="#fff" size="20px" />
                </Flex>
                <Text
                  fontWeight="semibold"
                  fontSize="14px"
                  display={!opened && "none"}
                >
                  Leaderboards
                </Text>
              </Flex>
              <Flex
                w="100%"
                maxH="20px"
                cursor="pointer"
                onClick={() => {
                  Router.push("/");
                }}
              >
                <Flex w="63px" justify="center">
                  <IoIosMan color="#fff" size="20px" />
                </Flex>
                <Text
                  fontWeight="semibold"
                  fontSize="14px"
                  display={!opened && "none"}
                >
                  Player
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        <HStack w="100%" h="100%" align="center" zIndex="200">
          <Flex
            align="center"
            h="100%"
            maxW="250px"
            borderRight="1px solid #606060"
            w="100%"
            justify="space-between"
          >
            <Flex
              cursor="pointer"
              onClick={handleClick}
              h="100%"
              align="center"
              pl="20px"
            >
              <BiMenu color="white" size="25px" />
            </Flex>
            <Flex gap="20px" h="100%" pr="20px">
              <Image
                src="/icon.svg"
                width="100%"
                maxWidth="40px"
                height="auto"
                cursor="pointer"
                onClick={() => {
                  Router.push("/");
                }}
              />
            </Flex>
          </Flex>

          <InputGroup borderRadius="3px" maxW="500px">
            <Input
              type="tel"
              placeholder="Vyhledej Hráče"
              h="38px"
              fontWeight="semibold"
              fontSize="14px"
              onChange={(e) => {
                setPlayer(e.target.value);
              }}
              value={player}
            />
            <InputRightElement cursor="pointer" onClick={handleSubmit}>
              <AiOutlineSearch size="20px" />
            </InputRightElement>
          </InputGroup>
        </HStack>
      </Flex>
    </>
  );
}
