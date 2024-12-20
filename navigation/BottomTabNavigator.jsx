import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import PostsScreen from "../screens/PostsScreen";
import CreatePostsScreen from "../screens/CreatePostsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import GridIcon from "../components/icons/GridIcon";
import AddPostIcon from "../components/icons/AddPostIcon";
import ProfileIcon from "../components/icons/ProfileIcon";
import ArrowLeftIcon from "../components/icons/ArrowLeftIcon";
import ExitIcon from "../components/icons/ExitIcon";
import { colors } from "../styles/global";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        if (route.name === "Posts") {
          return <GridIcon />;
        } else if (route.name === "Create Post") {
          return (
            <View style={styles.iconWrapper}>
              <AddPostIcon stroke={colors.white} />
            </View>
          );
        } else if (route.name === "Profile") {
          return <ProfileIcon stroke={colors.black} />;
        }
      },
      tabBarShowLabel: false,
      tabBarStyle:
        route.name === "Create Post" || route.name === "Profile"
          ? { display: "none" }
          : styles.defaultTabBar,
      tabBarIconStyle: {
        marginTop: 8,
      },
    })}
  >
    <Tab.Screen
      name="Posts"
      component={PostsScreen}
      options={({ navigation }) => ({
        headerRight: () => (
          <TouchableOpacity
            style={{ marginRight: 16 }}
            onPress={() => navigation.navigate("Login")}
          >
            <ExitIcon />
          </TouchableOpacity>
        ),
        headerLeft: () => <View style={{ width: 40 }} />,
        headerTitle: "Публікації",
        headerTitleAlign: "center",
      })}
    />
    <Tab.Screen
      name="Create Post"
      component={CreatePostsScreen}
      options={({ navigation, route }) => ({
        headerLeft: () => (
          <TouchableOpacity
            style={{ marginLeft: 16 }}
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon />
          </TouchableOpacity>
        ),
        headerRight: () => <View style={{ width: 40 }} />,
        headerTitle: "Створити публікацію",
        headerTitleAlign: "center",
      })}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
  </Tab.Navigator>
);
export default BottomTabNavigator;

const styles = StyleSheet.create({
  defaultTabBar: {
    height: 60,
    justifyContent: "center",
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
