import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  const { geoLocation } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: geoLocation.latitude,
          longitude: geoLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{
            latitude: geoLocation.latitude,
            longitude: geoLocation.longitude,
          }}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});
