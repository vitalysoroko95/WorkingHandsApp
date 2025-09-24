import { Shift } from '@/shared/types';
import { Clock, Coins, MapPin, Star, Users } from 'lucide-react-native';
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native';

export const ShiftCard: React.FC<{
  shift: Shift;
  onPress?: (shift: Shift) => void;
}> = ({ shift, onPress }) => (
  <TouchableOpacity
    style={styles.card}
    onPress={() => onPress?.(shift)}
    activeOpacity={0.7}
  >
    <View style={styles.cardHeader}>
      <View style={styles.cardHeaderLeft}>
        <Image source={{ uri: shift.logo }} style={styles.companyLogo} />
        <View style={styles.companyInfo}>
          <Text style={styles.cardTitle}>
            {shift.workTypes[0]?.nameOne || 'Работник'}
          </Text>
          <Text style={styles.cardCompany}>{shift.companyName}</Text>
        </View>
      </View>
      <View style={styles.cardHeaderRight}>
        <Text style={styles.cardDate}>{shift.dateStartByCity}</Text>
        {shift.customerRating && (
          <View style={[styles.ratingContainer, styles.detailsRow]}>
            <Star size={15} color="#ffe603ff" />
            <Text style={styles.ratingText}> {shift.customerRating}</Text>
          </View>
        )}
      </View>
    </View>

    <View style={styles.cardBody}>
      <View style={styles.detailsRow}>
        <MapPin size={15} color="#0089e4ff" />
        <Text style={styles.detailsText}>{shift.address}</Text>
      </View>
      <View style={styles.detailsRow}>
        <Clock size={15} color="#0089e4ff" />
        <Text style={styles.detailsText}>
          {shift.timeStartByCity} - {shift.timeEndByCity}
        </Text>
      </View>
      <View style={styles.workersInfo}>
        <View style={styles.detailsRow}>
          <Users size={15} color="#0089e4ff" />
          <Text style={styles.detailsText}>
            {shift.currentWorkers}/{shift.planWorkers} человек
          </Text>
        </View>

        <Text style={styles.needWorkers}>
          Нужно: {shift.planWorkers - shift.currentWorkers}
        </Text>
      </View>
    </View>

    <View style={styles.cardFooter}>
      <View style={styles.priceContainer}>
        <View style={styles.detailsRow}>
          <Coins size={20} color="#e2c717ff" />
          <Text style={styles.cardRate}> {shift.priceWorker} руб/день</Text>
          {shift.bonusPriceWorker > 0 && (
            <Text style={styles.bonusText}>
              + бонус {shift.bonusPriceWorker} руб
            </Text>
          )}
        </View>
      </View>
      <View style={styles.feedbackContainer}>
        <Text style={styles.feedbackText}>{shift.customerFeedbacksCount}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardHeaderRight: {
    alignItems: 'flex-end',
  },
  companyLogo: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#F8F9FA',
  },
  companyInfo: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 2,
  },
  cardCompany: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  cardDate: {
    fontSize: 12,
    color: '#6C757D',
    marginBottom: 4,
  },
  ratingContainer: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  ratingText: {
    fontSize: 12,
    color: '#212529',
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: 12,
  },
  detailsRow: {
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  workersInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsText: {
    fontSize: 14,
    color: '#6C757D',
  },
  needWorkers: {
    fontSize: 12,
    color: '#DC3545',
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  cardRate: {
    fontSize: 16,
    color: '#28A745',
    fontWeight: '700',
    marginBottom: 2,
  },
  bonusText: {
    fontSize: 12,
    color: '#FFC107',
    fontWeight: '600',
  },
  feedbackContainer: {
    alignItems: 'flex-end',
  },
  feedbackText: {
    fontSize: 12,
    color: '#6C757D',
  },
});
