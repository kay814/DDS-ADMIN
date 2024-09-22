// LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  // Handle Login Function
  const handleLogin = () => {
    if (email === 'dds@gmail.com' && password === 'DDs-172839-GH') {
      Alert.alert('Success', 'Welcome to the Admin Dashboard!');
      navigation.navigate('Dashboard'); // Navigate to the Dashboard screen
    } else {
      Alert.alert('Error', 'Invalid email or password.');
    }
  };

  return (
    <ImageBackground
      source={require('../../../assets/log.jpg')} // Ensure this path matches your project structure
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Title */}
        <Text style={styles.title}>Admin Login</Text>

        {/* Email Input */}
        <View style={styles.inputContainer}>
          <Icon name="email-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Icon name="lock-outline" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent overlay for readability
    padding: 20,
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    width: '100%',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#4285F4',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#4285F4',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LoginScreen;


