import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; 
import app from '../Authentication/Config/Config'; 

const FeedbacksScreen = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const reportsSnapshot = await getDocs(collection(db, 'Report'));
        const reportsData = reportsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setReports(reportsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0A2540" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  const renderReportItem = ({ item }) => (
    <View style={styles.card}>
      {/* <Text style={styles.reportId}>Report ID: <Text style={styles.reportIdValue}>{item.id}</Text></Text> */}
      <Text style={styles.reportEmail}>Email: <Text style={styles.reportEmailValue}>{item.email}</Text></Text>
      <Text style={styles.reportText}>Report Text: <Text style={styles.reportTextValue}>{item.reportText}</Text></Text>
      <Text style={styles.reportPhoneNumber}>Phone Number: <Text style={styles.reportPhoneValue}>{item.phoneNumber}</Text></Text>
      <Text style={styles.reportDate}>Date: <Text style={styles.reportDateValue}>{item.date}</Text></Text>
      <Text style={styles.reportTime}>Time: <Text style={styles.reportTimeValue}>{item.time}</Text></Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reports</Text>
      <FlatList
        data={reports}
        renderItem={renderReportItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F4F8', // Elegant light background
    padding: 20,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    color: 'red', // Elegant dark blue
    marginBottom: 20,
    letterSpacing: 1.5,
  },
  listContainer: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF', // Clean white background
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#E0E6ED', // Softer border for refinement
  },
  reportId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
  },
  reportIdValue: {
    color: '#6366F1', // Blue for ID value
  },
  reportEmail: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 6,
  },
  reportEmailValue: {
    color: '#10B981', // Green for email value
  },
  reportText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 6,
  },
  reportTextValue: {
    color: 'indigo', // Red for report text value
  },
  reportPhoneNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
    marginBottom: 6,
  },
  reportPhoneValue: {
    color: 'gray', // Amber for phone number value
  },
  reportDate: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 4,
  },
  reportDateValue: {
    color: '#9CA3AF', // Light gray for date value
  },
  reportTime: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280',
  },
  reportTimeValue: {
    color: '#9CA3AF', // Light gray for time value
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default FeedbacksScreen;
