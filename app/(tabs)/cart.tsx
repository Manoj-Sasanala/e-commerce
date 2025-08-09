import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Minus, Plus, Trash2, CreditCard } from 'lucide-react-native';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 79.99,
    quantity: 1,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'Black',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 199.99,
    quantity: 2,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=400',
    color: 'Silver',
  },
  {
    id: '3',
    name: 'Running Shoes',
    price: 89.99,
    quantity: 1,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
    size: 'US 9',
    color: 'Navy',
  },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const updateQuantity = (id: string, change: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shopping Cart</Text>
        <Text style={styles.headerSubtitle}>{cartItems.length} items</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some products to get started</Text>
        </View>
      ) : (
        <>
          {/* Cart Items */}
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <View style={styles.cartItems}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image source={{ uri: item.image }} style={styles.itemImage} />
                  
                  <View style={styles.itemDetails}>
                    <Text style={styles.itemName} numberOfLines={2}>
                      {item.name}
                    </Text>
                    
                    {(item.size || item.color) && (
                      <View style={styles.itemVariants}>
                        {item.size && <Text style={styles.variantText}>Size: {item.size}</Text>}
                        {item.color && <Text style={styles.variantText}>Color: {item.color}</Text>}
                      </View>
                    )}
                    
                    <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                  </View>

                  <View style={styles.itemActions}>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeItem(item.id)}
                      activeOpacity={0.7}
                    >
                      <Trash2 size={16} color="#EF4444" />
                    </TouchableOpacity>
                    
                    <View style={styles.quantityContainer}>
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, -1)}
                        activeOpacity={0.7}
                      >
                        <Minus size={16} color="#6b7280" />
                      </TouchableOpacity>
                      
                      <Text style={styles.quantityText}>{item.quantity}</Text>
                      
                      <TouchableOpacity
                        style={styles.quantityButton}
                        onPress={() => updateQuantity(item.id, 1)}
                        activeOpacity={0.7}
                      >
                        <Plus size={16} color="#6b7280" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          {/* Order Summary */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Shipping</Text>
              <Text style={styles.summaryValue}>${shipping.toFixed(2)}</Text>
            </View>
            
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tax</Text>
              <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.summaryRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.checkoutButton} activeOpacity={0.8}>
              <CreditCard size={20} color="#ffffff" />
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
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
  cartItems: {
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    resizeMode: 'cover',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  itemVariants: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  variantText: {
    fontSize: 12,
    color: '#6b7280',
    marginRight: 12,
    fontWeight: '500',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  removeButton: {
    padding: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 4,
  },
  quantityButton: {
    padding: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    paddingHorizontal: 12,
    minWidth: 30,
    textAlign: 'center',
  },
  summaryContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
  },
  checkoutButton: {
    backgroundColor: '#2563EB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  checkoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});