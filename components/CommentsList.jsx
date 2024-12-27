import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import Comment from "./Comment";
import Answer from "./Answer";

const CommentsList = ({ comments, user }) => {
  return (
    <ScrollView style={styles.container}>
      {comments?.map((comment, index) => {
        if (comment.author.id === user.uid) {
          return <Answer comment={comment} key={index} />;
        }
        return <Comment comment={comment} key={index} />;
      })}
    </ScrollView>
  );
};
export default CommentsList;

const styles = StyleSheet.create({
  container: {
    maxWidth: "100%",
    paddingHorizontal: 16,
    display: "flex",
    marginBottom: 72,
  },
});
