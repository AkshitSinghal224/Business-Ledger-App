import { View, Text, ScrollView, StyleSheet, Clipboard, Switch } from 'react-native';
import React, { useEffect, useState } from 'react';
import useCustomersStore from '@/stores/khataStore';
import { createLog, getAllItems } from '@/db/database';
import Colors from '@/constants/Colors';
import { TextInput } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Item from '@/components/Item';
import { useNavigation } from 'expo-router';
import { Linking } from 'react-native';

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
    </View>
  );
};

const Footer = () => {
  const { setSeletedTempItemsToNull, SeletedTempItems, SeletedCustomer } = useCustomersStore();
  const navigation = useNavigation();
  const [isEnabled, setIsEnabled] = useState(false);

  function sendMessage(){
    const items = SeletedTempItems;
    let message = `Total items: ${items.length}\n`;
    items.forEach((item: any, idx: any) => {
      message += `item: ${idx+1}\nName: ${item.name}\nPrice: ${item.price}\nQuantity: ${item.quantity}\n\n`;
    });
    Clipboard.setString(message);
    const phoneNumber = `+91 ${SeletedCustomer.phone}`;
    const url = `sms:${phoneNumber}`;
    Linking.openURL(url);
  }

  async function handleConfirmButton() {
    

    if (SeletedTempItems.length === 0) return;
    try {
      await createLog(SeletedCustomer, SeletedTempItems);
      setSeletedTempItemsToNull();
      if(isEnabled) sendMessage();
      
    } catch (error) {
      console.error('Error when loging data', error);
    }
    setIsEnabled(false);
    navigation.navigate('index');
  }

  

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Switch
          trackColor={{ false: '#767577', true: Colors.medium }}
          thumbColor={isEnabled ? Colors.primary : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Text style={{ color: Colors.medium }}>send message to customer</Text>
      </View>
        <View style={styles.ConfirmButtom}>
          <Text onPress={handleConfirmButton} style={styles.bottomText}>
            Confirm
          </Text>
        </View>
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
          {allItems.length === 0 && <Text style={styles.warning}>No Item found</Text>}
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
    borderRadius: 4,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginTop: 30,
    width: 300,

    textAlign: 'center',
  },
  container: {
    backgroundColor: '#fff',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    gap: -20,
  },
  warning: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  buttonContainer:{
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Cart;
