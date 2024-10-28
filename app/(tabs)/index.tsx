import React from 'react';
import { View, StyleSheet, Button, SafeAreaView,Text } from 'react-native';
import MapView, { Marker  } from 'react-native-maps';
import * as Location from 'expo-location';
import datas from '../../dummy.json'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store/store'
import { acceptRide } from '../../store/rideSlicer'
import { router } from 'expo-router';
import Modal from "react-native-modal";



export default function HomeScreen() {
  const {useState, useEffect} = React;
  const [latitude, setLatitude] = useState(23.761886);
  const [longitude, setLongitude] = useState(90.424162);
  const [isModalVisible, setModalVisible] = useState(false);
  const [latdest, setLatdest] = useState('');
  const [longdest, setLongdest] = useState('');
  const [latpick, setLatpick] = useState('');
  const [longpick, setLongpick] = useState('');
  const [userId, setUserId] = useState('');
  const [id, setId] = useState('');
  const [timestamp, seTimestamp] = useState('');
  const [dropOff, setDropOff] = useState('');
  const [pickup, setPickup] = useState('');

   const toggleModal2 = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    data();
  }, [])

  var mapRef = React.useRef<MapView >(null);

  var dispatch = useDispatch()
  

  const data = async () => {
     await Location.requestForegroundPermissionsAsync();
    const locations = await Location.getCurrentPositionAsync({});
      //console.log(locations.coords);
      setLatitude(locations.coords.latitude)
      setLongitude(locations.coords.longitude)

      mapRef.current?.animateToRegion({
        latitude: locations.coords.latitude,
        longitude: locations.coords.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      })
  }

  var driver = 'Driver001'

  const detail = (latdest,longdest,latpick,longpick,id,userId,timestamp,dropOff,pickup) => {
    setLatdest(latdest)
    setLongdest(longdest)
    setLatpick(latpick)
    setLatpick(latpick)
    setLongpick(longpick)
    setId(id)
    setUserId(userId)
    seTimestamp(timestamp)
    setDropOff(dropOff)
    setPickup(pickup)
    //console.log(id)
    //dispatch(incrementByAmount({'id' : id}))
    //console.log(count)
    //router.replace("/+not-found");
    setModalVisible(!isModalVisible);
  }

  const accept = () => {
    
    dispatch(acceptRide({
      'id' : id,
      'userId' : userId,
      'driverId' : driver,
      'latpick' : parseFloat(latpick),
      'longpick' : parseFloat(longpick),
      'latdest' : parseFloat(latdest),
      'longdest' : parseFloat(longdest),
      'status' : 'accepted',
      'pickupTime' : new Date().toString(),
      'timestamp' : new Date(timestamp).toString(),

    }))

    setModalVisible(!isModalVisible);
    router.navigate("explore");
  }
//console.log(count)
  return (
    <SafeAreaView style = {styles.titleContainer}>
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
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        showsUserLocation
        showsMyLocationButton
        followsUserLocation
        
      >

        {/* <Marker 
          coordinate={{
            latitude: latitude, 
            longitude: longitude
          }}
          title='My Location'
          key={'me'}
          /> */}

          {Object.keys(datas).length > -1  ?
          
          datas.map(marker => (
            <Marker 
            coordinate={{
              latitude: marker.pickupLocation.latitude, 
              longitude: marker.pickupLocation.longitude
            }}
            title='Ride Request'
            key={marker.id}
            onPress={()=>detail(
              marker.destination.latitude,
              marker.destination.longitude,
              marker.pickupLocation.latitude,
              marker.pickupLocation.longitude,
              marker.id,
              marker.userId,
              marker.timestamp,
              marker.dropOff,
              marker.pickup
            )}
            /> 
            
          ))
            
          : null

          }

      </MapView>

      <Modal isVisible={isModalVisible}>
        <View style={styles.modal}>
          <View style = {{alignItems: 'flex-start'}}>
            
            <Text style = {styles.font1}>User : <Text style = {{fontWeight:'400',fontSize: 15}}>{userId}</Text> </Text>
            <Text style = {styles.font1}>Pickup from: <Text style = {{fontWeight:'400',fontSize: 15}}> {pickup}</Text> </Text>
            <Text style = {styles.font1}>Drop to : <Text style = {{fontWeight:'400',fontSize: 15}}>{dropOff} </Text></Text>
          </View>
          <View style = {{flexDirection: 'row' , justifyContent:'space-around',padding:10}}>
            <Button title="Decline" color="#f5562f" style = {{width : '40%'}} onPress={toggleModal2} />
            <Button title="Accept" color="#a1a5a6" style = {{width : '40%'}} onPress={accept} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flex: 1,
    
  },
  font1:{
    fontSize: 20,
    fontWeight:'bold'
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
