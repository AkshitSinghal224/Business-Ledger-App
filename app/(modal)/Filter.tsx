import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import useCustomersStore from '@/stores/khataStore';
import { getLogs } from '@/db/database';
import { useNavigation } from 'expo-router';

const Filter = () => {
  const { allLogs, setAllLogs } = useCustomersStore();

  const [date, setDate] = useState<string>();
  const [name, setName] = useState<string>();
  const navigation = useNavigation();

  function handleConfirmButton() {
    if (date) {
      let filterd = allLogs.filter((item: any) => item.date.includes(date));
      setAllLogs(filterd);
      navigation.navigate('Logs');
    } else if (name) {
      let filterd = allLogs.filter((item: any) => item.name.toLowerCase().includes(name.toLowerCase()));
      setAllLogs(filterd);
      navigation.navigate('Logs');
    }
  }

  async function getAllLogs() {
    try {
      const data = await getLogs();
      const allLogs = data.reverse();
      setAllLogs(allLogs);
    } catch (error) {
      console.error('Error when get log data', error);
    }
  }

  function handleResetButton() {
    setDate('');
    setName('');
    getAllLogs();
    navigation.navigate('Logs');
  }

  useEffect(() => {
    getAllLogs();
  },[]);

function filterByToday() {
  const today = new Date();
  const formattedDate = formatDate(today);
  let filtered = allLogs.filter((item: any) => item.date.includes(formattedDate));
  setAllLogs(filtered);
  navigation.navigate('Logs');
}

function filterByYesterday() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const formattedDate = formatDate(yesterday);
  let filtered = allLogs.filter((item: any) => item.date.includes(formattedDate));
  setAllLogs(filtered);
  navigation.navigate('Logs');
}

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
}

  return (
    <View style={styles.mainContainer}>
      <View style={styles.filterButton}>
        <TouchableOpacity onPress={handleResetButton} style={styles.buttonWrapper}>
          <Text style={styles.text}>All Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={filterByToday} style={styles.buttonWrapper}>
          <Text style={styles.text}>Today Logs</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={filterByYesterday} style={styles.buttonWrapper}>
          <Text style={styles.text}>Yesterday Logs</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.filterOption}>
        <Text style={styles.text}>Filter by Date</Text>
        <View style={styles.searchWrapper}>
          <TextInput
            style={{ opacity: name ? 0.2 : 1 }}
            editable={!name}
            onChangeText={(text) => setDate(text)}
            placeholder="dd-mm-yyyy"
          />
        </View>
      </View>
      <View style={styles.filterOption}>
        <Text style={styles.text}>Filter by Name</Text>
        <View style={styles.searchWrapper}>
          <TextInput
            style={{ opacity: date ? 0.2 : 1 }}
            editable={!date}
            onChangeText={(text) => setName(text)}
            placeholder="enter name here"
          />
        </View>
      </View>
      <View style={styles.btns}>
        <TouchableOpacity style={styles.ConfirmButtom} onPress={() => handleConfirmButton()}>
          <Text style={styles.bottomText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.ConfirmButtom, backgroundColor: Colors.medium, paddingHorizontal: 25 }}
          onPress={() => handleResetButton()}
        >
          <Text style={styles.bottomText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  searchWrapper: {
    padding: 20,
    backgroundColor: Colors.lightGrey,
  },
  filterOption: {
    marginTop: 30,
  },
  ConfirmButtom: {
    padding: 16,
    margin: 16,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    marginTop: 30,
  },
  bottomText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btns: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonWrapper: {
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: Colors.primary,
  },
});

export default Filter;
