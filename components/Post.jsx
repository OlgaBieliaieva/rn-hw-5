import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import CommentIcon from "./icons/CommentIcon";
import LikeIcon from "./icons/LikeIcon";
import MapPinIcon from "./icons/MapPinIcon";
import { colors } from "../styles/global";

const Post = ({ navigation, post }) => {
  return post ? (
    <View style={styles.postCard}>
      <View style={styles.imgWrapper}>
        <Image source={{ uri: post.photo }} style={styles.img} />
      </View>
      <Text style={styles.postTitle}>{post.name}</Text>
      <View style={styles.postDescription}>
        <View style={styles.feedback}>
          <TouchableOpacity
            style={styles.feedbackItem}
            onPress={() => navigation.navigate("Comments", { post })}
          >
            <CommentIcon fill={colors.orange} />
            <Text style={styles.feedbackText}>8</Text>
          </TouchableOpacity>
          <View style={styles.feedbackItem}>
            <LikeIcon fill={colors.orange} />
            <Text style={styles.feedbackText}>153</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.location}
          onPress={() =>
            navigation.navigate("Map", { geoLocation: post.geoLocation })
          }
        >
          <MapPinIcon />
          <Text style={styles.locationText}>{post.locationName}</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <Text> Немає нових постів</Text>
  );
};
export default Post;

const styles = StyleSheet.create({
  postCard: {
    width: "100%",
    maxWidth: 343,
    height: 300,
    display: "flex",
    gap: 8,
    marginBottom: 32,
  },
  imgWrapper: {
    width: 343,
    height: 240,
    borderRadius: 8,
    overflow: "hidden",
  },
  img: {
    width: "100%",
    height: 240,
    objectFit: "cover",
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 500,
  },
  postDescription: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  feedback: {
    display: "flex",
    flexDirection: "row",
    gap: 24,
  },
  feedbackItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  feedbackText: {
    fontSize: 16,
  },
  location: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  locationText: {
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: colors.black,
  },
});
