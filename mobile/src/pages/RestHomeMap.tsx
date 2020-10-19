import React from 'react';
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import mapMarkerImg from '../images/map-marker.png';
import { RectButton } from 'react-native-gesture-handler';


export default function RestHomeMap(){
    const navigation = useNavigation();

    function handleNavigateToRestHomeDetails(){
        navigation.navigate('RestHomeDetails');
    }

    function handleNavigateToCreateRestHome(){
      navigation.navigate('SelectMapPosition');
    }

    return (
        <View style={styles.container}>
            <MapView  
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
                latitude: -22.9121009,
                longitude: -43.358419,
                latitudeDelta: 0.008, //zoom
                longitudeDelta: 0.008,
            }}>
    
                <Marker
                icon={mapMarkerImg}
                calloutAnchor={{
                    x: 2.0,
                    y: 0.8
                }}
                coordinate={{
                    latitude: -22.9121009,
                    longitude: -43.358419,
                }}
                >
                <Callout tooltip onPress={handleNavigateToRestHomeDetails}>
                    <View style={styles.callowtContainer}>
                    <Text style={styles.callowtText}> Sweet Home </Text>
                    </View>
                </Callout>
                </Marker>
            </MapView>
            
            <View style={styles.footer}>
                <Text style={styles.footerText}> 2 resthomes find</Text>
                <RectButton style={styles.createResthomeButton} onPress={handleNavigateToCreateRestHome}>
                    <Feather name='plus' size={28} color='#fff'/>
                </RectButton>
            </View>
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
  
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    callowtContainer: {
      width:160,
      height: 46,
      paddingHorizontal:16,
      borderRadius:16,
      justifyContent:'center',
    }, 
    callowtText:{
      color: '#ffe003',
      fontWeight: 'bold',
      fontSize:14,
      fontFamily: 'Nunito_700Bold',
      backgroundColor:"#000"
    },
  
    footer:{
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor:'#000',
      borderRadius: 20,
      height: 56,
      paddingLeft: 24,
  
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  
      elevation: 3,
    },
     footerText:{
       fontFamily: 'Nunito_700Bold',
       color: '#ffe003'
    },
    createResthomeButton: {
      width: 56,
      height: 56,
      backgroundColor: '#ff8303',
      borderRadius: 20,
  
      justifyContent: 'center',
      alignItems: 'center',
    }
  });