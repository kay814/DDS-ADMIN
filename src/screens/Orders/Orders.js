import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore'; 
import app from '../Authentication/Config/Config'; 
import Checkbox from 'expo-checkbox'; // Replaced the checkbox import with expo-checkbox

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const db = getFirestore(app);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'Checkouts')); 
        const ordersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          orderReceived: doc.data().orderReceived || false,
          orderProcessing: doc.data().orderProcessing || false,
          courierOnTheWay: doc.data().courierOnTheWay || false,
          orderDelivered: doc.data().orderDelivered || false,
        }));
        setOrders(ordersData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusUpdate = async (orderId, statusKey, newValue) => {
    try {
      const orderRef = doc(db, 'Checkouts', orderId);
      await updateDoc(orderRef, { [statusKey]: newValue });
      Alert.alert("Success", `Status updated to: ${statusKey.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
    } catch (error) {
      Alert.alert("Error", "Failed to update the status. Please try again.");
      console.error("Error updating status:", error);
    }
  };

  const toggleStatus = (orderId, statusKey, currentStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, [statusKey]: !currentStatus } : order
    );
    setOrders(updatedOrders);
    handleStatusUpdate(orderId, statusKey, !currentStatus);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderOrderItem = ({ item }) => {
    const checkoutTime = new Date(item.checkoutTime); // Parse ISO string

    return (
      <View style={styles.card}>
        <Text style={styles.orderId}>Order ID: {item.id}</Text>
        <Text style={styles.customerEmail}>Customer Email: {item.customerData?.email || "No email provided"}</Text>
        
        {item.cartItems && item.cartItems.map((cartItem, index) => (
          <View key={index} style={styles.itemContainer}>
            <Text style={styles.itemText}>Item: {cartItem.name}</Text>
            <Text style={styles.itemText}>Price: ${cartItem.price}</Text>
            <Text style={styles.itemText}>Quantity: {cartItem.quantity}</Text>
          </View>
        ))}

        <Text style={styles.checkoutTime}>Checkout Time: {checkoutTime.toLocaleString()}</Text>
        <Text style={styles.totalPrice}>Total Price: ${item.totalPrice.toFixed(2)}</Text>

        {/* Tracking Status Checkboxes */}
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <Checkbox
              style={styles.checkbox}
              value={item.orderReceived}
              onValueChange={() => toggleStatus(item.id, 'orderReceived', item.orderReceived)}
              color={item.orderReceived ? '#4630EB' : undefined} // Optional color based on status
            />
            <Text>Order Received</Text>
          </View>

          <View style={styles.statusItem}>
            <Checkbox
              style={styles.checkbox}
              value={item.orderProcessing}
              onValueChange={() => toggleStatus(item.id, 'orderProcessing', item.orderProcessing)}
              color={item.orderProcessing ? '#4630EB' : undefined}
            />
            <Text>Order Processing</Text>
          </View>

          <View style={styles.statusItem}>
            <Checkbox
              style={styles.checkbox}
              value={item.courierOnTheWay}
              onValueChange={() => toggleStatus(item.id, 'courierOnTheWay', item.courierOnTheWay)}
              color={item.courierOnTheWay ? '#4630EB' : undefined}
            />
            <Text>Courier On The Way</Text>
          </View>

          <View style={styles.statusItem}>
            <Checkbox
              style={styles.checkbox}
              value={item.orderDelivered}
              onValueChange={() => toggleStatus(item.id, 'orderDelivered', item.orderDelivered)}
              color={item.orderDelivered ? '#4630EB' : undefined}
            />
            <Text>Order Delivered</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 10,
  },
  customerEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  itemContainer: {
    marginTop: 10,
    paddingVertical: 5,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
  checkoutTime: {
    marginTop: 15,
    fontSize: 14,
    color: '#999',
  },
  totalPrice: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  statusContainer: {
    marginTop: 20,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 8,
  },
});

export default OrdersScreen;
