export async function FindIcon(summonerName) {
  const playerRes = await fetch(
    `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );

  const playerData = await playerRes.json();

  const res = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/profileicon.json"
  );

  const data = await res.json();

  return `http://ddragon.leagueoflegends.com/cdn/12.11.1/img/profileicon/${
    data.data[playerData.profileIconId].image.full
  }`;
}
