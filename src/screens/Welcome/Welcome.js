import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; 
import BackgroundImage from '../../../assets/bc1.jpg'; 



const WelcomeScreen = ({ navigation }) => {
  return (
    <ImageBackground source={BackgroundImage} style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.text}>Welcome TO LEGAL AID ADMIN</Text>
      </View>
      <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.navigate('LoginScreen')}>
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
    fontSize: 50,
    marginBottom: 20,
    color: 'lightblue',
    fontWeight:'bold',
    marginHorizontal:20
  },
  arrowContainer: {
    position: 'absolute',
    bottom: 30,  
    alignSelf: 'center',
    
  },
});

export default WelcomeScreen;
