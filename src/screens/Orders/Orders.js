import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, Alert } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; 
import app from '../Authentication/Config/Config'; 

const CasesScreen = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const db = getFirestore(app);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const casesSnapshot = await getDocs(collection(db, 'Cases'));
        const casesData = casesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCases(casesData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCases();
  }, []);

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

  const renderCaseItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.caseId}>Case ID: {item.id}</Text>
      <Text style={styles.caseEmail}>Email: {item.email}</Text>
      <Text style={styles.caseIssues}>Issues: {item.issues}</Text>
      <Text style={styles.casePhoneNumber}>Phone Number: {item.phoneNumber}</Text>
      <Text style={[styles.caseStatus, { color: item.taken ? '#10B981' : '#EF4444' }]}>
        Taken: {item.taken ? 'Yes' : 'No'}
      </Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cases</Text>
      <FlatList
        data={cases}
        renderItem={renderCaseItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC', // Slightly off-white for a soft look
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    textAlign: 'center',
    color: '#0A2540', // Rich dark blue for elegance
    marginBottom: 20,
    letterSpacing: 1.2,
  },
  listContainer: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 17,
    borderWidth: 3,
    borderColor: '#E3E8F0',
  },
  caseId: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937', // Dark gray for strong visibility
    marginBottom: 12,
  },
  caseEmail: {
    fontSize: 15,
    fontWeight: '500',
    color: '#6B7280', // Subtle gray for text details
    marginBottom: 10,
  },
  caseIssues: {
    fontSize: 16,
    color: '#374151', // Darker gray for better contrast
    marginBottom: 10,
  },
  casePhoneNumber: {
    fontSize: 16,
    color: '#374151',
    marginBottom: 10,
  },
  caseStatus: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
  },
  errorText: {
    fontSize: 18,
    color: '#D32F2F', // Red color for error messaging
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CasesScreen;
