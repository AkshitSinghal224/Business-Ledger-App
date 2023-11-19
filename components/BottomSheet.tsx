import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React, { forwardRef, useCallback, useMemo, useState } from 'react';
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Colors from '@/constants/Colors';
import { addCustomer, addItem, getAllCustomer, getAllItems } from '@/db/database';
import useCustomersStore from '@/stores/khataStore';

export type Ref = BottomSheetModal;
interface BottomSheetProps {
  sender: string;
}

const BottomSheet = forwardRef<Ref, BottomSheetProps>((props, ref) => {
  const [firstInput, setFirstInput] = useState<String>('');
  const [secondInput, setSecondInput] = useState<String>('');
  const [thirdInput, setThirdInput] = useState<String>('');

  const sender = props.sender;
  const snapPoints = useMemo(() => ['80%'], []);
  const renderBackdrop = useCallback(
    (props: any) => <BottomSheetBackdrop appearsOnIndex={1} disappearsOnIndex={-1} {...props} />,
    []
  );
  const { dismiss } = useBottomSheetModal();
  const { setCustomers } = useCustomersStore();

  const { setAllItems } = useCustomersStore();

  async function fetchItemsData() {
    try {
      const res = await getAllItems();
      res.sort((a: any, b: any) => a.name.localeCompare(b.name));
      setAllItems(res);
    } catch (error) {
      console.error('Error fetching items data:', error);
    }
  }

  async function handleConfirmButton() {
    if (!firstInput) return;
    if (sender === 'Cart') {
      try {
        await addItem(secondInput ? `${firstInput} ( ${secondInput} )` : `${firstInput}`);
        fetchItemsData();
      } catch (err) {
        console.error('error while adding item', err);
      }
    } else {
      
      try {
        await addCustomer(`${firstInput} ${secondInput}`, thirdInput);
        const res = await getAllCustomer();
        res.sort((a: any, b: any) => a.name.localeCompare(b.name));
        setCustomers(res);
      } catch (err) {
        console.error('error while adding customer', err);
      }
    }
    setFirstInput('');
    setSecondInput('');
    setThirdInput('');
    dismiss();
  }

  return (
    <BottomSheetModal
      handleIndicatorStyle={{}}
      backgroundStyle={{ borderRadius: 0, backgroundColor: '#fff' }}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.mainContainer}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{sender == 'Person' ? 'Add Customer' : 'Add Item'}</Text>
        </View>
        <Text style={styles.text}>{sender == 'Person' ? 'First name' : 'Item name'} </Text>
        <View style={styles.serachField}>
          <TextInput onChangeText={(text) => setFirstInput(text)} style={styles.input} placeholder="type here.." />
        </View>
        <Text style={styles.text}>{sender == 'Person' ? 'Last name' : 'Item type'} </Text>
        <View style={styles.serachField}>
          <TextInput onChangeText={(text) => setSecondInput(text)} style={styles.input} placeholder="type here.." />
        </View>
        {sender === 'Person' && (
          <>
            <Text style={styles.text}>{"Phone no"}</Text>
            <View style={styles.serachField}>
              <TextInput onChangeText={(text) => setThirdInput(text)} inputMode="numeric" style={styles.input} placeholder="add without +91" />
            </View>
          </>
        )}
        <TouchableOpacity style={styles.ConfirmButtom} onPress={() => handleConfirmButton()}>
          <Text style={styles.bottomText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    marginHorizontal: 15,
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
  contentContainer: {
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  input: {
    flex: 1,
    padding: 10,
    color: 'black',
  },
  serachField: {
    backgroundColor: Colors.lightGrey,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 10,
  },
  text: {
    fontSize: 12,
    marginHorizontal: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
});

export default BottomSheet;
