import { View, Text, ScrollView, StyleSheet, Keyboard, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import useCustomersStore from '@/stores/khataStore';
import { createLog, getAllItems } from '@/db/database';
import Colors from '@/constants/Colors';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import Item from '@/components/Item';
import { useNavigation } from 'expo-router';

const FilterSearchBar = () => {
  const { allItems, setAllItems } = useCustomersStore();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterItems = async () => {
    if (!searchQuery) {
      const res = await getAllItems();
      res.sort((a: any, b: any) => a.name.localeCompare(b.name));
      setAllItems(res);
    } else {
      const filteredItems = allItems.filter((item: any) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
      setAllItems(filteredItems);
    }
  };

  useEffect(() => {
    filterItems();
  }, [searchQuery]);

  return (
    <View style={styles.searchContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.serachSection}>
          <View style={styles.Field}>
            <Ionicons name="ios-search" size={20} color={Colors.medium} />
            <TextInput
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              style={styles.searchInput}
              placeholder="Search...."
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const Footer = () => {
  const { allItems, SeletedTempItems, SeletedCustomer } = useCustomersStore();

  const navigation = useNavigation();

  async function handleConfirmButton() {
    try {
      const res = await createLog(SeletedCustomer, SeletedTempItems);
      console.log('log sucess');
    } catch (error) {
      console.error('Error when loging data', error);
    }
    navigation.navigate('index');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleConfirmButton}>
        <View style={styles.ConfirmButtom}>
          <Text style={styles.bottomText}>Confirm</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Cart = () => {
  const { allItems, setAllItems } = useCustomersStore();

  async function fetchItemsData() {
    try {
      const res = await getAllItems();
      res.sort((a: any, b: any) => a.name.localeCompare(b.name));
      setAllItems(res);
      console.log('feting data successfully');
    } catch (error) {
      console.error('Error fetching items data:', error);
    }
  }

  useEffect(() => {
    fetchItemsData();
  }, []);

  return (
    <>
      <FilterSearchBar />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
        <View style={styles.mainContiner}>
          {allItems?.map((item: any, idx: any) => {
            return <Item key={idx} fetchItemsData={fetchItemsData} item={item} />;
          })}
        </View>
      </ScrollView>
      <Footer />
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
  },
  headerMargin: {
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  mainContiner: {
    padding: 20,
    backgroundColor: '#fff',
    gap: 40,
    marginBottom: 20,
  },
  searchContainer: {
    paddingTop: 20,
    height: 70,
    backgroundColor: '#fff',
  },
  serachSection: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  filterButton: {
    padding: 5,
  },
  Field: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    padding: 10,
    color: Colors.littleDark,
  },
  bottomText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  ConfirmButtom: {
    padding: 16,
    margin: 16,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginTop: 30,
    width: 300,

    textAlign: 'center',
  },
  container: {
    backgroundColor: '#fff',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;
