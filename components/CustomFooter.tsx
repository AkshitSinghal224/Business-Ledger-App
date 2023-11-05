import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet from './BottomSheet';
import { Link } from 'expo-router';

const CustomFooter = () => {
  const BottomSheetRef = useRef<BottomSheetModal>(null);
  function openModal() {
    BottomSheetRef.current?.present();
    console.log("open")
  }
  return (
    <View style={styles.container}>
      <BottomSheet sender={'footer'} ref={BottomSheetRef} />
      <TouchableOpacity onPress={openModal}>
        <Ionicons style={styles.cartIcon} name="cart" size={30} color={Colors.primary} />
      </TouchableOpacity>
        <TouchableOpacity >
      <Link href={'/Logs'}>
          <Ionicons style={styles.bookIcon} name="book-outline" size={25} color={Colors.primary} />
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
