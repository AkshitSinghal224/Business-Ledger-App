import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

import useCustomersStore from '@/stores/khataStore';
import {  resetAlldata } from '@/db/database';
import { Link } from 'expo-router';

const SeachBar = () => {
  const { Customers, setFilteredCustomers } = useCustomersStore();

  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    filterCustomers();
  }, [searchQuery]);

  const filterCustomers = async () => {
    if (!searchQuery) {
      setFilteredCustomers(null);
    } else {
      const filtered = Customers.filter((customer: any) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
   
      setFilteredCustomers(filtered);
    }
  };

  return (
    <View style={styles.searchContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.serachSection}>
          <View style={styles.serachField}>
            <Ionicons style={styles.serachIcon} name="ios-search" size={20} color={Colors.medium} />
            <TextInput
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              style={styles.input}
              placeholder="Search...."
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const CustomHeader = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const {setCustomers } = useCustomersStore();

  const handleButtonClick = () => {
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);

    const threshold = 8;

    if (newClickCount === threshold) {
     
      setModalVisible(true);

      setClickCount(0);
    }
  };

  const handleModalButton = async () => {
    await resetAlldata();
    setCustomers([]);
    setModalVisible(false);
  };
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.titleContainer}>
          <View>
            <Text onPress={handleButtonClick} style={styles.headerText}>
              Business Logs
            </Text>
            <Text style={styles.headerTextLower}>v.1.5.0</Text>
          </View>
          <TouchableOpacity>
            <Link style={styles.book} href={'/Logs'}>
              <Ionicons name="book-outline" size={25} color={Colors.primary} />
            </Link>
          </TouchableOpacity>
        </View>
        <SeachBar />
      </SafeAreaView>
      <Modal transparent={true} visible={isModalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure?</Text>
            <View style={{ gap: 10 }}>
              <TouchableOpacity style={styles.modalButton} onPress={handleModalButton}>
                <Text style={styles.modalButtonText}>Reset all data</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButtonClose} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  titleContainer: {
    height: 60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  headerText: {
    marginLeft: 8,
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  headerTextLower: {
    marginLeft: 8,
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 5,
  },
  searchContainer: {
    height: 60,
    backgroundColor: '#fff',

  },
  serachSection: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  serachField: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterButton: {
    padding: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    color: Colors.littleDark,
  },
  serachIcon: {
    paddingLeft: 10,
  },
  book: {
    marginRight: 15,
  },
  backButton: {
    opacity: 100,
    paddingLeft: 10,
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
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
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
});

export default CustomHeader;
