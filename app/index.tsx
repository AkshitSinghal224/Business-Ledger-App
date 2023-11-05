import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import CustomerList from '@/components/CustomerList';
import CustomFooter from '@/components/CustomFooter';

const Page = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.contentContainer}>
        <CustomerList />
      </ScrollView>
      <CustomFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 70,
  },
});

export default Page;
