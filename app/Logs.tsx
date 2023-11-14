import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { deleteLog, getLogs } from '@/db/database';
import Colors from '@/constants/Colors';
import Swipeout from 'react-native-swipeout';
import { Ionicons } from '@expo/vector-icons';
import useCustomersStore from '@/stores/khataStore';

const Logs = () => {
  const { allLogs, setAllLogs } = useCustomersStore();
  async function getAllLogs() {
    try {
      const data = await getLogs();
      const resverseData = data.reverse();
      setAllLogs(resverseData);
      console.log('get all logs successfully');
    } catch (error) {
      console.error('Error when get log data', error);
    }
  }

  const handleDeletelog = (id: number) => {
    deleteLog(id);
    getAllLogs();
  };

  useEffect(() => {
    getAllLogs();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.page}>
      <View style={styles.mainContiner}>
        {allLogs.length === 0 && <Text style={styles.warning}>No Logs found</Text>}
        {allLogs?.map((log: any) => {
          const parsedLogData = JSON.parse(log.data_log);
          return (
            <Swipeout
              key={log.id}
              style={{ backgroundColor: '#fff' }}
              right={[
                {
                  component: (
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Ionicons style={styles.deleteIcon} name="trash-outline" size={23} color={'white'} />
                    </View>
                  ),
                  backgroundColor: Colors.medium,
                  onPress: () => handleDeletelog(log.id),
                },
              ]}
            >
              <View style={styles.logContainer}>
                <View style={styles.titleSection}>
                  <Text style={styles.title}>{log.name}</Text>
                  <Text>{log.date}</Text>
                </View>
                <View>
                  <View style={styles.index}>
                    <Text style={styles.indexText1}>Name</Text>
                    <Text style={styles.indexText2}>Quantity</Text>
                    <Text style={styles.indexText3}>Price</Text>
                  </View>
                  {parsedLogData.map((row: any, idx: any) => {
                    return (
                      <>
                        <View key={idx*Math.random()} style={styles.logRow}>
                          <Text style={styles.name}>{row.name}</Text>
                          <Text style={styles.quantity}>{`${row.quantity} bags`}</Text>
                          <Text style={styles.price}>{`₹${row.price}`}</Text>
                        </View>
                        <View style={styles.bottomBorder} />
                      </>
                    );
                  })}
                </View>
              </View>
              <View style={styles.bottomBorderGrey} />
            </Swipeout>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  deleteIcon: {
    marginTop: 100,
  },
  name: {
    width: 150,
    textTransform: 'capitalize',
  },
  quantity: {
    width: 70,
    textAlign: 'right',
  },
  price: {
    textAlign: 'right',
    width: 80,
  },
  indexText1: {
    width: 150,
    fontWeight: 'bold',
  },
  indexText2: {
    width: 70,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  indexText3: {
    textAlign: 'right',
    fontWeight: 'bold',
    width: 80,
  },

  index: {
    flexDirection: 'row',
    marginBottom: 10,
  },

  page: {
    backgroundColor: '#fff',
  },
  mainContiner: {
    padding: 20,
    backgroundColor: '#fff',
    gap: 40,
    marginBottom: 20,
  },
  logContainer: {
    gap: 20,
    backgroundColor: Colors.lightGrey,
    padding: 20,
  },

  titleSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    color: Colors.primary,
    textTransform: 'capitalize',
  },
  priceRow: {
    flexDirection: 'row',
    gap: 50,
  },
  logRow: {
    flexDirection: 'row',
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

    textAlign: 'center',
  },
  container: {
    backgroundColor: '#fff',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomBorder: {
    height: 1,
    backgroundColor: Colors.primary,
    marginBottom: 6,
  },
  bottomBorderGrey: {
    height: 3,
    backgroundColor: Colors.medium,
    marginHorizontal: 40,
  },
  warning: {
    fontSize: 16,
    color: Colors.primary,
    marginTop: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});

export default Logs;
