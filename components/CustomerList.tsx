import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Link, Redirect } from 'expo-router';

interface CustomerListProps {
  setSelectedCustomer: (name: string) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ setSelectedCustomer }) => {
  const names = [
    'Emma Taylor',
    'Isaac Smith',
    'Hannah Wilson',
    'Frank Smith',
    'Charlie Lopez',
    'Bob Harris',
    'Alice Davis',
    'Jessica Davis',
    'David Lopez',
    'Grace Smith',
    'Frank Smith',
    'Charlie Johnson',
    'David Harris',
    'Jessica Taylor',
    'Hannah Lee',
    'Grace Lopez',
    'Bob Davis',
    'Isaac Lee',
    'David Harris',
    'Alice Smith',
  ];

  const handleNameClick = (name: string) => {
    setSelectedCustomer(name);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Customers</Text>
        {names.map((name, idx) => {
          return (
            <Link href={'Cart'} asChild>
              <TouchableOpacity key={idx} onPress={() => handleNameClick(name)}>
                <View style={styles.customerItem}>
                  <Text style={styles.customersName}>{name}</Text>
                  <View style={styles.bottomBorder} />
                </View>
              </TouchableOpacity>
            </Link>
          );
        })}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 16,
  },
  customerItem: {
    backgroundColor: '#fff',
    marginTop: 20,
  },
  customersName: {
    fontSize: 25,
    marginBottom: 8,
  },
  bottomBorder: {
    height: 1,
    backgroundColor: Colors.primary,
  },
});

export default CustomerList;
