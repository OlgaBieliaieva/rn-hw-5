import React from "react";
import { StyleSheet, View } from "react-native";
import CreatePostForm from "../components/CreatePostForm";
import RemoveIcon from "../components/icons/RemoveIcon";
import { colors } from "../styles/global";

const CreatePostsScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <CreatePostForm navigation={navigation} />
      <View style={styles.iconWrapper}>
      <RemoveIcon />
      </View>
    </View>
  );
};
export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 12,
    backgroundColor: colors.white,
  },
  iconWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: colors.lightGrayBg,
    borderRadius: 20,
  }
});
