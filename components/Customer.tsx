import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { deleteCustomer } from '@/db/database';
import useCustomersStore from '../stores/khataStore';
import Swipeout from 'react-native-swipeout';
import { Ionicons } from '@expo/vector-icons';

interface CustomerProps {
  customer: any; 
  fetchCustomerData: () => void;
}

const Customer: React.FC<CustomerProps> = ({ customer, fetchCustomerData }) => {
  const { setSeletedCustomer } = useCustomersStore();

  const handleNameClick = (name: string) => {
    setSeletedCustomer(name);
  };

  const handleDeleteCustomer = (id: number) => {
    deleteCustomer(id);
    fetchCustomerData();
  };

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
          backgroundColor: Colors.secondary,
          onPress: () => handleDeleteCustomer(customer.id),
        },
      ]}
    >
      <Link href={'/Cart'} asChild>
        <TouchableOpacity onPress={() => handleNameClick(customer)}>
          <View style={styles.customerItem}>
            <Text style={styles.customersName}>{customer?.name}</Text>
            <Text style={styles.phone}>{`+91 ${customer?.phone}`}</Text>
            <View style={styles.bottomBorder} />
          </View>
        </TouchableOpacity>
      </Link>
    </Swipeout>
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
    marginTop: 16,
  },
  customerItem: {
    backgroundColor: '#fff',
    marginTop: 15,
  },
  customersName: {
    fontSize: 20,

    textTransform: 'capitalize',
  },
  bottomBorder: {
    height: 1,
    backgroundColor: Colors.primary,
  },
  deleteIcon: {
    marginTop: 17,
  },
  phone: {
    color: Colors.medium,
    marginBottom: 10,
  },
});

export default Customer;
