import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/shared/types';
import { Star } from 'lucide-react-native';

type ShiftDetailsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ShiftDetails'
>;
type ShiftDetailsRouteProp = RouteProp<RootStackParamList, 'ShiftDetails'>;

interface ShiftDetailsPageProps {
  navigation: ShiftDetailsNavigationProp;
  route: ShiftDetailsRouteProp;
}

export const ShiftDetailsScreen: React.FC<ShiftDetailsPageProps> = ({
  navigation,
  route,
}) => {
  const { shift } = route.params;

  useEffect(() => {
    if (shift) {
      navigation.setOptions({
        title: shift.workTypes[0]?.nameOne || 'Детали смены',
      });
    }
  }, [navigation, shift]);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Основная информация</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Компания:</Text>
            <Text style={styles.value}>{shift.companyName}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Должность:</Text>
            <Text style={styles.value}>
              {shift.workTypes[0]?.nameOne || 'Работник'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Адрес:</Text>
            <Text style={styles.value}>{shift.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Дата:</Text>
            <Text style={styles.value}>{shift.dateStartByCity}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Время:</Text>
            <Text style={styles.value}>
              {shift.timeStartByCity} - {shift.timeEndByCity}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Оплата:</Text>
            <Text style={[styles.value, styles.payValue]}>
              {shift.priceWorker} руб/день
              {shift.bonusPriceWorker > 0 &&
                ` + бонус ${shift.bonusPriceWorker} руб`}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Работников:</Text>
            <Text style={styles.value}>
              {shift.currentWorkers}/{shift.planWorkers} (нужно еще{' '}
              {shift.planWorkers - shift.currentWorkers})
            </Text>
          </View>
          {shift.customerRating && (
            <View style={styles.infoRow}>
              <Text style={styles.label}>Рейтинг:</Text>
              <View style={styles.centeredRow}>
                <Star size={15} color="#ffe603ff" />
                <Text style={styles.value}>
                  {shift.customerRating} ({shift.customerFeedbacksCount})
                </Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {shift.currentWorkers < shift.planWorkers && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.applyButton} onPress={() => {}}>
            <Text style={styles.applyButtonText}>
              Подать заявку (осталось {shift.planWorkers - shift.currentWorkers}{' '}
              мест)
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },

  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '600',
    width: 120,
  },
  value: {
    fontSize: 14,
    color: '#212529',
    flex: 1,
  },
  payValue: {
    color: '#28A745',
    fontWeight: '600',
  },
  bottomContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#DEE2E6',
  },
  applyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});
