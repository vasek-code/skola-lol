import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Flex, Image, Text } from "@chakra-ui/react";
import { RankColor } from "../../functions/RankColor";
import Match from "../../components/Match";

export default function Player({ rank, playerData, matches, runesData }) {
  const router = useRouter();
  const { summonerName } = router.query;
  const [rankData, setRankData] = useState({
    tier: "",
  });

  console.log(matches);

  useEffect(() => {
    rank.forEach((data, index) => {
      if (data.queueType === "RANKED_SOLO_5x5") {
        setRankData(rank[index]);
      }
    });
  }, []);

  return (
    <Flex
      w="100%"
      h="100%"
      background="#0c0c0c"
      pl="63px"
      pt="60px"
      justify="center"
      pb="20px"
    >
      <Flex w="842px" pt="63px" mx="45px" flexDirection="column" gap="40px">
        <Flex w="100%" h="min-content">
          <Flex pt="15px" mr="20px">
            <div
              className="profile-icon-container"
              style={{
                position: "relative",
                flex: "0 0 93px",
                width: "93px",
                height: "93px",
                borderRadius: "6px",
                border: `2px solid ${RankColor(rankData)}`,
                backgroundColor: "#17172e",
              }}
            >
              <div
                className="level-header"
                style={{
                  position: "absolute",
                  zIndex: 2,
                  top: "-16px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "20px",
                  borderRadius: "4px",
                  border: `1px solid ${RankColor(rankData)}`,
                  backgroundColor: "#06061f",
                  color: "#fff",
                  fontSize: "11px",
                  fontWeight: 700,
                }}
              >
                {playerData.summonerLevel}
              </div>
              <div
                className="profile-icon-border"
                style={{
                  position: "relative",
                  border: "2px solid #17172e",
                  borderRadius: "4px",
                  width: "100%",
                  height: "100%",
                  overflow: "hidden",
                }}
              >
                <div
                  className="border-notch"
                  style={{
                    position: "absolute",
                    top: "-6px",
                    left: "50%",
                    zIndex: 1,
                    transform: "translateX(-50%)",
                    width: "40px",
                    height: "10px",
                    borderRadius: "0 0 6px 6px",
                    border: "2px solid #070720",
                    backgroundColor: "#06061f",
                  }}
                ></div>
                <Image
                  className="profile-icon-image"
                  src={`http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/${playerData.profileIconId}.png`}
                />
              </div>
            </div>
          </Flex>
          <Flex flexDirection="column">
            <Text fontSize="36px" fontWeight="600" color="white">
              {playerData.name}
            </Text>
            <Flex h="100%" align="flex-end" gap="9px">
              <Image
                src={`https://static.u.gg/assets/lol/ranks/2d/${rankData.tier.toLowerCase()}.svg`}
                w="35px"
              />
              <Text
                color={RankColor(rankData)}
                fontWeight="semibold"
                fontSize="lg"
              >
                {rankData.tier[0]}
                {rankData.tier.toLowerCase().substring(1)}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex w="100%" justify="center" h="100%">
          <Flex
            w="100%"
            background="#121212"
            h="100%"
            py="16px"
            px="24px"
            borderRadius="6px"
            flexDir="column"
            gap="7px"
          >
            <Flex pos="relative" align="center" h="min-content">
              <div
                style={{
                  content: '""',
                  position: "absolute",
                  left: "0",
                  width: "2px",
                  height: "20px",
                  borderRadius: "2px",
                  backgroundColor: "#3273fa",
                }}
              ></div>
              <Text ml="10px" fontWeight="semibold">
                Match History
              </Text>
            </Flex>
            {matches.map((match, index) => {
              return (
                <Match
                  match={match}
                  index={index}
                  summonerName={playerData.name}
                  key={match.metadata.matchId}
                  runesData={runesData}
                />
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const { summonerName } = context.params;

  const res = await fetch(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
      summonerName
    )}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const data = await res.json();

  const res2 = await fetch(
    `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${data.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const data2 = await res2.json();

  const matchesIdsRes = await fetch(
    `https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/${data.puuid}/ids?start=0&count=10&api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const matchesIdsData = await matchesIdsRes.json();

  let matches = [];

  for (const matchId of matchesIdsData) {
    const matchRes = await fetch(
      `https://europe.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
    );

    const matchData = await matchRes.json();

    matches.push(matchData);
  }

  const runesRes = await fetch(
    `http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/runesReforged.json`
  );

  const runesData = await runesRes.json();

  return {
    props: {
      playerData: data,
      rank: data2,
      matches,
      runesData,
    },
  };
}
