const mongoose = require('mongoose');
const Product = require('../models/product.model');

const products = [
  {
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    category: 'electronics',
    stock: 50
  },
  {
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30',
    category: 'electronics',
    stock: 30
  },
  {
    name: 'Cotton T-Shirt',
    description: 'Comfortable cotton t-shirt in various colors',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
    category: 'clothing',
    stock: 100
  },
  {
    name: 'Running Shoes',
    description: 'Lightweight running shoes for maximum comfort',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'clothing',
    stock: 45
  }
];

const seedProducts = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Products seeded successfully');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
};

module.exports = seedProducts; 