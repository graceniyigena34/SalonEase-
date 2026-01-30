import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Calendar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SERVICES = [
  { id: '1', name: 'Hair Cut', price: '$45', duration: '45 min' },
  { id: '2', name: 'Hair Color', price: '$85', duration: '90 min' },
  { id: '3', name: 'Makeup', price: '$65', duration: '60 min' },
  { id: '4', name: 'Facial Treatment', price: '$120', duration: '75 min' }
];

const TIME_SLOTS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
  '5:00 PM', '6:00 PM', '7:00 PM'
];

export default function AppointmentScreen() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = useState(null);

  const handleBooking = () => {
    if (selectedService && selectedDate && selectedTime) {
      console.log('Booking confirmed:', { selectedService, selectedDate, selectedTime });
      router.push('./booking-confirmation');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#1A1D1E" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Salon Info */}
        <View style={styles.salonInfo}>
          <Text style={styles.salonName}>Bella Rinova</Text>
          <Text style={styles.salonAddress}>6391 Elgin St. Celina, Delaware</Text>
        </View>

        {/* Service Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Service</Text>
          {SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceItem,
                selectedService?.id === service.id && styles.selectedServiceItem
              ]}
              onPress={() => setSelectedService(service)}
            >
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceDuration}>{service.duration}</Text>
              </View>
              <Text style={styles.servicePrice}>{service.price}</Text>
              {selectedService?.id === service.id && (
                <Ionicons name="checkmark-circle" size={20} color="#6366F1" style={styles.checkIcon} />
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Date Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date</Text>
          <View style={styles.dateContainer}>
            <TouchableOpacity style={styles.dateInput}>
              <Ionicons name="calendar-outline" size={20} color="#6366F1" />
              <Text style={styles.dateText}>{selectedDate}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Time Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Booking Summary */}
        {selectedService && (
          <View style={styles.summary}>
            <Text style={styles.summaryTitle}>Booking Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service:</Text>
              <Text style={styles.summaryValue}>{selectedService.name}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Duration:</Text>
              <Text style={styles.summaryValue}>{selectedService.duration}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Date:</Text>
              <Text style={styles.summaryValue}>{selectedDate}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Time:</Text>
              <Text style={styles.summaryValue}>{selectedTime || 'Not selected'}</Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{selectedService.price}</Text>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Book Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={[
            styles.bookButton,
            (!selectedService || !selectedTime) && styles.disabledButton
          ]}
          onPress={handleBooking}
          disabled={!selectedService || !selectedTime}
        >
          <Text style={styles.bookButtonText}>
            Book Appointment {selectedService ? selectedService.price : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#1A1D1E' },
  salonInfo: { paddingHorizontal: 20, marginBottom: 20 },
  salonName: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E' },
  salonAddress: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  section: { paddingHorizontal: 20, marginBottom: 30 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E', marginBottom: 16 },
  serviceItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 16, 
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginBottom: 12,
    position: 'relative'
  },
  selectedServiceItem: { borderColor: '#6366F1', backgroundColor: '#F0F9FF' },
  serviceInfo: { flex: 1 },
  serviceName: { fontSize: 16, fontWeight: '600', color: '#1A1D1E' },
  serviceDuration: { fontSize: 14, color: '#6B7280', marginTop: 2 },
  servicePrice: { fontSize: 16, fontWeight: 'bold', color: '#059669' },
  checkIcon: { position: 'absolute', top: 8, right: 8 },
  dateContainer: { marginTop: 8 },
  dateInput: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 16, 
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12
  },
  dateText: { fontSize: 16, color: '#1A1D1E', marginLeft: 12 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  timeSlot: { 
    paddingVertical: 12, 
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center'
  },
  selectedTimeSlot: { borderColor: '#6366F1', backgroundColor: '#6366F1' },
  timeText: { fontSize: 14, color: '#1A1D1E', fontWeight: '500' },
  selectedTimeText: { color: '#FFFFFF' },
  summary: { 
    marginHorizontal: 20, 
    padding: 20, 
    backgroundColor: '#F9FAFB', 
    borderRadius: 12,
    marginBottom: 20
  },
  summaryTitle: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E', marginBottom: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  summaryLabel: { fontSize: 14, color: '#6B7280' },
  summaryValue: { fontSize: 14, color: '#1A1D1E', fontWeight: '500' },
  totalRow: { borderTopWidth: 1, borderTopColor: '#E5E7EB', paddingTop: 12, marginTop: 8 },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#1A1D1E' },
  totalValue: { fontSize: 16, fontWeight: 'bold', color: '#059669' },
  bottomBar: { 
    padding: 20, 
    borderTopWidth: 1, 
    borderTopColor: '#F3F4F6', 
    backgroundColor: '#FFFFFF'
  },
  bookButton: { 
    backgroundColor: '#6366F1', 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: 'center' 
  },
  disabledButton: { backgroundColor: '#9CA3AF' },
  bookButtonText: { fontSize: 16, color: '#FFFFFF', fontWeight: '600' }
});