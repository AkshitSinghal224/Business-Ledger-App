import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
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
      let filterd = allLogs.filter((item:any) => item.date.includes(date));
      setAllLogs(filterd);
       navigation.navigate('Logs');

    } else if (name) {
      let filterd = allLogs.filter((item:any) => item.name.includes(name));
      setAllLogs(filterd);
      navigation.navigate('Logs');
    }
  }

  async function getAllLogs() {
    try {
      const data = await getLogs();
      const allLogs = data.reverse();
      setAllLogs(allLogs);
      console.log('get all logs successfully');
    } catch (error) {
      console.error('Error when get log data', error);
    }
  }

  function handleResetButton() {
    setDate('');
    setName('');
    getAllLogs();
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.filterOption}>
        <Text style={styles.text}>Filter by Date</Text>
        <View style={styles.searchWrapper}>
          <TextInput
            style={{ opacity: name ? 0.2 : 1,
              }}
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
});

export default Filter;
