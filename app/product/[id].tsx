import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ArrowLeft,
  Heart,
  Share,
  Star,
  ShoppingCart,
  Plus,
  Minus,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

const productData = {
  '1': {
    id: '1',
    name: 'Wireless Headphones Pro',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.5,
    reviews: 128,
    description: 'Experience premium sound quality with our latest wireless headphones. Featuring active noise cancellation, 30-hour battery life, and crystal-clear audio for all your favorite music.',
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3394651/pexels-photo-3394651.jpeg?auto=compress&cs=tinysrgb&w=800',
    ],
    colors: ['Black', 'White', 'Blue'],
    features: [
      'Active Noise Cancellation',
      '30-hour battery life',
      'Wireless charging case',
      'Premium sound quality',
      'Quick charge: 15 min = 3 hours',
    ],
    inStock: true,
  },
};

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  const product = productData[id as keyof typeof productData] || productData['1'];

  const updateQuantity = (change: number) => {
    setQuantity(prev => Math.max(1, prev + change));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerButton}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <ArrowLeft size={24} color="#1f2937" />
        </TouchableOpacity>
        
        <View style={styles.headerActions}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsFavorite(!isFavorite)}
            activeOpacity={0.7}
          >
            <Heart
              size={24}
              color={isFavorite ? '#EF4444' : '#6b7280'}
              fill={isFavorite ? '#EF4444' : 'transparent'}
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.headerButton} activeOpacity={0.7}>
            <Share size={24} color="#6b7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Product Images */}
        <View style={styles.imageContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event) => {
              const page = Math.round(event.nativeEvent.contentOffset.x / width);
              setSelectedImageIndex(page);
            }}
            scrollEventThrottle={16}
          >
            {product.images.map((image, index) => (
              <Image key={index} source={{ uri: image }} style={styles.productImage} />
            ))}
          </ScrollView>
          
          <View style={styles.imageIndicators}>
            {product.images.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  selectedImageIndex === index && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Product Info */}
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>

          <View style={styles.ratingContainer}>
            <View style={styles.stars}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  color="#F59E0B"
                  fill={i < Math.floor(product.rating) ? '#F59E0B' : 'transparent'}
                />
              ))}
            </View>
            <Text style={styles.ratingText}>
              {product.rating} ({product.reviews} reviews)
            </Text>
          </View>

          {/* Color Selection */}
          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Color</Text>
            <View style={styles.colorOptions}>
              {product.colors.map((color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.colorOption,
                    selectedColor === index && styles.selectedColorOption,
                  ]}
                  onPress={() => setSelectedColor(index)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.colorText,
                      selectedColor === index && styles.selectedColorText,
                    ]}
                  >
                    {color}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity */}
          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Quantity</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(-1)}
                activeOpacity={0.7}
              >
                <Minus size={18} color="#6b7280" />
              </TouchableOpacity>
              
              <Text style={styles.quantityText}>{quantity}</Text>
              
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => updateQuantity(1)}
                activeOpacity={0.7}
              >
                <Plus size={18} color="#6b7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Description */}
          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Features */}
          <View style={styles.optionSection}>
            <Text style={styles.optionTitle}>Features</Text>
            {product.features.map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <View style={styles.featureBullet} />
                <Text style={styles.featureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.addToCartButton} activeOpacity={0.8}>
          <ShoppingCart size={20} color="#ffffff" />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerButton: {
    padding: 8,
  },
  headerActions: {
    flexDirection: 'row',
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: width,
    height: 300,
    resizeMode: 'cover',
  },
  imageIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d1d5db',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#2563EB',
  },
  productInfo: {
    padding: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 12,
    lineHeight: 32,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563EB',
    marginRight: 12,
  },
  originalPrice: {
    fontSize: 18,
    color: '#9ca3af',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  ratingText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  optionSection: {
    marginBottom: 24,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  colorOptions: {
    flexDirection: 'row',
  },
  colorOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 12,
  },
  selectedColorOption: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  colorText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  selectedColorText: {
    color: '#ffffff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    padding: 12,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 16,
    minWidth: 40,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    color: '#6b7280',
    flex: 1,
  },
  bottomActions: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  addToCartButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  addToCartText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});