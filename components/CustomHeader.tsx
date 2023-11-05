import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from './BottomSheet';
import useCustomersStore from '@/stores/khataStore';
import { getAllCustomer } from '@/db/database';

const SeachBar = () => {
  const { Customers, setCustomers } = useCustomersStore();

  const [searchQuery, setSearchQuery] = useState<string>('');
  useEffect(() => {
    filterCustomers();
  }, [searchQuery]);

  const filterCustomers = async () => {
    if (!searchQuery) {
      const res = await getAllCustomer();
      res.sort((a: any, b: any) => a.name.localeCompare(b.name));
      setCustomers(res);
    } else {
      const filteredCustomers = Customers.filter((customer: any) =>
        customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setCustomers(filteredCustomers);
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
  const BottomSheetRef = useRef<BottomSheetModal>(null);
  function openModal() {
    BottomSheetRef.current?.present();
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <BottomSheet sender={'header'} ref={BottomSheetRef} />
      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>Khata App</Text>
        <TouchableOpacity onPress={openModal}>
          <Ionicons style={styles.addButton} name="person-add-outline" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <SeachBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titleContainer: {
    height: 55,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
  headerText: {
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  searchContainer: {
    height: 50,
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
  addButton: {
    paddingRight: 13,
  },
  backButton: {
    opacity: 100,
    paddingLeft: 10,
  },
});

export default CustomHeader;
