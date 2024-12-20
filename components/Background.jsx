import { StyleSheet, ImageBackground } from "react-native";

const Background = ({ source, children }) => {
  return (
    <ImageBackground source={source} resizeMode="cover" style={styles.image}>
      {children}
    </ImageBackground>
  );
};
export default Background;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
  },
});
