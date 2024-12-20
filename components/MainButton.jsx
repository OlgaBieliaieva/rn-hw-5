import { StyleSheet, Pressable } from "react-native";
import { colors } from "../styles/global";

const MainButton = ({ action, disabled = false, children }) => {
  return (
    <Pressable
      style={disabled ? styles.disabledBtn : styles.formBtn}
      onPress={action}
      disabled={disabled}
    >
      {children}
    </Pressable>
  );
};
export default MainButton;

const styles = StyleSheet.create({
  formBtn: {
    width: "100%",
    backgroundColor: colors.orange,
    paddingVertical: 16,
    borderRadius: 100,
    marginBottom: 16,
  },
  disabledBtn: {
    width: "100%",
    backgroundColor: colors.lightGrayBg,
    paddingVertical: 16,
    borderRadius: 100,
    marginBottom: 16,
  },
});
