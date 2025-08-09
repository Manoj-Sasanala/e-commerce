import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Heart, Star } from 'lucide-react-native';
import { router } from 'expo-router';

const products = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    rating: 4.5,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    rating: 4.8,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 89.99,
    rating: 4.3,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fashion',
  },
  {
    id: '4',
    name: 'Coffee Maker',
    price: 149.99,
    rating: 4.6,
    image: 'https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Home',
  },
  {
    id: '5',
    name: 'Laptop Bag',
    price: 45.99,
    rating: 4.2,
    image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Accessories',
  },
  {
    id: '6',
    name: 'Bluetooth Speaker',
    price: 59.99,
    rating: 4.4,
    image: 'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Electronics',
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ShopApp</Text>
        <Text style={styles.headerSubtitle}>Discover amazing products</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>
      </View>

      {/* Products Grid */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.productsGrid}>
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/product/${product.id}`)}
              activeOpacity={0.8}
            >
              <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <TouchableOpacity
                  style={styles.favoriteButton}
                  onPress={() => toggleFavorite(product.id)}
                  activeOpacity={0.7}
                >
                  <Heart
                    size={18}
                    color={favorites.includes(product.id) ? '#EF4444' : '#6b7280'}
                    fill={favorites.includes(product.id) ? '#EF4444' : 'transparent'}
                  />
                </TouchableOpacity>
              </View>
              
              <View style={styles.productInfo}>
                <Text style={styles.productName} numberOfLines={2}>
                  {product.name}
                </Text>
                <Text style={styles.productCategory}>{product.category}</Text>
                
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>${product.price}</Text>
                  <View style={styles.ratingContainer}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {filteredProducts.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No products found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search</Text>
          </View>
        )}
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
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1f2937',
  },
  scrollView: {
    flex: 1,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 12,
    justifyContent: 'space-between',
  },
  productCard: {
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
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 6,
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
    lineHeight: 20,
  },
  productCategory: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    fontWeight: '500',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 2,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
});