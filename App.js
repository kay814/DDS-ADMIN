import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './src/screens/Welcome/Welcome';
import DashboardScreen from './src/screens/Dashboard/Dashboard';
import OrdersScreen from './src/screens/Orders/Orders';
import FeedbacksScreen from './src/screens/Feedback/Feedback';


const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Feedbacks" component={FeedbacksScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
