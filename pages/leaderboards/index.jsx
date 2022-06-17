import { useEffect, useState } from "react";
import {
  Flex,
  HStack,
  VStack,
  Text,
  Container,
  Heading,
} from "@chakra-ui/react";
import Player from "../../components/Player";
import PlayerList from "../../components/PlayerList";
import { dynamicSort } from "../../functions/DynamicSort";
import { FindIcon } from "../../functions/FindIcon";
import { WRCalc } from "../../functions/WinrateCalculator";

export default function Home({
  lbData,
  hpData,
  hpIconLink,
  hpColor,
  hpStats,
  icons,
}) {
  return (
    <>
      <Flex background="#0c0c0c">
        <Container maxW="container.lg" pt="60px">
          <VStack w="100%" align="flex-start">
            <Heading color="white" mt="30px">
              Leaderboards
            </Heading>
            <Text color="#a7a7a7">Europe West</Text>
          </VStack>
          <PlayerList
            data={{ lbData, hpData, hpIconLink, hpColor, hpStats, icons }}
          />
        </Container>
      </Flex>
    </>
  );
}

export async function getServerSideProps() {
  const lbRes = await fetch(
    `https://euw1.api.riotgames.com/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const lbData = await lbRes.json();

  let highestPlayer = {
    leaguePoints: lbData.entries[0].leaguePoints,
    summonerName: lbData.entries[0].summonerName,
  };

  let index = 0;

  lbData.entries.forEach((player, index1) => {
    if (player.leaguePoints > highestPlayer.leaguePoints) {
      highestPlayer = player;
      index = index1;
    }
  });

  delete lbData.entries[index];

  lbData.entries.sort(dynamicSort("-leaguePoints"));

  lbData.entries.splice(9, 291);

  const hpRes = await fetch(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${highestPlayer.summonerName}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const hpData = await hpRes.json();

  const link = await FindIcon(encodeURI(highestPlayer.summonerName));

  let color = "rgb(205, 220, 254)";

  if (
    WRCalc(highestPlayer.wins, highestPlayer.losses) >= 60 &&
    WRCalc(highestPlayer.wins, highestPlayer.losses) < 70
  ) {
    color = "rgb(50, 115, 250)";
  }

  if (WRCalc(highestPlayer.wins, highestPlayer.losses) >= 70) {
    color = "rgb(255, 155, 0)";
  }

  if (WRCalc(highestPlayer.wins, highestPlayer.losses) < 40) {
    color = "#ff4e50";
  }

  const icons = [];

  for (const player of lbData.entries) {
    const link = await FindIcon(encodeURI(player.summonerName));

    icons.push({ player, link });
  }

  return {
    props: {
      lbData,
      hpData,
      hpIconLink: link,
      hpColor: color,
      hpStats: highestPlayer,
      icons,
    },
  };
}
