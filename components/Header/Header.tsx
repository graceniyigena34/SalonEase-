import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export const Header = () => {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.welcomeText}>Welcome back,</Text>
        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color="#6C63FF" />
          <Text style={styles.locationText}>Delaware, USA</Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => router.push('/profile')}>
        <Image 
          source={{ uri: 'https://i.pravatar.cc/150?u=grace' }} 
          style={styles.profilePic} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 14,
    color: '#999',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginLeft: 4,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#EEE',
  },
});