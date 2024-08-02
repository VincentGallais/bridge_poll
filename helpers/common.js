import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export const capitalize = (str) => {
  return str.replace(/\b\w/g, (l) => l.toUpperCase());
};

export const wp = (percentage) => {
  return (percentage * deviceWidth) / 100;
};
export const hp = (percentage) => {
  return (percentage * deviceHeight) / 100;
};

export const stripHtmlTags = (html) => {
  return html.replace(/<[^>]*>?/gm, "");
};

export const calculatePercentage = ({choice, answers}) => {
  const totalVotes = answers.length;
  if (totalVotes === 0) return 0;
  const votesForChoice = answers.filter(
    (answer) => answer.answer === choice
  ).length;
  return (votesForChoice / totalVotes) * 100;
};

export const getGradientColors = (visibility) => {
  switch (visibility) {
    case "gold":
      return ["#FFD700", "#FF8C00"];
    case "diamond":
      return ["#00FFFF", "#0000FF"];
    case "visible":
    default:
      return ["#FFFFFF", "#FFFFFF"];
  }
};
