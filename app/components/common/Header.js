// @ts-nocheck
import LottieView from "lottie-react-native";

export const HeaderAnim = (props) => {
  return (
    <LottieView
      top={100}
      imageAssetsFolder={"lottie/TopBarAnim"}
      position={"absolute"}
      source={require("../../assets/animations/headerAnim/TopBarAnimDisconnected.json")}
      autoPlay
      loop
      {...props}
    />
  );
};
