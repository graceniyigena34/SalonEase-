import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function VerifyPhone() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your phone!</Text>
      <Text style={styles.subtitle}>A 4 digit security code will be sent via SMS to verify your mobile number.</Text>
      
      <View style={styles.phoneInputRow}>
        <View style={styles.countryCode}>
            <Text style={styles.flag}>🇺🇸 +1</Text>
        </View>
        <TextInput 
          style={styles.phoneInput} 
          placeholder="7134445187" 
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push("/otp-code")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 24, justifyContent: 'center' },
  title: { fontSize: 28, fontWeight: '700', textAlign: 'center' },
  subtitle: { textAlign: 'center', color: '#A0A0A0', marginVertical: 20 },
  phoneInputRow: { flexDirection: 'row', marginBottom: 30 },
  countryCode: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 12, marginRight: 10 },
  flag: { fontSize: 16 },
  phoneInput: { flex: 1, backgroundColor: '#F9F9F9', padding: 15, borderRadius: 12, fontSize: 16 },
  button: { backgroundColor: '#6C63FF', padding: 18, borderRadius: 12, alignItems: 'center' },
  buttonText: { color: '#FFF', fontWeight: '700' }
});