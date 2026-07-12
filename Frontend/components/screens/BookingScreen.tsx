import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import PrimaryButton from '../ui/PrimaryButton';
import BackButton from '../ui/BackButton';

interface BookingScreenProps {
  onNavigate: (screen: string) => void;
}

export default function BookingScreen({ onNavigate }: BookingScreenProps) {
  const [description, setDescription] = useState('');

  const handleRequest = () => {
    // Works on both iOS/Android and web (React Native fallback for web alert)
    if (typeof alert !== 'undefined') {
      alert("✅ Mechanic Requested Successfully!");
    } else {
      Alert.alert("Success", "✅ Mechanic Requested Successfully!");
    }
    onNavigate('Home');
  };

  return (
    <View style={styles.screenContainer}>
      <View style={styles.bookingHeader}>
        <BackButton
          style={styles.backButtonOverride}
          onPress={() => onNavigate('Home')}
        />
        <Text style={styles.bookingTitle}>Book Service</Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingTop: 20 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.label}>SELECT VEHICLE</Text>
        <TouchableOpacity style={styles.vehicleCard}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={styles.vehicleIcon}>
              <Feather name="triangle" size={20} color="#f97316" />
            </View>
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.vehicleName}>Yamaha MT-15</Text>
              <Text style={styles.vehicleNumber}>DL 04 AB 1234</Text>
            </View>
          </View>
          <Feather name="check-circle" size={24} color="#f97316" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.addBikeText}>+ Add another bike</Text>
        </TouchableOpacity>

        <Text style={[styles.label, { marginTop: 24 }]}>DESCRIBE THE ISSUE</Text>
        <TextInput
          style={styles.textArea}
          placeholder="E.g., Rear tyre is punctured..."
          placeholderTextColor="#9ca3af"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={[styles.label, { marginTop: 24 }]}>SERVICE LOCATION</Text>
        <View style={styles.locationCard}>
          <Feather
            name="map-pin"
            size={20}
            color="#ef4444"
            style={{ marginTop: 2 }}
          />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.locationName}>Connaught Place</Text>
            <Text style={styles.locationDesc}>
              Block A, Connaught Place, New Delhi, Delhi 110001
            </Text>
          </View>
        </View>

        <View style={styles.spacer} />

        <PrimaryButton
          title="Request Mechanic Now"
          onPress={handleRequest}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
  },
  bookingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#f3f4f6',
  },
  bookingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginLeft: 16,
  },
  backButtonOverride: {
    marginTop: 0,
    marginBottom: 0,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  label: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#6b7280',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  vehicleCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff3eb',
    borderWidth: 1,
    borderColor: '#f97316',
    borderRadius: 12,
  },
  vehicleIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  vehicleName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  vehicleNumber: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  addBikeText: {
    color: '#f97316',
    fontWeight: '600',
    fontSize: 12,
    marginTop: 12,
  },
  textArea: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    padding: 16,
    height: 120,
    color: '#111827',
    fontSize: 14,
  },
  locationCard: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
  },
  locationName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  locationDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    lineHeight: 18,
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
});
