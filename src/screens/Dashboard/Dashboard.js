
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import OrdersImage from '../../../assets/check-out.png'; 
import FeedbackImage from '../../../assets/feedback.png'; 
import ProfileIcon from '../../../assets/boy.png'; 

const DashboardScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [day, setDay] = useState('');
  const [fullDate, setFullDate] = useState('');


  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB')); 
      setCurrentDate(now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })); // DD/MM/YYYY format
      setDay(now.toLocaleDateString('en-GB', { weekday: 'long' })); 
      setFullDate(now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })); // Display full date format
    };

    updateClock(); 
    const timer = setInterval(updateClock, 1000); 
    return () => clearInterval(timer); 
  }, []);

  return (
    <View style={styles.container}>
    
      <View style={styles.topRow}>
       
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dayText}>{day}</Text>
          <Text style={styles.fullDateText}>{fullDate}</Text>
          <Text style={styles.timeText}>{currentTime}</Text>
        </View>

       
        <View style={styles.profileSection}>
          <Image source={ProfileIcon} style={styles.profileImage} />
          <Text style={styles.profileName}>James</Text>
        </View>
      </View>

     
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
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  dateTimeContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'flex-start',
    width: '45%', // Adjust width as needed for a calendar-like look
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  fullDateText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  profileSection: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 25,
    marginBottom: 5,
  },
  profileName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginHorizontal: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default DashboardScreen;
