const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  brand: {
    type: String,
    enum: [
      'Apple',
      'Dell',
      'HP',
      'Lenovo',
      'Asus',
      'Acer',
      'Microsoft',
      'Razer',
      'MSI',
      'Samsung',
      'Toshiba',
      'LG',
      'Huawei',
      'Gigabyte',
      'VAIO',
    ],
    require: [true, 'A product must have brand name'],
  },
  model: {
    type: String,
    require: [true, 'A product must model name'],
  },
  price: {
    type: Number,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  specifications: {
    processor: {
      type: String,
      require: true,
    },
    ram: {
      type: String,
      require: true,
    },
    storage: {
      type: String,
      required: true,
    },
    display: {
      type: String,
      required: true,
    },
    gpu: {
      type: String,
      default: 'Integrated', // Not all laptops have dedicated GPUs
    },
    batteryLife: String,
    weight: String,
    os: {
      type: String,
      enum: ['Windows', 'macOS', 'Linux', 'Chrome OS'],
    },
    ports: [String], // e.g. ['USB-C', 'HDMI', 'Ethernet']
    warranty: {
      type: String,
      default: '1 year',
    },
  },
  stock: {
    type: Number,
    default: 0,
  },
  images: [String], // Corrected from imagies to images
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

productSchema.index(
  { brand: 1, model: 1, specifications: 1 },
  { unique: true }
);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;
