import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from './BottomSheet';
import { Link } from 'expo-router';

const CustomFooter = () => {
  const BottomSheetRef = useRef<BottomSheetModal>(null);

  function openModal() {
    BottomSheetRef.current?.present();
  }
  return (
    <View style={styles.container}>
      <BottomSheet sender={'footer'} ref={BottomSheetRef} />
      <TouchableOpacity onPress={openModal}>
        <Ionicons style={styles.cartIcon} name="cart" size={30} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Link href={'/Logs'}>
          <Ionicons style={styles.bookIcon} name="book" size={30} color={Colors.primary} />
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    height: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 1, 
  },
  cartIcon: {
    marginBottom: 3,
    paddingBottom: 10,
  },
  bookIcon: {
    paddingBottom: 10,
  },
});

export default CustomFooter;
