import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { colors } from "../styles/global";

const AuthVariants = ({ textVariant, textAction, navigation, targetNav }) => {
  return (
    <View style={styles.formTextWrapper}>
      <Text style={styles.formText}>{textVariant}</Text>
      <TouchableOpacity 
      onPress={()=>navigation.navigate(targetNav)}
      >
        <Text style={styles.formText}>{textAction}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default AuthVariants;

const styles = StyleSheet.create({
  formTextWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  formText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    color: colors.blue,
    textAlign: "center",
    marginRight: 4,
  },
});
