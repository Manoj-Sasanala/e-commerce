import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Smartphone, Shirt, Chrome as Home, Headphones, Watch, Coffee } from 'lucide-react-native';

const categories = [
  {
    id: '1',
    name: 'Electronics',
    icon: Smartphone,
    color: '#2563EB',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=600',
    productCount: 245,
  },
  {
    id: '2',
    name: 'Fashion',
    icon: Shirt,
    color: '#7C3AED',
    image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600',
    productCount: 189,
  },
  {
    id: '3',
    name: 'Home & Garden',
    icon: Home,
    color: '#10B981',
    image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=600',
    productCount: 156,
  },
  {
    id: '4',
    name: 'Audio',
    icon: Headphones,
    color: '#F97316',
    image: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=600',
    productCount: 87,
  },
  {
    id: '5',
    name: 'Wearables',
    icon: Watch,
    color: '#EF4444',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=600',
    productCount: 124,
  },
  {
    id: '6',
    name: 'Kitchen',
    icon: Coffee,
    color: '#8B5CF6',
    image: 'https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg?auto=compress&cs=tinysrgb&w=600',
    productCount: 98,
  },
];

export default function CategoriesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <Text style={styles.headerSubtitle}>Browse by category</Text>
      </View>

      {/* Categories Grid */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <TouchableOpacity
                key={category.id}
                style={styles.categoryCard}
                activeOpacity={0.8}
              >
                <View style={styles.categoryImageContainer}>
                  <Image source={{ uri: category.image }} style={styles.categoryImage} />
                  <View style={[styles.categoryIconContainer, { backgroundColor: category.color }]}>
                    <IconComponent size={24} color="#ffffff" />
                  </View>
                </View>
                
                <View style={styles.categoryInfo}>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>
                    {category.productCount} products
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Featured Categories */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Featured Collections</Text>
          
          <TouchableOpacity style={styles.featuredCard} activeOpacity={0.8}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredTitle}>Summer Collection</Text>
              <Text style={styles.featuredSubtitle}>Up to 50% off</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.featuredCard} activeOpacity={0.8}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/325153/pexels-photo-325153.jpeg?auto=compress&cs=tinysrgb&w=600' }}
              style={styles.featuredImage}
            />
            <View style={styles.featuredOverlay}>
              <Text style={styles.featuredTitle}>Tech Essentials</Text>
              <Text style={styles.featuredSubtitle}>Latest gadgets</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '400',
  },
  scrollView: {
    flex: 1,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryImageContainer: {
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'cover',
  },
  categoryIconContainer: {
    position: 'absolute',
    bottom: -16,
    right: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryInfo: {
    padding: 16,
    paddingTop: 20,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  categoryCount: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  featuredSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  featuredCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  featuredImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  featuredOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 16,
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 2,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#e5e7eb',
    fontWeight: '500',
  },
});