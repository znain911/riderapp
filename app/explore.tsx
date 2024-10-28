import React from 'react';
import { View, StyleSheet, SafeAreaView,TouchableOpacity } from 'react-native';
import MapView, { Marker  } from 'react-native-maps';
import * as Location from 'expo-location';
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../store/store'
import { router } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function TabTwoScreen() {
  const {useState, useEffect} = React;
  const [latitude, setLatitude] = useState(23.761886);
  const [longitude, setLongitude] = useState(90.424162);

  useEffect(() => {
    data();
  }, [])

  var mapRef = React.useRef<MapView >(null);

  const data = async () => {
    await Location.requestForegroundPermissionsAsync();
   const locations = await Location.getCurrentPositionAsync({});
     //console.log(locations.coords);
     setLatitude(locations.coords.latitude)
     setLongitude(locations.coords.longitude)

     mapRef.current?.animateToRegion({
       latitude: locations.coords.latitude,
       longitude: locations.coords.longitude,
       latitudeDelta: 1,
       longitudeDelta: 1,
     })
 }

  var count = useSelector((state: RootState) => state.counter)
  //console.log(count)

  const back = async () => {
    router.navigate("/");
  }
  return (
    <SafeAreaView style = {styles.titleContainer}>
      <TouchableOpacity style = {{zIndex: 5, position: 'static',top: '10%', left: '3%',width:'10%'}} onPress={back}>
      <MaterialIcons  
      name="arrow-back-ios-new" size={40} color="black" />
      </TouchableOpacity>
      <MapView style = {{flex : 1,marginTop: 30}}
      
        mapType='mutedStandard'
        scrollEnabled = {true}
        zoomEnabled = {true}
        pitchEnabled = {true}
        rotateEnabled = {true}
        scrollDuringRotateOrZoomEnabled = {true}
        ref={mapRef}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
        showsUserLocation
        showsMyLocationButton
        followsUserLocation
        
      >

        <Marker 
          coordinate={{
            latitude: count.pickupLocation.latitude, 
            longitude: count.pickupLocation.longitude
          }}
          title='Pickup'
        /> 

        <Marker 
          coordinate={{
            latitude: count.destination.latitude, 
            longitude: count.destination.longitude
          }}
          title='Drop'
        /> 
          

      </MapView>

      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  modal:{
    width: '95%',
    backgroundColor: '#e6eaeb',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#a2a3a3',
    alignSelf: 'center',
    padding: 10
  },
});
