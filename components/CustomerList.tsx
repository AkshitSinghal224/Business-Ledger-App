import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { getAllCustomer } from '@/db/database';
import useCustomersStore from '../stores/khataStore';
import Customer from './Customer';

const CustomerList = () => {
  const { Customers, setCustomers } = useCustomersStore();

  async function fetchCustomerData() {
    try {
      const res = await getAllCustomer();
      console.log(res);
      res.sort((a:any, b:any) => a.name.localeCompare(b.name));
      setCustomers(res);
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  }

  useEffect(() => {
    fetchCustomerData();
  }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Customers</Text>
      {Customers.map((customer:any) => {
        return (
          <Customer
            key={customer.id} // Add a unique key for each item in the list
            customer={customer}
            fetchCustomerData={fetchCustomerData}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  nofoundcontainer: {
    marginTop: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noFound: {
    fontSize: 25,
    color: Colors.primary,
  },
  container: {
    padding: 20,
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 25,
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
