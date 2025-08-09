import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Settings, CreditCard, MapPin, Bell, Shield, CircleHelp as HelpCircle, LogOut, ChevronRight, Package } from 'lucide-react-native';
import { router } from 'expo-router';

const recentOrders = [
  {
    id: '1',
    orderNumber: '#12345',
    date: '2024-01-15',
    total: 129.98,
    status: 'Delivered',
    items: 2,
  },
  {
    id: '2',
    orderNumber: '#12344',
    date: '2024-01-10',
    total: 79.99,
    status: 'Shipped',
    items: 1,
  },
  {
    id: '3',
    orderNumber: '#12343',
    date: '2024-01-05',
    total: 245.97,
    status: 'Processing',
    items: 3,
  },
];

export default function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const menuItems = [
    {
      icon: Package,
      title: 'My Orders',
      subtitle: 'Track your orders',
      onPress: () => {},
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      subtitle: 'Manage cards and billing',
      onPress: () => {},
    },
    {
      icon: MapPin,
      title: 'Addresses',
      subtitle: 'Manage shipping addresses',
      onPress: () => {},
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Push notification settings',
      onPress: () => {},
      showToggle: true,
      toggleValue: notifications,
      onToggle: setNotifications,
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      subtitle: 'Account security settings',
      onPress: () => {},
    },
    {
      icon: Settings,
      title: 'App Settings',
      subtitle: 'Theme and preferences',
      onPress: () => {},
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      subtitle: 'FAQs and contact us',
      onPress: () => {},
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton} activeOpacity={0.7}>
              <Settings size={16} color="#ffffff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
          
          <TouchableOpacity style={styles.editProfileButton} activeOpacity={0.8}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3</Text>
            <Text style={styles.statLabel}>Wishlist</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>$1,234</Text>
            <Text style={styles.statLabel}>Spent</Text>
          </View>
        </View>

        {/* Recent Orders */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          {recentOrders.map((order) => (
            <TouchableOpacity key={order.id} style={styles.orderItem} activeOpacity={0.8}>
              <View style={styles.orderInfo}>
                <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                <Text style={styles.orderDate}>{order.date} • {order.items} items</Text>
                <Text style={styles.orderTotal}>${order.total.toFixed(2)}</Text>
              </View>
              <View style={styles.orderRight}>
                <Text style={[styles.orderStatus, { color: getStatusColor(order.status) }]}>
                  {order.status}
                </Text>
                <ChevronRight size={16} color="#6b7280" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
                activeOpacity={0.8}
              >
                <View style={styles.menuLeft}>
                  <View style={styles.menuIconContainer}>
                    <IconComponent size={20} color="#6b7280" />
                  </View>
                  <View style={styles.menuText}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                  </View>
                </View>
                
                <View style={styles.menuRight}>
                  {item.showToggle ? (
                    <Switch
                      value={item.toggleValue}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#e5e7eb', true: '#2563EB' }}
                      thumbColor={item.toggleValue ? '#ffffff' : '#f3f4f6'}
                    />
                  ) : (
                    <ChevronRight size={16} color="#6b7280" />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout */}
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={() => router.push('/auth/login')}
            activeOpacity={0.8}
          >
            <LogOut size={20} color="#EF4444" />
            <Text style={styles.logoutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStatusColor(status: string): string {
  switch (status) {
    case 'Delivered':
      return '#10B981';
    case 'Shipped':
      return '#2563EB';
    case 'Processing':
      return '#F59E0B';
    default:
      return '#6b7280';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 8,
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#e5e7eb',
    marginHorizontal: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
    paddingHorizontal: 20,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 4,
  },
  orderTotal: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  orderRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 8,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  menuLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  menuRight: {
    marginLeft: 16,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#fecaca',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EF4444',
    marginLeft: 8,
  },
});