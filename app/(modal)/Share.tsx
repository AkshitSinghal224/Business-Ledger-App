import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-gesture-handler';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from '@gorhom/bottom-sheet';
import { getLogs } from '@/db/database';
import { useNavigation } from 'expo-router';

const Share = () => {
  const [date, setDate] = useState<string>();
  const navigation = useNavigation();

  async function handleConfirmButton() {
    if (date) {
      const allLogs = await getAllLogs();
      let data = allLogs.filter((item: any) => item.date.includes(date));
      let message = 'Customer Data:\n\n';

      data.forEach((entry: any) => {
        message += `Customer Name: ${entry.name}\n`;
        message += `Date: ${entry.date}\n`;
        message += 'Data Log:\n';

        const dataLogs = JSON.parse(entry.data_log);
        dataLogs.forEach((log: any, idx: any) => {
          message += `  - Item: ${idx + 1},
            Name: ${log.name}, 
            Quantity: ${log.quantity}, 
            Price: ${log.price}\n`;
        });

        message += '\n';
      });
      navigation.navigate('Logs');
    }
  }

  async function getAllLogs() {
    try {
      const data = await getLogs();
      return data;
    } catch (error) {
      console.error('Error when get log data', error);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.filterOption}>
        <Text style={styles.text}>Filter by Date</Text>
        <View style={styles.searchWrapper}>
          <TextInput onChangeText={(text) => setDate(text)} placeholder="dd-mm-yyyy" />
        </View>
      </View>
      <TouchableOpacity style={styles.ConfirmButtom} onPress={() => handleConfirmButton()}>
        <Text style={styles.bottomText}>Copy data</Text>
      </TouchableOpacity>
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

export default Share;
