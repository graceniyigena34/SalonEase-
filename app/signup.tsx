import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SignupScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.back} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#1A1A1A" />
      </TouchableOpacity>

      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>Sign up to get started</Text>

      <View style={styles.inputBox}>
        <Ionicons name="person-outline" size={20} color="#999" />
        <TextInput placeholder="Full Name" placeholderTextColor="#999" style={styles.input} />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="mail-outline" size={20} color="#999" />
        <TextInput placeholder="Email" placeholderTextColor="#999" style={styles.input} />
      </View>

      <View style={styles.inputBox}>
        <Ionicons name="lock-closed-outline" size={20} color="#999" />
        <TextInput placeholder="Password" placeholderTextColor="#999" secureTextEntry style={styles.input} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/verify-phone")}>
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.loginContainer}>
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.login}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8", padding: 24, justifyContent: 'center' },
  back: { position: 'absolute', top: 60, left: 24 },
  title: { fontSize: 28, fontWeight: "700", color: "#1A1A1A" },
  subtitle: { fontSize: 14, color: "#A0A0A0", marginBottom: 30 },
  inputBox: { flexDirection: "row", alignItems: "center", backgroundColor: "#FFFFFF", borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, marginBottom: 16 },
  input: { marginLeft: 10, fontSize: 14, flex: 1, color: "#1A1A1A" },
  button: { backgroundColor: "#6C63FF", paddingVertical: 16, borderRadius: 16, alignItems: "center", marginBottom: 20 },
  buttonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  loginContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  footerText: { fontSize: 13, color: "#A0A0A0" },
  login: { color: "#6C63FF", fontWeight: "600", fontSize: 13 }
});