import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, TouchableOpacity } from 'react-native';
import Colors from '@/constants/Colors';
import { getAllCustomer } from '@/db/database';
import useCustomersStore from '../stores/khataStore';
import Customer from './Customer';
import { Ionicons } from '@expo/vector-icons';

const CustomerList = () => {
  const { Customers, setCustomers, filteredCustomers } = useCustomersStore();
  const [isModalVisible, setModalVisible] = useState(true);

  async function fetchCustomerData() {
    try {
      const res = await getAllCustomer();
      res.length !== 0 && setModalVisible(false);
      res.sort((a: any, b: any) => a.name.localeCompare(b.name));
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
      {Customers.length === 0 && <Text style={styles.warning}>No customer found</Text>}
      {filteredCustomers
        ? filteredCustomers.map((customer: any) => {
            return <Customer key={customer.id} customer={customer} fetchCustomerData={fetchCustomerData} />;
          })
        : Customers.map((customer: any) => {
            return <Customer key={customer.id} customer={customer} fetchCustomerData={fetchCustomerData} />;
          })}
      <Modal transparent={true} visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Instructions</Text>
            <View style={{ gap: 10, marginBottom: 10 }}>
              <View style={{ flexDirection: 'row' }}>
                <Text>1. To add customer click on</Text>
                <Ionicons style={{ marginLeft: 5 }} name="person-add-outline" size={20} color={Colors.primary} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>2. To add your items click on</Text>
                <Ionicons style={{ marginLeft: 5 }} name="cart-outline" size={20} color={Colors.primary} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>3. To check logs touch on</Text>
                <Ionicons style={{ marginLeft: 5 }} name="book-outline" size={20} color={Colors.primary} />
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>4. Click on any customer to create log</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>5. You can delete any customer or item by swiping left</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>6. You can edit logs by swiping right</Text>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text>
                  7. You can delete all data by clicking on khata app logo 10 times
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 40,
    color: Colors.secondary,
    alignSelf: 'center',
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
  warning: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
  },
  modalButtonClose: {
    backgroundColor: Colors.medium,
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: Colors.medium,
    padding: 10,
    borderRadius: 5,
  },
});

export default CustomerList;
