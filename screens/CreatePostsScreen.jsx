import React from "react";
import { StyleSheet, View } from "react-native";
import CreatePostForm from "../components/CreatePostForm";
import { colors } from "../styles/global";

const CreatePostsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <CreatePostForm navigation={navigation} />
    </View>
  );
};
export default CreatePostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 12,
    backgroundColor: colors.white,
  },
});
