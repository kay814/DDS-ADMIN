import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; 
import BackgroundImage from '../../../assets/joel-de-vriend-0gogyddMLyc-unsplash.jpg'; 



const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={BackgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome To DDS Admin</Text>
      </View>
      <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.navigate('Dashboard')}>
        <Icon name="arrow-right" size={80} color="white" /> 
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
    color: 'white',
    fontWeight:'bold'
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 30,  
    alignSelf: 'center',
    
  },
});

export default WelcomeScreen;
