import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import OrdersImage from '../../../assets/case.png'; 
import FeedbackImage from '../../../assets/legal-advice.png'; 
import ProfileIcon from '../../../assets/user.png'; 
import BackgroundImage from '../../../assets/bcc.jpg'; // Import background image

const DashboardScreen = ({ navigation }) => {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [day, setDay] = useState('');
  const [fullDate, setFullDate] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-GB')); 
      setCurrentDate(now.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })); 
      setDay(now.toLocaleDateString('en-GB', { weekday: 'long' })); 
      setFullDate(now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })); 
    };

    updateClock(); 
    const timer = setInterval(updateClock, 1000); 
    return () => clearInterval(timer); 
  }, []);

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dayText}>{day}</Text>
            <Text style={styles.fullDateText}>{fullDate}</Text>
            <Text style={styles.timeText}>{currentTime}</Text>
          </View>

          <View style={styles.profileSection}>
            <Image source={ProfileIcon} style={styles.profileImage} />
            <Text style={styles.profileName}>welcome, Francis</Text>
          </View>
        </View>

        <View style={styles.imageRow}>
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Orders')}>
            <Image source={OrdersImage} style={styles.image} />
            <Text style={styles.cardText}>Cases</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Feedbacks')}>
            <Image source={FeedbackImage} style={styles.image} />
            <Text style={styles.cardText}>Reports</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  dateTimeContainer: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    alignItems: 'flex-start',
    width: '45%',
  },
  dayText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
    marginBottom: 2,
  },
  fullDateText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  timeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  profileSection: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
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
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  card: {
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    marginHorizontal: 20,
    width: 150, // Adjust to make it bigger
  },
  cardText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
});

export default DashboardScreen;
