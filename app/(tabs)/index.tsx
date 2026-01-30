import React from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router'; 

import { Header } from '../../components/Header/Header';
import { AppointmentCard } from '../../components/Appointment/AppointmentCard';
import { ServiceList } from '../../components/Services/Servicelist';
import { SalonCard } from '../../components/salon/SalonCard';

export default function HomeScreen() {
  const router = useRouter(); 

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* 1. Header Section */}
          <Header />
          
          {/* 2. Appointment Banner - Navigates to Booking */}
          <TouchableOpacity 
            activeOpacity={0.8} 
            onPress={() => router.push('./Booking')}
            style={styles.appointmentWrapper}
          >
            <AppointmentCard />
          </TouchableOpacity>

          {/* 3. Services Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Services</Text>
            <TouchableOpacity onPress={() => router.push('./services')}>
               <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <ServiceList />

          {/* 4. Nearest Salon Section */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearest salon</Text>
            <TouchableOpacity onPress={() => router.push('./salon-list')}>
               <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.listPadding}>
            <TouchableOpacity onPress={() => router.push('./salon/detail')}>
              <SalonCard 
                name="Bella Rinova" 
                address="6391 Elgin St. Celina, Delaware 1..." 
                rating="4.8" 
                dist="5"
                image={{ uri: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80' }} 
              />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomSpacer} />
          
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  appointmentWrapper: {
    paddingHorizontal: 20, // Ensures the card doesn't touch the screen edges
    marginTop: 10,
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingHorizontal: 20, 
    marginTop: 25 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  viewAll: { 
    color: '#A0A0A0', 
    fontSize: 12 
  },
  listPadding: { 
    paddingHorizontal: 20, 
    marginTop: 15,
  },
  bottomSpacer: {
    height: 120, 
  }
});