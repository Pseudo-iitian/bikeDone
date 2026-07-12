import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
// Feather icons are pre-bundled with Expo
import { Feather } from '@expo/vector-icons';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Login');
  const [showPassword, setShowPassword] = useState(false);

  // --- SCREENS ---

  const renderLogin = () => (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Logo Area */}
        <View style={styles.logoContainer}>
          <View style={styles.logoIconBox}>
            <Feather name="tool" size={32} color="#f97316" />
          </View>
          <Text style={styles.logoText}>BIKEDONE</Text>
          <Text style={styles.subtitle}>Your trusted ride rescue partner.</Text>
        </View>

        <Text style={styles.headerTitle}>Welcome Back! 👋</Text>

        {/* Inputs */}
        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#9ca3af" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email or Phone Number"
            placeholderTextColor="#9ca3af"
            defaultValue="user@bikedone.com"
          />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#9ca3af" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#9ca3af"
            secureTextEntry={!showPassword}
            defaultValue="123456"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.brandText}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Action Button */}
        <TouchableOpacity style={styles.primaryButton} onPress={() => setCurrentScreen('Home')}>
          <Text style={styles.primaryButtonText}>Log In</Text>
        </TouchableOpacity>

        {/* Social Login Divider */}
        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* Social Buttons */}
        <View style={styles.socialRow}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Feather name="target" size={18} color="black" style={{ marginRight: 6 }} />
            <Text style={styles.socialButtonText}>Apple</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => setCurrentScreen('Signup')}>
            <Text style={[styles.brandText, { fontWeight: 'bold' }]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const renderSignup = () => (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('Login')}>
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.subtitleLeft}>Join BIKEDONE for instant roadside & garage assistance.</Text>
        </View>

        <View style={styles.inputContainer}>
          <Feather name="user" size={20} color="#9ca3af" style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#9ca3af" />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="phone" size={20} color="#9ca3af" style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Mobile Number" placeholderTextColor="#9ca3af" keyboardType="phone-pad" />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="mail" size={20} color="#9ca3af" style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#9ca3af" keyboardType="email-address" />
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#9ca3af" style={styles.inputIcon} />
          <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#9ca3af" secureTextEntry={!showPassword} />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
            <Feather name={showPassword ? "eye" : "eye-off"} size={20} color="#9ca3af" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={[styles.primaryButton, { marginTop: 20 }]} onPress={() => setCurrentScreen('Home')}>
          <Text style={styles.primaryButtonText}>Sign Up</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          By signing up, you agree to our <Text style={styles.brandText}>Terms of Service</Text> and <Text style={styles.brandText}>Privacy Policy</Text>.
        </Text>

        <View style={styles.spacer} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => setCurrentScreen('Login')}>
            <Text style={[styles.brandText, { fontWeight: 'bold' }]}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  const renderHome = () => (
    <View style={[styles.screenContainer, { backgroundColor: '#f9fafb', paddingHorizontal: 0 }]}>
      {/* Top Header */}
      <View style={styles.homeHeader}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.headerLabel}>Current Location</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="map-pin" size={14} color="white" />
              <Text style={styles.headerLocation}> Connaught Place, Delhi </Text>
              <Feather name="chevron-down" size={14} color="white" />
            </View>
          </View>
          <View style={styles.bellIcon}>
            <Feather name="bell" size={20} color="white" />
            <View style={styles.notificationDot} />
          </View>
        </View>
        <Text style={styles.greetingText}>Hello, Alex! 🏍️</Text>
        <Text style={styles.greetingSub}>What does your bike need today?</Text>
      </View>

      <ScrollView contentContainerStyle={styles.homeContent} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Feather name="search" size={20} color="#9ca3af" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search services (e.g., Puncture)"
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Active Ticket */}
        <View style={styles.alertBox}>
          <View style={styles.alertIconBox}>
            <Feather name="info" size={18} color="#2563eb" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.alertTitle}>No active bookings</Text>
            <Text style={styles.alertSub}>Your bike is running smoothly. Book a service if needed!</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Quick Services</Text>

        {/* Service Grid */}
        <View style={styles.gridContainer}>
          {[
            { id: 1, title: 'General Service', icon: 'tool', color: '#f97316', bg: '#fff3eb' },
            { id: 2, title: 'Tyre Issue', icon: 'disc', color: '#ea580c', bg: '#fff7ed' },
            { id: 3, title: 'Brake & Clutch', icon: 'sliders', color: '#ef4444', bg: '#fef2f2' },
            { id: 4, title: 'Emergency Tow', icon: 'truck', color: '#a855f7', bg: '#faf5ff' },
          ].map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gridItem}
              onPress={() => setCurrentScreen('Booking')}
            >
              <View style={[styles.gridIconBox, { backgroundColor: item.bg }]}>
                <Feather name={item.icon as any} size={24} color={item.color} />
              </View>
              <Text style={styles.gridText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Bottom Nav */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="home" size={24} color="#f97316" />
          <Text style={[styles.navText, { color: '#f97316' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="file-text" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Feather name="user" size={24} color="#9ca3af" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderBooking = () => (
    <View style={styles.screenContainer}>
      <View style={styles.bookingHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => setCurrentScreen('Home')}>
          <Feather name="arrow-left" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.bookingTitle}>Book Service</Text>
      </View>

      <ScrollView contentContainerStyle={[styles.scrollContent, { paddingTop: 20 }]} showsVerticalScrollIndicator={false}>

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
        />

        <Text style={[styles.label, { marginTop: 24 }]}>SERVICE LOCATION</Text>
        <View style={styles.locationCard}>
          <Feather name="map-pin" size={20} color="#ef4444" style={{ marginTop: 2 }} />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={styles.locationName}>Connaught Place</Text>
            <Text style={styles.locationDesc}>Block A, Connaught Place, New Delhi, Delhi 110001</Text>
          </View>
        </View>

        <View style={styles.spacer} />

        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => {
            alert("✅ Mechanic Requested Successfully!");
            setCurrentScreen('Home');
          }}
        >
          <Text style={styles.primaryButtonText}>Request Mechanic Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={currentScreen === 'Home' ? 'light-content' : 'dark-content'} backgroundColor={currentScreen === 'Home' ? '#f97316' : '#ffffff'} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {currentScreen === 'Login' && renderLogin()}
        {currentScreen === 'Signup' && renderSignup()}
        {currentScreen === 'Home' && renderHome()}
        {currentScreen === 'Booking' && renderBooking()}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 24,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 40,
  },
  logoIconBox: {
    width: 64,
    height: 64,
    backgroundColor: '#fff3eb',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ffe4c6',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
  },
  subtitle: {
    color: '#6b7280',
    marginTop: 8,
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#111827',
    fontSize: 14,
  },
  eyeIcon: {
    padding: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  brandText: {
    color: '#f97316',
    fontWeight: '600',
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: '#f97316',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#9ca3af',
    fontSize: 10,
    fontWeight: 'bold',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    height: 52,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  spacer: {
    flex: 1,
    minHeight: 40,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#6b7280',
    fontSize: 14,
  },
  backButton: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 24,
  },
  titleContainer: {
    marginBottom: 32,
  },
  subtitleLeft: {
    color: '#6b7280',
    fontSize: 14,
    marginTop: 4,
  },
  termsText: {
    fontSize: 11,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 18,
  },
  /* Home Styles */
  homeHeader: {
    backgroundColor: '#f97316',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerLabel: {
    color: '#fff3eb',
    fontSize: 12,
    marginBottom: 4,
  },
  headerLocation: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bellIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 12,
    width: 8,
    height: 8,
    backgroundColor: '#ef4444',
    borderRadius: 4,
  },
  greetingText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  greetingSub: {
    color: '#fff3eb',
    fontSize: 14,
    marginTop: 4,
  },
  homeContent: {
    padding: 24,
    paddingBottom: 100,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 50,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#111827',
  },
  alertBox: {
    flexDirection: 'row',
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#dbeafe',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  alertIconBox: {
    padding: 8,
    backgroundColor: '#dbeafe',
    borderRadius: 8,
    marginRight: 12,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  alertSub: {
    fontSize: 12,
    color: '#1d4ed8',
    marginTop: 4,
    lineHeight: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },
  gridIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  gridText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    paddingBottom: 24, // For iOS home indicator
    borderTopWidth: 1,
    borderColor: '#f3f4f6',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 4,
    color: '#9ca3af',
  },
  /* Booking Styles */
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
});