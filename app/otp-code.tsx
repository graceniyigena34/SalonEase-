import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OtpCodeScreen() {
  const router = useRouter();
  
  // Refs to automatically move focus to the next box
  const pin1Ref = useRef<TextInput>(null);
  const pin2Ref = useRef<TextInput>(null);
  const pin3Ref = useRef<TextInput>(null);
  const pin4Ref = useRef<TextInput>(null);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Verify phone</Text>
        <Text style={styles.subtitle}>
          Please enter the 4 digit security code we just sent you at <Text style={styles.phoneNum}>713-444-xxxx</Text>
        </Text>

        <View style={styles.otpRow}>
          <TextInput
            ref={pin1Ref}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => text && pin2Ref.current?.focus()}
          />
          <TextInput
            ref={pin2Ref}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => text && pin3Ref.current?.focus()}
          />
          <TextInput
            ref={pin3Ref}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => text && pin4Ref.current?.focus()}
          />
          <TextInput
            ref={pin4Ref}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => {
                if (text.length === 1){
                    // Navigate to forgot password flow after OTP verification
                    setTimeout(() => router.push("/forgot-password"), 500);
                }
            }}
          />
        </View>

        <Text style={styles.resendText}>Resend in <Text style={styles.timer}>48 Sec</Text></Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => router.push("/forgot-password")}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  backButton: { padding: 24 },
  content: { paddingHorizontal: 24, alignItems: 'center' },
  title: { fontSize: 28, fontWeight: '700', color: '#1A1A1A', marginBottom: 12 },
  subtitle: { textAlign: 'center', color: '#A0A0A0', lineHeight: 22, marginBottom: 40 },
  phoneNum: { color: '#6C63FF', fontWeight: '600' },
  otpRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    width: '100%', 
    paddingHorizontal: 20,
    marginBottom: 40 
  },
  otpInput: {
    width: 60,
    height: 60,
    backgroundColor: '#F9F9F9',
    borderRadius: 16,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#F0F0F0'
  },
  resendText: { color: '#A0A0A0', fontSize: 14, marginBottom: 40 },
  timer: { color: '#6C63FF', fontWeight: '600' },
  button: { 
    backgroundColor: '#6C63FF', 
    width: '100%', 
    padding: 18, 
    borderRadius: 16, 
    alignItems: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4
  },
  buttonText: { color: '#FFF', fontWeight: '700', fontSize: 16 }
});