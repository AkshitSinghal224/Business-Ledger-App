import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { deleteCustomer, getAllCustomer, getLogs } from '@/db/database';
import useCustomersStore from '../stores/khataStore';
import Swipeout from 'react-native-swipeout';
import { Ionicons } from '@expo/vector-icons';

const CustomerList = () => {
  const { Customers, setCustomers } = useCustomersStore();
  const { setSeletedCustomer } = useCustomersStore();

  async function fetchCustomerData() {
    try {
      const res = await getAllCustomer();
      res.sort((a: any, b: any) => a.name.localeCompare(b.name));
      setCustomers(res);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  }

  useEffect(() => {
    fetchCustomerData();
  }, []);

  const handleNameClick = (name: string) => {
    setSeletedCustomer(name);
  };

  const handleDeleteCustomer = (id: number) => {
    deleteCustomer(id);
    fetchCustomerData();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => getLogs()}>
        <Text style={styles.title}>Customers</Text>
      </TouchableOpacity>
      {Customers.map((customer: any) => {
        return (
          <Swipeout
            key={customer?.id}
            style={{ backgroundColor: '#fff' }}
            right={[
              {
                component: (
                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Ionicons style={styles.deleteIcon} name="trash-outline" size={23} color={'white'} />
                  </View>
                ),
                backgroundColor: Colors.medium,
                onPress: () => handleDeleteCustomer(customer.id),
              },
            ]}
          >
            <Link href={'/Cart'} asChild>
              <TouchableOpacity onPress={() => handleNameClick(customer)}>
                <View style={styles.customerItem}>
                  <Text style={styles.customersName}>{customer?.name}</Text>
                  <View style={styles.bottomBorder} />
                </View>
              </TouchableOpacity>
            </Link>
          </Swipeout>
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
  deleteIcon: {
    marginTop: 17,
  },
});

export default CustomerList;
