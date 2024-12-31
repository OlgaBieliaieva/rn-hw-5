import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { formatFirestoreDate } from "../utils/firestore";
import { colors } from "../styles/global";

const Answer = ({ comment }) => {
  return (
    <View style={styles.commentCard}>
      <View style={styles.commentWrapperRight}>
        <Text style={styles.commentText}>{comment.content}</Text>
        <Text style={styles.commentDateLeft}>
          {formatFirestoreDate(comment.createdAt)}
        </Text>
      </View>
      <View style={styles.imgWrapper}>
        <Image source={{ uri: comment.author.photoURL }} style={styles.img} />
      </View>
    </View>
  );
};
export default Answer;

const styles = StyleSheet.create({
  commentCard: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 32,
  },
  imgWrapper: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  commentWrapperRight: {
    width: 299,
    padding: 16,
    borderRadius: 6,
    borderTopRightRadius: 0,
    backgroundColor: colors.lightGrayBg,
  },
  commentText: {
    fontSize: 13,
    marginBottom: 8,
  },
  commentDateLeft: {
    fontSize: 10,
    color: colors.lightGrayText,
    textAlign: "left",
  },
});
