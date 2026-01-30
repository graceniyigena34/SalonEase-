import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  Platform,
  Linking,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';

interface Salon {
  id: string;
  name: string;
  address: string;
  rating: string;
  distance: string;
  image: string;
  lat?: number;
  lng?: number;
}

const SALONS: Salon[] = [
  {
    id: '1',
    name: 'Green Apple',
    address: '6391 Elgin St. Celina, Delaware',
    rating: '5.0',
    distance: '15 km',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400',
    lat: 39.0997,
    lng: -75.5244,
  },
  {
    id: '2',
    name: 'Bella Rinova',
    address: '8502 Preston Rd. Inglewood',
    rating: '4.0',
    distance: '22 km',
    image: 'https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=400',
    lat: 34.0195,
    lng: -118.3580,
  },
  {
    id: '3',
    name: 'The Galleria',
    address: '4140 Parker Rd. Allentown',
    rating: '3.0',
    distance: '48 km',
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400',
    lat: 40.6084,
    lng: -75.4903,
  },
  {
    id: '4',
    name: 'Michael Saldana',
    address: '3891 Ranchview Dr. Richardson',
    rating: '4.0',
    distance: '89 km',
    image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?w=400',
    lat: 32.9757,
    lng: -96.7300,
  },
  {
    id: '5',
    name: 'Fox and Jane',
    address: '1517 W. Grey St. Allentown',
    rating: '4.5',
    distance: '35 km',
    image: 'https://images.unsplash.com/photo-1507271341519-e21cc028cb29?w=400',
    lat: 40.6050,
    lng: -75.4850,
  },
  {
    id: '6',
    name: 'Butterfly Studio Salon',
    address: '3715 Ash St. San Jose, California',
    rating: '4.2',
    distance: '50 km',
    image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=400',
    lat: 37.3382,
    lng: -121.8863,
  },
];

const ARTISTS = [
  { id: '1', name: 'Lily', role: 'Hair Stylist', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' },
  { id: '2', name: 'Lee', role: 'Sr. Barber', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150' },
  { id: '3', name: 'Connor', role: 'Makeup Artist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
  { id: '4', name: 'Jaxon', role: 'Hair Stylist', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
];

const CATEGORIES = ['All', 'Haircuts', 'Make up', 'Massage', 'Skin care'];

const openDirections = (salon: Salon) => {
  if (!salon.lat || !salon.lng) return;

  const scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
  const url = Platform.OS === 'ios'
    ? `${scheme}${salon.lat},${salon.lng}?q=${encodeURIComponent(salon.name)}`
    : `${scheme}${salon.lat},${salon.lng}?q=${encodeURIComponent(salon.name)}`;

  Linking.openURL(url).catch(() => {
    // Fallback to Google Maps
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${salon.lat},${salon.lng}`;
    Linking.openURL(googleMapsUrl);
  });
};

export default function BookingScreen() {
  const router = useRouter();
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSalons = SALONS.filter((salon) =>
    salon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderHeader = () => (
    <View style={{ backgroundColor: '#FFF' }}>
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color="#A0A0A0" />
          <TextInput
            placeholder="Search Salon"
            style={styles.input}
            placeholderTextColor="#A0A0A0"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterBtn}>
            <Feather name="sliders" size={18} color="#1A1A1A" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ height: 50, marginTop: 15 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catList}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCat(cat)}
              style={[styles.catItem, selectedCat === cat && styles.catItemActive]}
            >
              <Text style={[styles.catText, selectedCat === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Text style={styles.sectionTitle}>Popular artists</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.artistList}>
        {ARTISTS.map((artist) => (
          <View key={artist.id} style={styles.artistCard}>
            <Image source={{ uri: artist.image }} style={styles.artistImg} />
            <Text style={styles.artistName}>{artist.name}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.resultsInfo}>
        <Text style={styles.resultsCount}>Results found ({filteredSalons.length})</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredSalons}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <View style={styles.salonCard}>
            <Image source={{ uri: item.image }} style={styles.salonImg} />
            <View style={styles.salonDetails}>
              <View>
                <Text style={styles.salonName}>{item.name}</Text>
                <Text style={styles.salonAddress} numberOfLines={1}>
                  {item.address}
                </Text>
              </View>

              <View style={styles.footerRow}>
                <View style={styles.ratingBox}>
                  <Ionicons name="star" size={14} color="#FFB800" />
                  <Text style={styles.ratingText}>{item.rating}</Text>
                  <Text style={styles.distText}> | {item.distance}</Text>
                </View>

                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.directionBtn}
                    onPress={() => openDirections(item)}
                  >
                    <Ionicons name="navigate" size={16} color="#6C63FF" />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.bookBtn}
                    onPress={() =>
                      router.push({
                        pathname: `../Appointment/${item.id}`,
                        params: {
                          name: item.name,
                          address: item.address,
                          image: item.image,
                        },
                      })
                    }
                  >
                    <Text style={styles.bookText}>Book</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginTop: 10 },
  searchBar: { flex: 1, flexDirection: 'row', backgroundColor: '#F8F8F8', borderRadius: 15, paddingHorizontal: 15, height: 50, alignItems: 'center' },
  input: { flex: 1, marginLeft: 10, fontSize: 16 },
  filterBtn: { borderLeftWidth: 1, borderLeftColor: '#E0E0E0', paddingLeft: 10 },
  catList: { paddingHorizontal: 20 },
  catItem: { paddingHorizontal: 15, justifyContent: 'center', height: 40, marginRight: 10 },
  catItemActive: { borderBottomWidth: 2, borderBottomColor: '#6C63FF' },
  catText: { color: '#A0A0A0', fontWeight: '500' },
  catTextActive: { color: '#6C63FF', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 20, marginTop: 25 },
  artistList: { paddingHorizontal: 20, marginTop: 15 },
  artistCard: { alignItems: 'center', marginRight: 25 },
  artistImg: { width: 65, height: 65, borderRadius: 35, backgroundColor: '#EEE' },
  artistName: { marginTop: 8, fontSize: 13, fontWeight: '500', color: '#1A1A1A' },
  resultsInfo: { paddingHorizontal: 20, marginTop: 25, marginBottom: 10 },
  resultsCount: { fontSize: 16, fontWeight: 'bold', color: '#1A1A1A' },
  salonCard: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: '#FFF', borderRadius: 20, padding: 12, marginBottom: 15, elevation: 3, shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 } },
  salonImg: { width: 90, height: 90, borderRadius: 15 },
  salonDetails: { flex: 1, marginLeft: 15, justifyContent: 'space-between' },
  salonName: { fontSize: 17, fontWeight: 'bold', color: '#1A1A1A' },
  salonAddress: { fontSize: 13, color: '#A0A0A0', marginTop: 2 },
  footerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingBox: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 4, fontWeight: 'bold', fontSize: 13, color: '#1A1A1A' },
  distText: { fontSize: 13, color: '#A0A0A0' },
  actionButtons: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  directionBtn: { width: 36, height: 36, borderRadius: 10, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#E0E0E0' },
  bookBtn: { backgroundColor: '#6C63FF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  bookText: { color: '#FFF', fontWeight: 'bold', fontSize: 13 }
});