import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import GridIcon from "./icons/GridIcon";
import ProfileIcon from "./icons/ProfileIcon";
import AddPostIcon from "./icons/AddPostIcon";
import { colors } from "../styles/global";

const CustomTabBar = ({ navigation }) => {
  return (
    <View style={styles.profileTabContainer}>
      <View style={styles.tabWrapper}>
        <TouchableOpacity onPress={() => navigation.navigate("Posts")}>
          <GridIcon />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconWrapper}
          onPress={() => navigation.navigate("Profile")}
        >
          <ProfileIcon stroke={colors.white} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Create Post")}>
          <AddPostIcon stroke={colors.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomTabBar;

const styles = StyleSheet.create({
  profileTabContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: "100%",
    height: 60,
    paddingHorizontal: 53,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "solid",
    borderColor: colors.lightGrayBorder,
    borderTopWidth: 1,
    backgroundColor: colors.white,
  },
  tabWrapper: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 5,
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: colors.orange,
    borderRadius: 20,
  },
});
