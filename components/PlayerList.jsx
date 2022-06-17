import React from "react";
import Player from "./Player";
import { useState, useEffect } from "react";
import { HStack, VStack, Flex, Text, Image, Button } from "@chakra-ui/react";
import { FindIcon } from "../functions/FindIcon";
import { WRCalc } from "../functions/WinrateCalculator";
import { dynamicSort } from "../functions/DynamicSort";
import Router from "next/router";

export default function PlayerList({ data }) {
  const { lbData, hpData, hpIconLink, hpColor, hpStats, icons } = data;

  return (
    <>
      <style jsx global>{`
        .playerList:nth-child(even) {
          background-color: #121212 !important;
        }
      `}</style>
      <VStack gap="10px" pb="50px">
        <HStack
          h="170px"
          background="#121212"
          mt="50px"
          w="100%"
          borderRadius="6px"
          gap="20px"
        >
          <Flex
            w="60px"
            h="80px"
            color="#ff9b00"
            background="#282122"
            borderRadius="6px"
            justify="center"
            align="center"
            pb="10px"
            fontSize="35px"
            fontWeight="bold"
            position="relative"
            ml="30px"
          >
            1
            <div
              style={{
                content: "",
                position: "absolute",
                left: "12px",
                right: "12px",
                bottom: "12px",
                height: "2px",
                borderRadius: "1px",
                backgroundColor: "#ff9b00",
              }}
            ></div>
          </Flex>
          <Image src={hpIconLink} width="120px" borderRadius="6px" />
          <VStack align="flex-start">
            <Button
              color="white"
              fontWeight="bold"
              fontSize="35px"
              variant="link"
              _focus={{
                borderWidth: "0px",
              }}
              onClick={() => {
                Router.push(`/player/${hpStats.summonerName}`);
              }}
            >
              {hpStats.summonerName}
            </Button>
            <HStack
              maxW="500px"
              h="40px"
              background="#0c0c0c"
              borderRadius="6px"
              px="15px"
              align="center"
            >
              <Image
                src="https://static.u.gg/assets/lol/ranks/2d/challenger.svg"
                w="30px"
              />
              <Text color="#f4c874" fontWeight="bold">
                Challenger
              </Text>
              <Text color="#5f5f75">/</Text>
              <Text color="#cddcfe" fontWeight="semibold">
                {hpStats.leaguePoints} LP
              </Text>
              <VStack justify="center" h="100%" pb="5px">
                <Flex flexDirection="row" gap="3px">
                  <Text color={hpColor} fontSize="13px" fontWeight="semibold">
                    {WRCalc(hpStats.wins, hpStats.losses)}%
                  </Text>
                  <Text color="#5f5f7b" fontSize="13px">
                    /
                  </Text>
                  <Text color="#cddcfe" fontSize="13px" fontWeight="semibold">
                    {hpStats.wins + hpStats.losses} games
                  </Text>
                </Flex>
                <div
                  className="wr-bar"
                  style={{
                    marginTop: "6px",
                    width: "100px",
                    height: "4px",
                    borderRadius: "2px",
                    backgroundColor: "#25254b",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${WRCalc(hpStats.wins, hpStats.losses)}%`,
                      backgroundColor: hpColor,
                    }}
                  ></div>
                </div>
              </VStack>
            </HStack>
          </VStack>
        </HStack>
        <VStack
          width="100%"
          background="#121212"
          borderRadius="6px"
          px="24px"
          py="14px"
        >
          <Flex
            flex="1 1"
            display="flex"
            width="100%"
            height="41px"
            overflow="hidden"
            mb="12px"
          >
            <Flex
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRight="none"
              color="#cddcfe"
              minWidth="0px"
              maxWidth="100px"
              flex="1 1 100%"
            >
              <Text color="#cddcfe" fontWeight="semibold" fontSize="13px">
                Rank
              </Text>
            </Flex>
            <Flex
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRight="none"
              color="#cddcfe"
              minWidth="180px"
              maxWidth="9.0072e+15px"
              flex="1 1 100%"
            >
              <Text color="#cddcfe" fontWeight="semibold" fontSize="13px">
                Summoner
              </Text>
            </Flex>
            <Flex
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRight="none"
              color="#cddcfe"
              minWidth="0px"
              maxWidth="160px"
              flex="1 1 100%"
            >
              <Text color="#cddcfe" fontWeight="semibold" fontSize="13px">
                Tier
              </Text>
            </Flex>
            <Flex
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRight="none"
              color="#cddcfe"
              minWidth="0px"
              maxWidth="170px"
              flex="1 1 100%"
            >
              <Text color="#cddcfe" fontWeight="semibold" fontSize="13px">
                LP
              </Text>
            </Flex>
            <Flex
              display="flex"
              justifyContent="center"
              alignItems="center"
              borderRight="none"
              color="#cddcfe"
              minWidth="110px"
              maxWidth="220px"
              flex="1 1 100%"
            >
              <Text color="#cddcfe" fontWeight="semibold" fontSize="13px">
                Win Rate
              </Text>
            </Flex>
          </Flex>
          <Flex flexDirection="column" w="100%">
            {lbData.entries.map((player, index) => {
              return (
                <Player
                  key={player?.summonerName}
                  player={player}
                  index={index}
                  icons={icons}
                />
              );
            })}
          </Flex>
        </VStack>
      </VStack>
    </>
  );
}
