import React from 'react';
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import { Location, Shift } from '../../../shared/types';
import { useQuery } from '@tanstack/react-query';
import { shiftsModel } from '@/entities/shifts';
import { ShiftCard } from './shift-card';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/shared/types';

interface ShiftsSearchListProps {
  location: Location | undefined;
}

export const ShiftsSearchList: React.FC<ShiftsSearchListProps> = ({
  location,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { data, isLoading, error, refetch, isFetching } = useQuery({
    ...shiftsModel.getShiftsListOptions(location!),
    enabled: Boolean(location),
  });
 
  if (!location) return null;

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#1f70c7ff" />
        <Text style={styles.loadingText}>Загрузка смен...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Ошибка загрузки смен</Text>
        <Text style={styles.errorDetails}>
          Проверьте подключение к интернету
        </Text>
      </View>
    );
  }

  if (data && data.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>Смены не найдены</Text>
      </View>
    );
  }
  const onShiftPress = (shift: Shift) => {
    navigation.navigate('ShiftDetails', { shift });
  };
  
  return (
    <FlatList<Shift>
      data={data}
      renderItem={({ item }) => (
        <ShiftCard shift={item} onPress={onShiftPress} />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={refetch}
          colors={['#166cc8ff']}
          tintColor="#1a6fcbff"
        />
      }
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6C757D',
  },
  errorText: {
    fontSize: 18,
    color: '#DC3545',
    fontWeight: '600',
    textAlign: 'center',
  },
  errorDetails: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#6C757D',
    fontWeight: '600',
    textAlign: 'center',
  },
  emptyDetails: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 8,
    textAlign: 'center',
  },
  listContainer: {
    padding: 16,
  },
});
