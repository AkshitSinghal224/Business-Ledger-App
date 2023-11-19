import { Link, Stack } from 'expo-router';
import CustomHeader from '../components/CustomHeader';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect, useRef, useState } from 'react';
import createTables from '../db/database';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import BottomSheet from '@/components/BottomSheet';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayoutNav() {
  useEffect(() => {
    createTables();
  }, []);
  const BottomSheetRef = useRef<BottomSheetModal>(null);
  const [send, setSend] = useState<string>('');
  function openModal(message: string) {
    setSend(message);
    BottomSheetRef.current?.present();
  }

  return (
    <BottomSheetModalProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            header: () => <CustomHeader />,
          }}
        />
        <Stack.Screen
          name="(modal)/Filter"
          options={{
            title: 'Filter',
            presentation: 'modal',
            headerTitleStyle: {
              color: Colors.primary,
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="(modal)/Share"
          options={{
            title: 'Share',
            presentation: 'modal',
            headerTitleStyle: {
              color: Colors.primary,
              fontSize: 20,
            },
          }}
        />
        <Stack.Screen
          name="Cart"
          options={{
            title: 'Select Items',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              color: Colors.primary,
              fontSize: 20,
            },
            headerRight: () => (
              <>
              <BottomSheet sender={send} ref={BottomSheetRef} />
              <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", marginRight: 10}} onPress={() => openModal('Cart')}>
                <Ionicons
                  name="cart-outline"
                  size={25}
                  color={Colors.primary}
                />
              </TouchableOpacity>
              </>
            ),
            headerTintColor: Colors.primary,
          }}
        />
        <Stack.Screen
          name="EditPage"
          options={{
            title: 'Edit Log',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              color: Colors.primary,
              fontSize: 20,
            },
            headerTintColor: Colors.primary,
          }}
        />
        <Stack.Screen
          name="Logs"
          options={{
            title: 'Log Book',
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              color: Colors.primary,
              fontSize: 20,
            },
            headerRight: () => (
              <View style={{ flexDirection: 'row', gap: 20, marginRight: 10 }}>
                <TouchableOpacity>
                  <Link href={'/(modal)/Share'}>
                    <Ionicons name="share-outline" size={25} color={Colors.primary} />
                  </Link>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Link href={'/(modal)/Filter'}>
                    <Ionicons name="options-outline" size={25} color={Colors.primary} />
                  </Link>
                </TouchableOpacity>
              </View>
            ),
            headerTintColor: Colors.primary,
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
