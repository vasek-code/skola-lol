export function RankColor(rankData) {
  let color = "";

  if (rankData.tier === "CHALLENGER") {
    color = "rgb(244, 200, 116)";
  }

  if (rankData.tier === "GRANDMASTER") {
    color = "rgb(205, 69, 69)";
  }

  if (rankData.tier === "MASTER") {
    color = "rgb(157, 72, 224)";
  }

  if (rankData.tier === "DIAMOND") {
    color = "rgb(87, 107, 206)";
  }

  if (rankData.tier === "PLATINUM") {
    color = "rgb(78, 153, 150)";
  }

  if (rankData.tier === "GOLD") {
    color = "rgb(205, 136, 55)";
  }

  if (rankData.tier === "SILVER") {
    color = "rgb(128, 152, 157)";
  }

  if (rankData.tier === "BRONZE") {
    color = "rgb(140, 82, 58)";
  }

  if (rankData.tier === "IRON") {
    color = "rgb(87, 77, 79)";
  }

  return color;
}
