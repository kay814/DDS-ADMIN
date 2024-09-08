import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import OrdersImage from '../../../assets/check-out.png'; 
import FeedbackImage from '../../../assets/feedback.png'; 

const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Dashboard</Text> */}

      {/* Images aligned horizontally */}
      <View style={styles.imageRow}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('Orders')}>
          <Image source={OrdersImage} style={styles.image} />
          <Text>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('Feedbacks')}>
          <Image source={FeedbackImage} style={styles.image} />
          <Text>Feedbacks</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: 'row', // Align items horizontally
    justifyContent: 'space-around',
    width: '80%', // Adjust as necessary for spacing
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default DashboardScreen;
