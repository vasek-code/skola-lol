import { Flex, HStack, Text, Image, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FindIcon } from "../functions/FindIcon";
import { WRCalc } from "../functions/WinrateCalculator";
import Router from "next/router";

export default function Player({ player, index, icons }) {
  const [playerColor, setPlayerColor] = useState("rgb(205, 220, 254)");
  const [playerIcon, setPlayerIcon] = useState("");

  useEffect(() => {
    if (
      WRCalc(player.wins, player.losses) >= 60 &&
      WRCalc(player.wins, player.losses) < 70
    ) {
      setPlayerColor("rgb(50, 115, 250)");
    }

    if (WRCalc(player.wins, player.losses) >= 70) {
      setPlayerColor("rgb(255, 155, 0)");
    }

    if (WRCalc(player.wins, player.losses) < 40) {
      setPlayerColor("#ff4e50");
    }

    icons.forEach((icon) => {
      if (icon.player.summonerName === player.summonerName) {
        setPlayerIcon(icon.link);
      }
    });
  }, []);

  return (
    <>
      <Flex
        h="54px"
        borderRadius="6px"
        backgroundColor="#0c0c0c"
        w="100%"
        align="center"
        className="playerList"
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
            {index + 2}
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
          gap="5px"
          h="100%"
        >
          <Flex
            display="flex"
            alignItems="center"
            paddingLeft="12px"
            paddingRight="12px"
            flex="1 1"
            maxWidth="220px"
            overflow="hidden"
            gap="15px"
          >
            <Image src={playerIcon} width="40px" borderRadius="6px" />
            <Button
              color="white"
              fontWeight="semibold"
              fontSize="13px"
              variant="link"
              _focus={{
                borderWidth: "0px",
              }}
              onClick={() => {
                Router.push(`/player/${player.summonerName}`);
              }}
            >
              <Flex w="100%">{player?.summonerName?.trim()}</Flex>
            </Button>
          </Flex>
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
          gap="7px"
        >
          <Image
            src="https://static.u.gg/assets/lol/ranks/2d/challenger.svg"
            width="30px"
          />
          <Text fontWeight="semibold" fontSize="13px" color="#f4c874">
            Challenger
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
            {player?.leaguePoints} LP
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
          <Flex flexDirection="column" w="100%">
            <Flex flexDirection="row" gap="5px" w="100%" justify="center">
              <Text fontSize="13px" fontWeight="semibold" color={playerColor}>
                {WRCalc(player?.wins, player?.losses)}%
              </Text>
              <Text fontSize="13px" fontWeight="semibold">
                {player?.wins}W {player?.losses}L
              </Text>
            </Flex>
            <div
              className="wr-bar"
              style={{
                marginTop: "6px",
                maxWidth: "200px",
                width: "100%",
                height: "6px",
                borderRadius: "3px",
                backgroundColor: "#25254b",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${WRCalc(player?.wins, player?.losses)}%`,
                  backgroundColor: playerColor,
                }}
              ></div>
            </div>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
