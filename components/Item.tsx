import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import { deleteItem } from '@/db/database';
import Swipeout from 'react-native-swipeout';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import useCustomersStore from '@/stores/khataStore';

interface ItemProps {
  fetchItemsData: () => void;
  item: any;
}

const Item: React.FC<ItemProps> = ({ fetchItemsData, item }) => {
  const [firstInput, setFirstInput] = useState<String>('');
  const [secondInput, setSecondInput] = useState<String>('');
  const { setSeletedTempItems } = useCustomersStore();

  const handleDeleteItem = async (id: number) => {
    await deleteItem(id);
    fetchItemsData();
  };

  useEffect(() => {
    if (firstInput && secondInput) {
      setSeletedTempItems({ ...item, quantity: firstInput, price: secondInput });
    }
  }, [firstInput, secondInput]);

  return (
    <Swipeout
      key={item?.id}
      style={{ backgroundColor: '#fff' }}
      right={[
        {
          component: (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons style={styles.deleteIcon} name="trash-outline" size={23} color={'white'} />
            </View>
          ),
          backgroundColor: Colors.medium,
          onPress: () => handleDeleteItem(item.id),
        },
      ]}
    >
      <View style={styles.itemContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <View style={styles.inputSection}>
          <Text style={styles.text}>Quantity:</Text>
          <View style={styles.serachField}>
            <TextInput onChangeText={(text) => setFirstInput(text)} style={styles.input} placeholder="type here.." />
          </View>
          <Text style={styles.text}>Price:</Text>
          <View style={styles.serachField}>
            <TextInput onChangeText={(text) => setSecondInput(text)} style={styles.input} placeholder="type here.." />
          </View>
        </View>
      </View>
      <View style={styles.bottomBorder} />
    </Swipeout>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  inputSection: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  input: {
    padding: 10,
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  bottomBorder: {
    marginTop: 8,
    height: 2,
    backgroundColor: Colors.primary,
  },
  text: {
    marginTop: 8,
  },
  serachField: {
    flex: 1,
  },
  deleteIcon: {
    marginTop: 20,
  },
});

export default Item;
