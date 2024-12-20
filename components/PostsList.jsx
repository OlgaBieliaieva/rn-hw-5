import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Post from "./Post";

const PostsList = ({ navigation, post }) => {
  return (
    <ScrollView style={styles.container}>
      <Post post={post} navigation={navigation} />
    </ScrollView>
  );
};
export default PostsList;

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    paddingHorizontal: 16,
    display: "flex",
    marginBottom: 60,
  },
});
