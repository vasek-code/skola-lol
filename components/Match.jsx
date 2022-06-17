import { Flex, Text, Image } from "@chakra-ui/react";
import { useEffect, useState, useReducer } from "react";

export default function Match({ match, index, summonerName, runesData }) {
  const [background, setBackground] = useState("");
  const [participantIndex, setParticipantIndex] = useState(0);
  const [gamemode, setGamemode] = useState("Normal");
  const [win, setWin] = useState(false);
  const [time, setTime] = useState("00:00");
  const [rune1Url, setRune1Url] = useState("");
  const [rune2Url, setRune2Url] = useState("");

  setTimeout(() => {
    runesData.forEach((rune, index) => {
      if (
        rune.id ===
        match.info.participants[participantIndex].perks.styles[0].style
      ) {
        runesData[index].slots[0].runes.forEach((smallRune, index2) => {
          if (
            smallRune.id ===
            match.info.participants[participantIndex].perks.styles[0]
              .selections[0].perk
          ) {
            setRune1Url(
              `https://static.u.gg/assets/lol/riot_static/12.11.1/img/small-perk-images/Styles/${runesData[index].key}/${runesData[index].slots[0].runes[index2].key}/${runesData[index].slots[0].runes[index2].key}.png`
            );
          }
        });
      }
    });

    runesData.forEach((rune, index) => {
      if (
        rune.id ===
        match.info.participants[participantIndex].perks.styles[1].style
      ) {
        setRune2Url(
          `https://static.u.gg/assets/lol/runes/${runesData[index].id}.png`
        );
      }
    });
  }, 400);

  useEffect(() => {
    if (match.info.queueId === 420) {
      setGamemode("Ranked Solo");
    }
    if (match.info.queueId === 440) {
      setGamemode("Ranked Flex");
    }
    if (
      match.info.queueId === 900 ||
      match.info.queueId === 9 ||
      match.info.queueId === 470
    ) {
      setGamemode("URF");
    }
    if (match.info.queueId === 100 || match.info.queueId === 450) {
      setGamemode("ARAM");
    }
    match.info.participants.forEach((participant, index) => {
      if (participant.summonerName === summonerName) {
        setParticipantIndex(index);
        if (!participant.win) {
          setBackground(
            "linear-gradient(0deg,rgba(255,78,80,.16),rgba(255,78,80,.16)),#191937"
          );
        } else {
          setWin(true);
          setBackground(
            "linear-gradient(0deg,rgba(50,115,250,.2),rgba(50,115,250,.2)),#191937"
          );
        }
      }
    });

    const unixTimestamp = match.info.gameDuration;

    const date = new Date(unixTimestamp * 1000);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    if (seconds.toString().length === 1) {
      seconds = `0${seconds}`;
    }

    setTime(`${minutes}:${seconds}`);
  }, []);

  return (
    <>
      <Flex
        w="100%"
        borderRadius="6px"
        h="100px"
        background={background}
        align="center"
      >
        <Flex
          __css={{
            display: "grid",
            gridTemplateColumns:
              "16% 19% 15% minmax(120px,22%) minmax(155px,31%)",

            alignItems: "center",
            width: "100%",
            height: "100%",
            cursor: "pointer",
          }}
        >
          <Flex flexDir="column" w="100%" align="center">
            <Text fontWeight="semibold" color="white">
              {gamemode}
            </Text>
            <Flex gap="6px">
              <Text
                fontWeight="semibold"
                color={win ? "#3273fa" : "#ff4e50"}
                fontSize="sm"
              >
                {win ? "WIN" : "LOSS"}
              </Text>
              <Text fontWeight="semibold" color="#cddcfe" fontSize="sm">
                {time}
              </Text>
            </Flex>
          </Flex>
          <Flex h="100%" align="center" overflow="hidden" gap="5px">
            <Flex w="60px" h="60px" justify="center" align="center">
              <Image
                src={`https://static.u.gg/assets/lol/riot_static/12.11.1/img/champion/${match.info.participants[participantIndex].championName}.png`}
                width="100%"
                height="100%"
              />
            </Flex>
            <Flex direction="column">
              <Image src={rune1Url} w="30px" />
              <Image src={rune2Url} w="30px" />
            </Flex>
          </Flex>
          <Flex
            h="100%"
            align="center"
            gap="1px"
            justify="center"
            flexDir="column"
          >
            <div
              className="KDA-totals"
              style={{
                marginBottom: "1px",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "17px",
              }}
            >
              {match.info.participants[participantIndex].kills}{" "}
              <span className="slash">/</span>{" "}
              <span className="red" style={{ color: "#ff4e50" }}>
                {match.info.participants[participantIndex].deaths}
              </span>{" "}
              <span className="slash">/</span>{" "}
              {match.info.participants[participantIndex].assists}
            </div>
            <Text fontWeight="semibold" fontSize="13px">
              {match.info.participants[participantIndex].challenges.kda
                .toString()
                .substring(0, 4)}{" "}
              KDA
            </Text>
            <Text fontWeight="semibold" fontSize="13px">
              {match.info.participants[participantIndex].totalMinionsKilled} CS
            </Text>
            <Text fontWeight="semibold" fontSize="11px" color="#cddcfe">
              {match.info.participants[participantIndex].visionScore} vision
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
