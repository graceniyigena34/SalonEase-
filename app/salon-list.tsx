import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const SALONS = [
  {
    id: '1',
    name: 'Bella Rinova',
    address: '6391 Elgin St. Celina, Delaware 10299',
    rating: '4.8',
    distance: '5 km',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80',
    services: ['Hair Cut', 'Makeup', 'Spa'],
    price: '$45-120',
    openTime: '9:00 AM - 8:00 PM',
    phone: '+1 (555) 123-4567'
  },
  {
    id: '2',
    name: 'The Galleria Hair Salon',
    address: '4140 Parker Rd. Allentown, New Mexico 31134',
    rating: '4.9',
    distance: '8 km',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=80',
    services: ['Hair Cut', 'Color', 'Treatment'],
    price: '$60-150',
    openTime: '8:00 AM - 9:00 PM',
    phone: '+1 (555) 987-6543'
  },
  {
    id: '3',
    name: 'Green Apple Spa',
    address: '8502 Preston Rd. Inglewood, Maine 98380',
    rating: '4.7',
    distance: '12 km',
    image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=800&q=80',
    services: ['Massage', 'Skincare', 'Facial'],
    price: '$80-200',
    openTime: '10:00 AM - 7:00 PM',
    phone: '+1 (555) 456-7890'
  },
  {
    id: '4',
    name: 'Style Studio',
    address: '3891 Ranchview Dr. Richardson, Texas 62639',
    rating: '4.6',
    distance: '15 km',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
    services: ['Nails', 'Makeup', 'Eyebrows'],
    price: '$30-90',
    openTime: '9:30 AM - 6:30 PM',
    phone: '+1 (555) 321-0987'
  }
];

export default function SalonListScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All');

  const renderSalonCard = ({ item }) => (
    <TouchableOpacity style={styles.salonCard} onPress={() => router.push('./salon-detail')}>
      <Image source={{ uri: item.image }} style={styles.salonImage} />
      
      <View style={styles.salonInfo}>
        <View style={styles.salonHeader}>
          <Text style={styles.salonName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
        </View>
        
        <Text style={styles.address} numberOfLines={1}>{item.address}</Text>
        
        <View style={styles.servicesContainer}>
          {item.services.slice(0, 3).map((service, index) => (
            <View key={index} style={styles.serviceTag}>
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
        
        <View style={styles.salonFooter}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={14} color="#6366F1" />
            <Text style={styles.distance}>{item.distance}</Text>
          </View>
          
          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text style={styles.openTime}>{item.openTime}</Text>
          </View>
          
          <Text style={styles.price}>{item.price}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.callButton} onPress={() => console.log('Call:', item.phone)}>
            <Ionicons name="call-outline" size={16} color="#6366F1" />
            <Text style={styles.callText}>Call</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.bookButton} onPress={() => router.push('./Booking')}>
            <Text style={styles.bookText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1A1D1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nearby Salons</Text>
        <TouchableOpacity>
          <Ionicons name="filter-outline" size={24} color="#1A1D1E" />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {['All', 'Hair', 'Spa', 'Nails'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, selectedFilter === filter && styles.filterButtonActive]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={SALONS}
        renderItem={renderSalonCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
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
  filterContainer: { 
    flexDirection: 'row', 
    paddingHorizontal: 20, 
    marginBottom: 20, 
    gap: 10 
  },
  filterButton: { 
    paddingHorizontal: 16, 
    paddingVertical: 8, 
    borderRadius: 20, 
    backgroundColor: '#F9FAFB' 
  },
  filterButtonActive: { backgroundColor: '#6366F1' },
  filterText: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  filterTextActive: { color: '#FFFFFF' },
  listContainer: { paddingHorizontal: 20 },
  salonCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: '#F3F4F6',
    overflow: 'hidden'
  },
  salonImage: { width: '100%', height: 180 },
  salonInfo: { padding: 16 },
  salonHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  salonName: { fontSize: 18, fontWeight: 'bold', color: '#1A1D1E', flex: 1 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  rating: { fontSize: 14, fontWeight: '600', color: '#1A1D1E', marginLeft: 4 },
  address: { fontSize: 14, color: '#6B7280', marginTop: 4 },
  servicesContainer: { flexDirection: 'row', marginTop: 12, gap: 8 },
  serviceTag: { 
    backgroundColor: '#F0F9FF', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 12 
  },
  serviceText: { fontSize: 12, color: '#0369A1', fontWeight: '500' },
  salonFooter: { marginTop: 12, gap: 6 },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  distance: { fontSize: 12, color: '#6366F1', marginLeft: 4, fontWeight: '500' },
  openTime: { fontSize: 12, color: '#6B7280', marginLeft: 4 },
  price: { fontSize: 16, fontWeight: 'bold', color: '#059669', marginTop: 4 },
  actionButtons: { flexDirection: 'row', marginTop: 16, gap: 12 },
  callButton: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingVertical: 12, 
    borderWidth: 1, 
    borderColor: '#6366F1', 
    borderRadius: 8 
  },
  callText: { fontSize: 14, color: '#6366F1', fontWeight: '600', marginLeft: 4 },
  bookButton: { 
    flex: 1, 
    backgroundColor: '#6366F1', 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  bookText: { fontSize: 14, color: '#FFFFFF', fontWeight: '600' }
});