import { WRCalc } from "./WinrateCalculator";

export function ColorFind(player) {
  let color = "rgb(205, 220, 254)";

  if (
    WRCalc(player.wins, player.losses) >= 60 &&
    WRCalc(player.wins, player.losses) < 70
  ) {
    color = "rgb(50, 115, 250)";
  }

  if (WRCalc(player.wins, player.losses) >= 70) {
    color = "rgb(255, 155, 0)";
  }

  if (WRCalc(player.wins, player.losses) < 40) {
    color = "#ff4e50";
  }

  return color;
}
