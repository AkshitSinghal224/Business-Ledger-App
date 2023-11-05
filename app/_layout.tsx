import { Link, Stack } from 'expo-router';
import CustomHeader from '../components/CustomHeader';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import createTables from '../db/database';
import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

export const unstable_settings = {
  initialRouteName: 'index',
};

export default function RootLayoutNav() {
  useEffect(() => {
    createTables();
  }, []);

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
            presentation: 'modal',
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
              <TouchableOpacity>
                <Link href={'/(modal)/Filter'}>
                  <Ionicons name="options-outline" size={25} color={Colors.primary} />
                </Link>
              </TouchableOpacity>
            ),
            headerTintColor: Colors.primary,
          }}
        />
        <Stack.Screen
          name="Logs"
          options={{
            title: 'Log Book',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitleStyle: {
              color: Colors.primary,
              fontSize: 20,
            },
            headerRight: () => (
              <TouchableOpacity>
                <Link href={'/(modal)/Filter'}>
                  <Ionicons name="options-outline" size={25} color={Colors.primary} />
                </Link>
              </TouchableOpacity>
            ),
            headerTintColor: Colors.primary,
          }}
        />
      </Stack>
    </BottomSheetModalProvider>
  );
}
